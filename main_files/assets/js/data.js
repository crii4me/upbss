/* ==========================================================================
   upbss — site data
   Single source of truth for the front end. When the PHP / MS SQL back end
   goes live, replace UPBSS.properties etc. with a fetch() to the API and
   keep the same object shape — nothing else needs to change.
   ========================================================================== */

window.UPBSS = window.UPBSS || {};

UPBSS.config = {
  name: 'upbss',
  email: 'hello@upbss.com',
  phone: '+43 732 000 000',
  phoneHref: '+43732000000',
  address: ['upbss Property Group', 'Landstraße 47', '4020 Linz', 'Austria'],
  hours: 'Mon–Fri 09:00–18:00 · Sat 10:00–14:00',
  currency: '€',
  perPage: 9
};

UPBSS.propertyTypes = ['Apartment', 'House', 'Townhouse', 'Studio', 'Commercial', 'Land'];

UPBSS.locations = [
  'Linz', 'Vienna', 'Graz', 'Salzburg', 'Innsbruck', 'Wels', 'Steyr', 'Klagenfurt', 'Villach', 'Leonding'
];

/* status: 'available' | 'under-offer' | 'sold' */
UPBSS.properties = [
  {
    ref: 'UP2291', title: 'Riverside apartment with double balcony', type: 'Apartment',
    location: 'Linz', region: 'Upper Austria', price: 349000, beds: 3, baths: 2, area: 96,
    year: 2016, epc: 'B', tenure: 'Freehold', status: 'available', featured: true, scene: 'tower', seed: 3,
    summary: 'A bright third-floor apartment on the Danube promenade with two balconies, a fitted kitchen and a garage space included in the price.',
    features: ['Two south-facing balconies', 'Underground parking space', 'Fitted Bosch kitchen', 'Lift access to all floors', 'Cellar storage unit', 'District heating']
  },
  {
    ref: 'UP2288', title: 'Detached family house with mature garden', type: 'House',
    location: 'Leonding', region: 'Upper Austria', price: 615000, beds: 5, baths: 3, area: 184,
    year: 1998, epc: 'C', tenure: 'Freehold', status: 'available', featured: true, scene: 'house', seed: 1,
    summary: 'Set back from the road on a 720 m² plot, this family house offers five bedrooms, a converted attic studio and a double garage.',
    features: ['720 m² south-facing plot', 'Double garage + workshop', 'Converted attic studio', 'Wood-burning stove', 'Rainwater harvesting', 'Fibre broadband']
  },
  {
    ref: 'UP2284', title: 'Converted loft studio in the old quarter', type: 'Studio',
    location: 'Vienna', region: 'Vienna', price: 268000, beds: 1, baths: 1, area: 54,
    year: 1912, epc: 'D', tenure: 'Freehold', status: 'available', featured: true, scene: 'loft', seed: 5,
    summary: 'Original beams, four-metre ceilings and a mezzanine sleeping platform, two minutes from the U4 line.',
    features: ['Exposed original beams', '4 m ceiling height', 'Mezzanine platform', 'Two minutes to U4', 'Communal roof terrace', 'Bike store']
  },
  {
    ref: 'UP2279', title: 'Ground-floor retail unit on the main square', type: 'Commercial',
    location: 'Graz', region: 'Styria', price: 495000, beds: 0, baths: 2, area: 140,
    year: 1975, epc: 'C', tenure: 'Freehold', status: 'under-offer', featured: false, scene: 'shop', seed: 2,
    summary: 'A 140 m² retail unit with 9 m of frontage onto the main square, currently let to a bakery on a rolling lease.',
    features: ['9 m glazed frontage', 'Tenant in situ', 'Rear delivery access', 'Air conditioning', 'Basement stock room', 'A1 planning use']
  },
  {
    ref: 'UP2275', title: 'Two-bed apartment with alpine views', type: 'Apartment',
    location: 'Innsbruck', region: 'Tyrol', price: 412000, beds: 2, baths: 1, area: 71,
    year: 2009, epc: 'B', tenure: 'Freehold', status: 'available', featured: false, scene: 'tower', seed: 7,
    summary: 'A quiet top-floor apartment facing the Nordkette, sold with a ski locker and a covered parking bay.',
    features: ['Top-floor, no overlooking', 'Nordkette mountain views', 'Ski locker included', 'Covered parking bay', 'Triple glazing', 'Communal sauna']
  },
  {
    ref: 'UP2270', title: 'Period townhouse close to the cathedral', type: 'Townhouse',
    location: 'Salzburg', region: 'Salzburg', price: 890000, beds: 4, baths: 3, area: 210,
    year: 1889, epc: 'D', tenure: 'Freehold', status: 'available', featured: true, scene: 'terrace', seed: 4,
    summary: 'Four floors of period detail with a courtyard garden, restored sash windows and a separate one-bed annexe.',
    features: ['Four storeys plus cellar', 'Private courtyard garden', 'Restored sash windows', 'Separate one-bed annexe', 'Original parquet floors', 'Listed façade']
  },
  {
    ref: 'UP2266', title: 'New-build apartment, energy class A', type: 'Apartment',
    location: 'Wels', region: 'Upper Austria', price: 289000, beds: 2, baths: 1, area: 68,
    year: 2024, epc: 'A', tenure: 'Freehold', status: 'available', featured: false, scene: 'tower', seed: 9,
    summary: 'Completed in 2024 with underfloor heating, a heat pump and a ten-year structural warranty still in place.',
    features: ['Energy class A', 'Air-source heat pump', 'Underfloor heating', '10-year warranty', 'Video entry system', 'Private terrace']
  },
  {
    ref: 'UP2261', title: 'Building plot with outline permission', type: 'Land',
    location: 'Steyr', region: 'Upper Austria', price: 158000, beds: 0, baths: 0, area: 640,
    year: null, epc: '—', tenure: 'Freehold', status: 'available', featured: false, scene: 'land', seed: 6,
    summary: 'A level 640 m² plot with outline permission for a single dwelling, services already at the boundary.',
    features: ['Outline permission granted', 'Services at boundary', 'Level, cleared site', 'No overhead lines', 'Quiet cul-de-sac', 'Road access']
  },
  {
    ref: 'UP2257', title: 'Warehouse and office unit, business park', type: 'Commercial',
    location: 'Klagenfurt', region: 'Carinthia', price: 720000, beds: 0, baths: 3, area: 520,
    year: 2005, epc: 'C', tenure: 'Freehold', status: 'available', featured: false, scene: 'shop', seed: 8,
    summary: 'A 520 m² unit combining warehouse space with a first-floor office suite and eight parking spaces.',
    features: ['6 m clear internal height', 'Roller shutter loading', 'First-floor office suite', 'Eight parking spaces', 'Three-phase power', '24-hour site access']
  },
  {
    ref: 'UP2250', title: 'Renovated apartment near the university', type: 'Apartment',
    location: 'Linz', region: 'Upper Austria', price: 235000, beds: 2, baths: 1, area: 62,
    year: 1968, epc: 'C', tenure: 'Freehold', status: 'available', featured: false, scene: 'tower', seed: 11,
    summary: 'Fully renovated in 2023 and currently let to students at €980 per month — a ready-made rental investment.',
    features: ['Renovated 2023', 'Tenanted at €980 pcm', 'Five minutes to campus', 'New bathroom', 'Balcony', 'Tram at the door']
  },
  {
    ref: 'UP2244', title: 'Village house with barn conversion potential', type: 'House',
    location: 'Villach', region: 'Carinthia', price: 379000, beds: 4, baths: 2, area: 156,
    year: 1954, epc: 'E', tenure: 'Freehold', status: 'available', featured: false, scene: 'house', seed: 12,
    summary: 'A traditional village house with an attached stone barn, ripe for conversion subject to the usual consents.',
    features: ['Attached stone barn', 'Conversion potential', 'Orchard to the rear', 'Original tiled stove', 'Well on site', 'Village centre']
  },
  {
    ref: 'UP2239', title: 'Corner studio with roof terrace', type: 'Studio',
    location: 'Vienna', region: 'Vienna', price: 315000, beds: 1, baths: 1, area: 48,
    year: 2019, epc: 'B', tenure: 'Freehold', status: 'under-offer', featured: false, scene: 'loft', seed: 14,
    summary: 'A compact corner studio on the top floor, sold with an 18 m² private roof terrace and a lift to the door.',
    features: ['18 m² roof terrace', 'Corner aspect, dual light', 'Lift to the door', 'Built-in storage wall', 'Concierge service', 'Bike store']
  },
  {
    ref: 'UP2233', title: 'Family house with indoor pool', type: 'House',
    location: 'Salzburg', region: 'Salzburg', price: 1150000, beds: 6, baths: 4, area: 320,
    year: 2011, epc: 'B', tenure: 'Freehold', status: 'available', featured: true, scene: 'house', seed: 15,
    summary: 'Six bedrooms, a heated indoor pool and a triple garage on a landscaped 1,400 m² plot with mountain views.',
    features: ['Heated indoor pool', '1,400 m² landscaped plot', 'Triple garage', 'Guest suite', 'Home cinema room', 'Photovoltaic array']
  },
  {
    ref: 'UP2228', title: 'Mixed-use building, five apartments', type: 'Commercial',
    location: 'Wels', region: 'Upper Austria', price: 1290000, beds: 11, baths: 6, area: 610,
    year: 1962, epc: 'D', tenure: 'Freehold', status: 'available', featured: false, scene: 'terrace', seed: 17,
    summary: 'Five let apartments over a ground-floor commercial unit, producing €63,000 gross per year.',
    features: ['€63,000 gross yield', 'Five let apartments', 'Ground-floor commercial', 'New roof 2021', 'Separate meters', 'Rear parking court']
  },
  {
    ref: 'UP2221', title: 'One-bed apartment with lake access', type: 'Apartment',
    location: 'Klagenfurt', region: 'Carinthia', price: 219000, beds: 1, baths: 1, area: 44,
    year: 1996, epc: 'C', tenure: 'Freehold', status: 'available', featured: false, scene: 'tower', seed: 19,
    summary: 'A holiday-let-friendly apartment 300 m from the Wörthersee with a shared jetty and a boat mooring.',
    features: ['300 m from the lake', 'Shared jetty and mooring', 'Holiday letting permitted', 'Furnished as seen', 'Parking space', 'Storage cellar']
  },
  {
    ref: 'UP2215', title: 'Barn conversion with paddock', type: 'House',
    location: 'Steyr', region: 'Upper Austria', price: 545000, beds: 4, baths: 3, area: 198,
    year: 2018, epc: 'B', tenure: 'Freehold', status: 'available', featured: false, scene: 'house', seed: 21,
    summary: 'A completed barn conversion with a vaulted living room, underfloor heating throughout and a 0.4 ha paddock.',
    features: ['Vaulted living room', '0.4 ha paddock', 'Underfloor heating', 'Stables and tack room', 'Air-source heat pump', 'Private drive']
  },
  {
    ref: 'UP2208', title: 'City-centre office floor', type: 'Commercial',
    location: 'Vienna', region: 'Vienna', price: 985000, beds: 0, baths: 4, area: 340,
    year: 1988, epc: 'C', tenure: 'Freehold', status: 'available', featured: false, scene: 'shop', seed: 23,
    summary: 'A whole third floor of 340 m², open plan with four meeting rooms, sold with vacant possession.',
    features: ['Whole floor, open plan', 'Four meeting rooms', 'Vacant possession', 'Raised access floors', 'Two passenger lifts', 'Ring road access']
  },
  {
    ref: 'UP2202', title: 'Townhouse with courtyard, old town', type: 'Townhouse',
    location: 'Graz', region: 'Styria', price: 675000, beds: 3, baths: 2, area: 165,
    year: 1904, epc: 'D', tenure: 'Freehold', status: 'available', featured: false, scene: 'terrace', seed: 25,
    summary: 'Three bedrooms across two upper floors with a walled courtyard and a vaulted cellar currently used as a studio.',
    features: ['Walled courtyard', 'Vaulted cellar studio', 'Original stucco ceilings', 'Gas central heating', 'Pedestrian zone', 'Roof recently relined']
  },
  {
    ref: 'UP2196', title: 'Ski-in apartment, resort village', type: 'Apartment',
    location: 'Innsbruck', region: 'Tyrol', price: 458000, beds: 2, baths: 2, area: 78,
    year: 2014, epc: 'B', tenure: 'Freehold', status: 'available', featured: false, scene: 'tower', seed: 27,
    summary: 'Ski-in, ski-out with a rental management agreement in place and an average 62 % occupancy last season.',
    features: ['Ski-in, ski-out', 'Rental management in place', '62 % occupancy last season', 'Boot room and drying cupboard', 'Balcony with piste view', 'Resident parking']
  },
  {
    ref: 'UP2190', title: 'Development plot, edge of town', type: 'Land',
    location: 'Linz', region: 'Upper Austria', price: 340000, beds: 0, baths: 0, area: 1450,
    year: null, epc: '—', tenure: 'Freehold', status: 'available', featured: false, scene: 'land', seed: 29,
    summary: 'A 1,450 m² plot zoned for residential development, with a pre-application response for four dwellings.',
    features: ['Zoned residential', 'Pre-app for four dwellings', 'Mains services adjacent', 'Level topography', 'Bus route nearby', 'No known covenants']
  }
];

