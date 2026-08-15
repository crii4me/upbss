<?php
/* ==========================================================================
   upbss — enquiry handler

   Receives the contact form, viewing requests and appraisal leads, and emails
   them to the address below. Replaces the third-party form service: unlimited,
   free, and the mail is sent from the site's own domain.

   The front end posts JSON here from UP.submitLead() in assets/js/main.js and
   expects JSON back. It only reads whether the request succeeded, so the shape
   of the response matters more than its contents.
   ========================================================================== */

/* ---------- Settings ---------------------------------------------------- */

/* Where enquiries are delivered. */
$TO = 'customerservice@upbss.com';

/* The envelope sender. This MUST be an address on this domain, or the mail
   will be treated as spoofed and land in spam (or be rejected outright).
   Never put the visitor's address here — their reply address goes in
   Reply-To further down. */
$FROM = 'customerservice@upbss.com';

/* Most a single visitor may send in an hour, per IP. Blunt, but it stops a
   bot hammering the form and burning through the mail quota. */
$MAX_PER_HOUR = 12;

/* ---------- Only POST, only JSON ---------------------------------------- */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

/* 64 KB is far more than any of these forms produces. Anything larger is
   either a mistake or an attempt to exhaust memory. */
$raw = file_get_contents('php://input', false, null, 0, 65536);
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Malformed request.']);
    exit;
}

/* ---------- Spam checks -------------------------------------------------- */

/* The honeypot. A human never sees this field, so anything in it is a bot.
   Answer 200 and claim success: telling a bot it failed just invites a retry
   with the field left blank. */
if (!empty($data['botcheck']) || !empty($data['_gotcha'])) {
    echo json_encode(['success' => true]);
    exit;
}

/* Crude per-IP rate limit. Uses the system temp directory so it needs no
   database and no writable folder inside the site. */
$ip  = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$key = sys_get_temp_dir() . '/upbss_rl_' . md5($ip);
$now = time();
$hits = [];
if (is_readable($key)) {
    $hits = array_filter(
        (array) json_decode((string) file_get_contents($key), true),
        function ($t) use ($now) { return is_int($t) && $t > $now - 3600; }
    );
}
if (count($hits) >= $MAX_PER_HOUR) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Too many messages. Please telephone us instead.']);
    exit;
}
$hits[] = $now;
@file_put_contents($key, json_encode(array_values($hits)), LOCK_EX);

/* ---------- Validation --------------------------------------------------- */

/* Strip CR and LF from anything destined for a mail header. Without this a
   visitor could put a newline in the name field and inject extra headers —
   the classic way form mailers get turned into spam relays. */
function header_safe($value) {
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], ' ', (string) $value));
}

$name  = header_safe($data['name']  ?? '');
$email = header_safe($data['email'] ?? '');

if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'A name and a valid email address are required.']);
    exit;
}

/* ---------- Compose ------------------------------------------------------ */

$subject = header_safe($data['subject'] ?? 'upbss website enquiry');
if ($subject === '') { $subject = 'upbss website enquiry'; }

/* Everything that is not routing metadata goes into the body, so a new field
   added to a form later still appears in the email without touching this file. */
$skip = ['subject', 'botcheck', '_gotcha', 'access_key', 'from_name', 'replyto', '_replyto'];
$lines = [];
foreach ($data as $field => $value) {
    if (in_array($field, $skip, true)) { continue; }
    if (is_array($value)) { $value = implode(', ', $value); }
    if (is_bool($value))  { $value = $value ? 'Yes' : 'No'; }
    $label = ucfirst(str_replace('_', ' ', $field));
    $lines[] = $label . ': ' . str_replace(["\r\n", "\r"], "\n", (string) $value);
}

$body  = "New enquiry from the upbss website\n";
$body .= str_repeat('=', 42) . "\n\n";
$body .= implode("\n", $lines) . "\n\n";
$body .= str_repeat('-', 42) . "\n";
$body .= 'Received: ' . date('D j M Y, H:i') . "\n";
$body .= 'IP address: ' . $ip . "\n";
$body .= 'Page: ' . header_safe($data['source_page'] ?? 'unknown') . "\n";

$headers = [
    'From: upbss website <' . $FROM . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: upbss-site',
];

/* -f sets the envelope sender, which some hosts require before they will
   deliver mail sent by PHP at all. */
$sent = @mail($TO, $subject, $body, implode("\r\n", $headers), '-f' . $FROM);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    /* Logged rather than shown: the visitor gets the form's own error message,
       which tells them to telephone instead. */
    error_log('upbss: mail() failed for enquiry from ' . $email);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Could not send. Please telephone us.']);
}
