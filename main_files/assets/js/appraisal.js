/* ==========================================================================
   upbss — instant appraisal wizard (appraisal.html)
   Indicative only. The figure is a lead-generation estimate produced from
   area × sector rate × location factor × condition factor — never a formal
   valuation, and the UI says so.
   ========================================================================== */

(function () {
  'use strict';

  var UP = window.UPBSS;
  var u = UP.util;

  document.addEventListener('upbss:ready', function () {
    var wizard = document.getElementById('appraisalWizard');
    if (!wizard) return;

    var steps = [].slice.call(wizard.querySelectorAll('.wizard-step'));
    var stepperItems = [].slice.call(document.querySelectorAll('#appraisalStepper li'));
    var result = document.getElementById('appraisalResult');
    var current = 0;

    /* Populate selects from the shared data. */
    var typeSel = document.getElementById('aType');
    typeSel.innerHTML = '<option value="">Select a type…</option>' +
      UP.propertyTypes.map(function (t) { return '<option>' + t + '</option>'; }).join('');

    var locSel = document.getElementById('aLocation');
    locSel.innerHTML = '<option value="">Select a location…</option>' +
      UP.locations.slice().sort().map(function (l) { return '<option>' + l + '</option>'; }).join('') +
      '<option value="__other">Somewhere else in Austria</option>';

    function showStep(i) {
      current = i;
      steps.forEach(function (s, si) { s.classList.toggle('is-active', si === i); });
      stepperItems.forEach(function (li, li_i) {
        li.classList.toggle('is-active', li_i === i);
        li.classList.toggle('is-done', li_i < i);
      });
      var focusable = steps[i].querySelector('input, select, textarea, button');
      if (focusable) focusable.focus({ preventScroll: true });
      wizard.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    function fieldsIn(step) {
      return [].slice.call(step.querySelectorAll('input, select, textarea'));
    }

    wizard.addEventListener('click', function (e) {
      var next = e.target.closest('[data-next]');
      var back = e.target.closest('[data-back]');

      if (back) { showStep(Math.max(0, current - 1)); return; }
      if (!next) return;

      if (!UP.validateGroup(fieldsIn(steps[current]))) return;

      if (current < steps.length - 1) { showStep(current + 1); return; }
      calculate();
    });

    function calculate() {
      var type = typeSel.value;
      var loc = locSel.value;
      var area = Number(document.getElementById('aArea').value);
      var condition = document.getElementById('aCondition').value;
      var year = Number(document.getElementById('aYear').value) || 1990;

      var factors = UP.appraisalFactors[type] || UP.appraisalFactors.House;
      var locFactor = UP.locationFactors[loc] || 0.92;
      var condFactor = factors.condition[condition] || 1;

      /* Age taper: newer stock carries a premium, capped at ±10 %. */
      var age = Math.max(0, new Date().getFullYear() - year);
      var ageFactor = Math.min(1.1, Math.max(0.9, 1.1 - age / 600));

      var mid = area * factors.base * locFactor * condFactor * ageFactor;
      var low = Math.round(mid * 0.92 / 1000) * 1000;
      var high = Math.round(mid * 1.08 / 1000) * 1000;

      document.getElementById('resultFigure').textContent = u.money(low) + ' – ' + u.money(high);
      document.getElementById('resultSummary').textContent =
        area + ' m² ' + type.toLowerCase() + ' in ' + (loc === '__other' ? 'Austria' : loc) +
        ', ' + condition + ' condition, built ' + year + '.';

      /* Extreme or unsupported inputs get routed to a human instead. */
      var unusual = area < 15 || area > 2000 || loc === '__other';
      document.getElementById('resultFallback').hidden = !unusual;
      document.getElementById('resultBand').hidden = unusual;

      wizard.hidden = true;
      document.getElementById('appraisalStepper').hidden = true;
      result.classList.add('is-visible');
      result.setAttribute('tabindex', '-1');
      result.focus({ preventScroll: true });
      result.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    document.getElementById('restartAppraisal').addEventListener('click', function () {
      result.classList.remove('is-visible');
      wizard.hidden = false;
      document.getElementById('appraisalStepper').hidden = false;
      showStep(0);
    });

    showStep(0);
  });
})();