UPBSS.sold = [
  { ref: 'UP2103', title: 'Three-bed apartment, Danube view', location: 'Linz', type: 'Apartment', price: 372000, weeks: 5, year: 2026 },
  { ref: 'UP2088', title: 'Semi-detached house with garden', location: 'Wels', type: 'House', price: 428000, weeks: 7, year: 2026 },
  { ref: 'UP2071', title: 'Retail unit, pedestrian zone', location: 'Graz', type: 'Commercial', price: 610000, weeks: 12, year: 2026 },
  { ref: 'UP2064', title: 'Studio near the Naschmarkt', location: 'Vienna', type: 'Studio', price: 289000, weeks: 3, year: 2026 },
  { ref: 'UP2050', title: 'Alpine chalet with two annexes', location: 'Innsbruck', type: 'House', price: 1240000, weeks: 16, year: 2025 },
  { ref: 'UP2039', title: 'Townhouse, old town', location: 'Salzburg', type: 'Townhouse', price: 795000, weeks: 9, year: 2025 },
  { ref: 'UP2027', title: 'Two-bed with lake mooring', location: 'Klagenfurt', type: 'Apartment', price: 264000, weeks: 6, year: 2025 },
  { ref: 'UP2014', title: 'Warehouse unit, business park', location: 'Villach', type: 'Commercial', price: 540000, weeks: 14, year: 2025 },
  { ref: 'UP1998', title: 'Building plot with permission', location: 'Steyr', type: 'Land', price: 172000, weeks: 8, year: 2025 }
];

