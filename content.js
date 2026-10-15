(() => {
  "use strict";

  const hidden = new Set();

  function hide() {
    const spans = document.querySelectorAll('span');
    spans.forEach(span => {
      if (span.textContent === '????') {
        const top = span.closest('div.x6ikm8r.x10wlt62, div[role=\"tablist\"] > div, div[role=\"listitem\"]');
        if (top && !hidden.has(top)) {
          hidden.add(top);
          top.style.setProperty('display', 'none', 'important');
        }
      }
    });
    const h3s = document.querySelectorAll('h3');
    h3s.forEach(h3 => {
      if (h3.textContent === '????') {
        const top = h3.closest('div.x6ikm8r.x10wlt62, div[role=\"tablist\"] > div');
        if (top && !hidden.has(top)) {
          hidden.add(top);
          top.style.setProperty('display', 'none', 'important');
        }
      }
    });
    const svg = document.querySelector('svg path[d^=\"M1.046 6.5\"]');
    if (svg) {
      const container = svg.closest('div.x6ikm8r.x10wlt62, div[role=\"gridcell\"], div[role=\"tab\"]');
      if (container && !hidden.has(container)) {
        hidden.add(container);
        container.style.setProperty('display', 'none', 'important');
      }
    }
  }

  hide();
  new MutationObserver(hide).observe(document.body, { childList: true, subtree: true });
})();
