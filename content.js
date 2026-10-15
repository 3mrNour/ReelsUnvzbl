(() => {
  "use strict";
  const hidden = new Set();
  function hide() {
    // find all elements with exact Arabic text
    document.querySelectorAll('div,h3,span,a,button,li').forEach(el => {
      const txt = el.textContent.trim();
      if (txt === '????') {
        let cur = el;
        for (let i = 0; i < 12; i++) {
          if (!cur) break;
          if (cur.role === 'gridcell' || cur.role === 'tab' || cur.role === 'listitem' || cur.className.includes('x6ikm8r')) {
            if (!hidden.has(cur)) {
              hidden.add(cur);
              cur.style.setProperty('display', 'none', 'important');
              return;
            }
          }
          cur = cur.parentElement;
        }
        if (!hidden.has(el.parentElement)) {
          hidden.add(el.parentElement);
          el.parentElement.style.setProperty('display', 'none', 'important');
        }
      }
    });
  }
  hide();
  new MutationObserver(hide).observe(document.body, { childList: true, subtree: true });
})();