UPBSS.testimonials = [
  {
    quote: 'Excellent from start to finish. Our consultant kept us updated at every stage and found a buyer within three weeks of the listing going live.',
    name: 'Marta & Jonas Weber', role: 'Sellers, Linz'
  },
  {
    quote: 'I had been with another agent for eight months with barely a viewing. upbss repriced it honestly, re-shot the listing and it was under offer in a month.',
    name: 'Ana Petrović', role: 'Seller, Graz'
  },
  {
    quote: 'As a first-time buyer I asked a lot of questions. Nobody made me feel like a nuisance, and the paperwork was explained in plain language.',
    name: 'Tobias Reiter', role: 'Buyer, Vienna'
  },
  {
    quote: 'We bought a commercial unit through upbss and sold our old premises with them six months later. Same team both times, which made a real difference.',
    name: 'Helena Bauer', role: 'Buyer & seller, Wels'
  }
];

UPBSS.faqs = [
  {
    cat: 'Fees',
    q: 'What does it cost to sell with upbss?',
    a: 'Our fee is a completion fee, payable when the sale completes — either a fixed amount or a percentage of the sale price, agreed with you in writing before we start. There is no upfront listing charge on our standard agreement.'
  },
  {
    cat: 'Fees',
    q: 'Are legal fees included in your fee?',
    a: 'No. Notary and legal costs are separate and are billed to you directly by the firm you instruct. We can introduce you to notaries we work with regularly, but you are free to use your own.'
  },
  {
    cat: 'Fees',
    q: 'What happens if I cancel during the minimum period?',
    a: 'If no sale is proceeding, half the agreed fee falls due. If a sale is already progressing with a buyer we introduced, the full fee applies. The minimum period and both figures are stated on your proposal before you sign anything.'
  },
  {
    cat: 'Selling',
    q: 'How long does it take to sell a property?',
    a: 'Most properties on our books go under offer within four to twelve weeks, but it depends on price, condition and location. We will give you a realistic range for your property at the appraisal rather than an optimistic one.'
  },
  {
    cat: 'Selling',
    q: 'What do you need in order to value my property?',
    a: 'As a minimum we need the floor area, the year of construction, the energy certificate if you have one, and details of any tenancy. For apartments we also need the last two service charge statements and the house rules.'
  },
  {
    cat: 'Selling',
    q: 'How will you value my property?',
    a: 'We combine three inputs: recent completed sales of comparable properties, current asking prices in the same street or building, and the condition and specification we see at the visit. You get the comparables we used, not just a number.'
  },
  {
    cat: 'Selling',
    q: 'Can I list with more than one agent?',
    a: 'Yes, but read each agreement carefully. Some are sole-agency contracts where a second agent could leave you owing two fees on one sale. Ours states plainly which type it is on the first page.'
  },
  {
    cat: 'Selling',
    q: 'I am already negotiating with a buyer. Can I still instruct you?',
    a: 'Yes. You can either exclude that buyer from the agreement and negotiate independently, or hand the negotiation to us at a reduced fee. Tell us before you sign so we can write it in.'
  },
  {
    cat: 'Selling',
    q: 'How do I get the best possible price?',
    a: 'Price sensibly at launch — the first three weeks generate the most interest. Beyond that: fix the small defects, declutter, get the energy certificate ready in advance, and reply to enquiries the same day.'
  },
  {
    cat: 'Selling',
    q: 'What if my property does not sell?',
    a: 'We keep marketing it until it sells or you ask us to stop. At the eight-week mark we sit down with the viewing data and either adjust the price, change the presentation, or both.'
  },
  {
    cat: 'Buying',
    q: 'Do I need to register to view a property?',
    a: 'No. You can browse every listing without an account. You only give us your details when you request a viewing or ask a question about a specific property.'
  },
  {
    cat: 'Buying',
    q: 'How do you vet buyers?',
    a: 'We ask about position — cash, mortgage in principle, or dependent on a sale — and we request proof of funds alongside any offer. Sellers see that information before they decide.'
  },
  {
    cat: 'Buying',
    q: 'Can you help arrange finance?',
    a: 'We can introduce you to independent mortgage brokers we work with. We are not brokers ourselves, we take no commission on the introduction, and you are under no obligation to use them.'
  },
  {
    cat: 'Buying',
    q: 'Do you attend viewings?',
    a: 'For most listings the owner shows you round and we follow up afterwards. For vacant, tenanted or commercial properties a consultant attends. The listing tells you which applies.'
  },
  {
    cat: 'Process',
    q: 'What happens after I submit an enquiry?',
    a: 'It goes straight to a named consultant, not a shared inbox. You will hear back within one working day, and we will tell you who is handling it and how to reach them directly.'
  },
  {
    cat: 'Process',
    q: 'Do I need a notary?',
    a: 'For a property transfer in Austria, yes — the contract must be notarised and entered in the land register. We can introduce you to notaries we work with, or you can appoint your own.'
  },
  {
    cat: 'Process',
    q: 'What if my figures or circumstances change?',
    a: 'Send us the updated information and we will reassess the marketing price. There is no charge for a re-valuation while you are on our books.'
  },
  {
    cat: 'Process',
    q: 'Can I advertise confidentially?',
    a: 'Yes. We can market without a street address, without external photographs and without a board, releasing details only to vetted buyers who have signed an NDA. It narrows the audience, so we will talk you through the trade-off first.'
  }
];

UPBSS.guides = [
  {
    slug: 'first-time-seller-checklist',
    title: 'The first-time seller checklist',
    cat: 'Selling',
    read: 6,
    date: '12 June 2026',
    excerpt: 'Everything to have ready before your property goes live — from the energy certificate to the photographs that actually get clicks.',
    body: [
      ['h2', 'Start with the paperwork'],
      ['p', 'The single biggest cause of delay between an accepted offer and a completed sale is missing documentation. Gathering it before you list costs you an afternoon and saves you weeks later.'],
      ['ul', ['Energy performance certificate (Energieausweis) — valid for ten years', 'Land register extract (Grundbuchauszug), no older than three months', 'Floor plans, ideally with measurements', 'For apartments: the last two service charge statements and the house rules', 'For tenanted property: the lease and the current rent schedule', 'Any planning or building consents for extensions and conversions']],
      ['h2', 'Fix the small things, not the big ones'],
      ['p', 'A new kitchen rarely returns what it costs when you are selling within the year. A door that sticks, a cracked tile and a dripping tap cost very little and remove the impression that a property has been neglected. Buyers price in what they can see.'],
      ['h2', 'Get the photography right'],
      ['p', 'Listings with fewer than eight photographs get materially less engagement than those with fifteen or more. Shoot on a bright day, from the corners of rooms, with every light on and every surface clear. If there is a view, photograph it separately.'],
      ['h2', 'Price for the first three weeks'],
      ['p', 'A listing gets most of its attention in the first twenty-one days, when it appears in the saved searches of everyone already looking. Overprice it and you spend that window teaching the market to ignore you. It is far easier to hold a sensible price than to recover from a reduction.'],
      ['h2', 'Decide how you will handle viewings'],
      ['p', 'Be honest about your availability before you list. If you can only do Saturday mornings, say so up front and we will manage buyer expectations rather than losing them to a slow reply.']
    ]
  },
  {
    slug: 'how-property-valuations-work',
    title: 'How property valuations actually work',
    cat: 'Valuation',
    read: 5,
    date: '28 May 2026',
    excerpt: 'What sits behind the number on an appraisal, why two agents can differ by ten per cent, and how to tell an honest valuation from a flattering one.',
    body: [
      ['h2', 'Three inputs, one number'],
      ['p', 'A credible valuation rests on completed comparable sales, current competing asking prices, and the condition of the property in front of the valuer. Anything else — a target you have in mind, what you paid, what the neighbour claims they got — is context, not evidence.'],
      ['h2', 'Comparables do the heavy lifting'],
      ['p', 'A comparable is a property of similar type, size, age and location that has actually completed, ideally in the last six months. Asking prices tell you what sellers hope for; completed prices tell you what buyers paid. Ask any agent to show you the comparables behind their figure.'],
      ['h2', 'Why two agents differ'],
      ['p', 'Genuine differences in judgement account for perhaps five per cent. Beyond that, the gap is usually strategy: an inflated valuation wins the instruction, and the reduction arrives six weeks later. If one figure is well above the rest, ask what evidence supports it.'],
      ['h2', 'What the instant estimate can and cannot do'],
      ['p', 'An online estimate works from area, type, age and postcode. It cannot see that your kitchen was replaced last year, that the flat above floods, or that the view is protected. Treat it as a range to start the conversation, not a price.'],
      ['h2', 'When to get revalued'],
      ['p', 'Revalue if the property has been on the market more than eight weeks, if you have completed significant work, or if a directly comparable property nearby has just sold. Revaluation is free while you are on our books.']
    ]
  },
  {
    slug: 'buying-costs-in-austria',
    title: 'What buying a property really costs',
    cat: 'Buying',
    read: 7,
    date: '14 May 2026',
    excerpt: 'The purchase price is roughly nine tenths of the story. Here is the rest, laid out line by line, so nothing arrives as a surprise.',
    body: [
      ['h2', 'Budget beyond the asking price'],
      ['p', 'As a rule of thumb, allow around ten per cent of the purchase price for transaction costs in Austria. On a €350,000 apartment that is roughly €35,000 that does not go to the seller.'],
      ['h2', 'The main line items'],
      ['ul', ['Property transfer tax (Grunderwerbsteuer) — 3.5 % of the purchase price', 'Land register entry fee — 1.1 %', 'Notary or contract drafting — typically 1–3 % plus VAT', 'Agency fee, where payable by the buyer — capped by law', 'Mortgage registration, if you are borrowing — 1.2 % of the secured amount', 'Survey, if you commission one — €500–€1,500']],
      ['h2', 'Running costs to check before you offer'],
      ['p', 'For apartments, ask for the last two service charge statements and the minutes of the last owners meeting. The minutes tell you about works that have been agreed but not yet billed — a new roof or a lift replacement can land shortly after you move in.'],
      ['h2', 'Getting your finance in order'],
      ['p', 'A mortgage in principle before you start viewing makes your offer materially stronger, particularly against another buyer at the same number. Sellers weigh certainty as heavily as price.'],
      ['h2', 'Do not skip the energy certificate'],
      ['p', 'The Energieausweis is legally required and tells you what the property will cost to heat. On an older building the difference between class B and class E can run to several thousand euros a year.']
    ]
  },
  {
    slug: 'preparing-for-viewings',
    title: 'Preparing for viewings that convert',
    cat: 'Selling',
    read: 4,
    date: '30 April 2026',
    excerpt: 'A viewing is forty minutes long and most buyers decide in the first five. Here is how to use them.',
    body: [
      ['h2', 'The first five minutes decide it'],
      ['p', 'Buyers form an impression at the front door and spend the rest of the viewing confirming it. Clean the entrance, the hallway and whatever is directly visible from it, before anything else.'],
      ['h2', 'Light, air, space'],
      ['p', 'Open every blind, turn on every light including in daylight, and open the windows twenty minutes before. Remove roughly a third of the furniture from any room that feels tight — storage boxes in the cellar are fine.'],
      ['h2', 'Let them look'],
      ['p', 'Answer questions, then step back. Buyers need to open cupboards, stand in the middle of rooms and talk to each other without being followed. Give them the space to picture living there.'],
      ['h2', 'Have the answers ready'],
      ['p', 'Heating costs, broadband speed, service charge, age of the boiler, what the neighbours are like, when the roof was last done. Not knowing is fine once; not knowing three times makes buyers wonder what else you have not checked.'],
      ['h2', 'Follow up the same day'],
      ['p', 'We collect feedback within twenty-four hours and pass it to you unedited, including the parts you would rather not hear. That feedback is the most reliable data you will get about your price.']
    ]
  },
  {
    slug: 'selling-a-tenanted-property',
    title: 'Selling a property with tenants in place',
    cat: 'Selling',
    read: 6,
    date: '17 April 2026',
    excerpt: 'Tenanted property sells to a different buyer and needs a different approach. What changes, and what stays the same.',
    body: [
      ['h2', 'Your buyer is an investor'],
      ['p', 'A tenanted property is bought on yield rather than on how the kitchen feels. Lead with the numbers: rent, lease term, arrears history, service charge and net return. Photographs still matter, but the rent schedule matters more.'],
      ['h2', 'Talk to your tenants first'],
      ['p', 'Tenants who hear about the sale from a listing rather than from you tend to become obstructive about viewings. A conversation early, and reasonable notice for every visit, keeps the process workable.'],
      ['h2', 'Get the paperwork in order'],
      ['ul', ['Current lease and any addenda', 'Rent schedule and payment history', 'Deposit documentation and where it is held', 'Service charge statements for the last two years', 'Any outstanding maintenance requests']],
      ['h2', 'Expect a slightly narrower market'],
      ['p', 'Excluding owner-occupiers removes a portion of buyers, which usually means either a slightly longer marketing period or a modest discount. Where the lease is short, some sellers do better waiting for vacant possession — we will model both for you.']
    ]
  },
  {
    slug: 'commercial-property-basics',
    title: 'Commercial property: the basics',
    cat: 'Commercial',
    read: 8,
    date: '2 April 2026',
    excerpt: 'Yields, lease terms, planning use and what due diligence on a commercial unit should actually cover.',
    body: [
      ['h2', 'Yield is the headline, covenant is the story'],
      ['p', 'A 9 % yield from a tenant with a shaky trading history is worth less than 6 % from a national operator on fifteen years. Look at who is paying the rent and for how long before you look at the percentage.'],
      ['h2', 'Read the lease properly'],
      ['ul', ['Term remaining and any break clauses', 'Who is responsible for repair — internal, external, or full repairing and insuring', 'Rent review mechanism and the next review date', 'Permitted use and any restrictions on assignment', 'Service charge apportionment across the building']],
      ['h2', 'Check the planning use class'],
      ['p', 'A unit used as a café may not be consented for it. Verify the permitted use with the municipality rather than relying on what is currently trading there, particularly if you intend to change it.'],
      ['h2', 'Building surveys are not optional'],
      ['p', 'On commercial stock, commission a full building survey covering roof, drainage, electrical installation and any asbestos register. The cost is a fraction of a single unexpected roof replacement.'],
      ['h2', 'Vacant possession changes the maths'],
      ['p', 'An empty unit carries the rates, the insurance and the security bill until it is let. Price that holding cost into your offer — three to six months is a realistic assumption in most secondary locations.']
    ]
  }
];

/* Sector multiples used by the indicative appraisal tool. Deliberately blunt:
   this is a lead-generation estimate, not a formal valuation. */
UPBSS.appraisalFactors = {
  Apartment: { base: 3600, condition: { excellent: 1.12, good: 1.0, fair: 0.9, refurb: 0.76 } },
  House: { base: 3300, condition: { excellent: 1.14, good: 1.0, fair: 0.88, refurb: 0.72 } },
  Townhouse: { base: 3500, condition: { excellent: 1.13, good: 1.0, fair: 0.89, refurb: 0.74 } },
  Studio: { base: 4100, condition: { excellent: 1.1, good: 1.0, fair: 0.92, refurb: 0.8 } },
  Commercial: { base: 2400, condition: { excellent: 1.1, good: 1.0, fair: 0.9, refurb: 0.78 } },
  Land: { base: 320, condition: { excellent: 1.05, good: 1.0, fair: 0.95, refurb: 0.9 } }
};

UPBSS.locationFactors = {
  Vienna: 1.45, Salzburg: 1.34, Innsbruck: 1.28, Graz: 1.08, Linz: 1.0,
  Leonding: 0.98, Klagenfurt: 0.9, Villach: 0.84, Wels: 0.88, Steyr: 0.8
};
