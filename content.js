(() => {
  "use strict";

  const hidden = new WeakSet();

  function hideReels() {
    document.querySelectorAll('div.x6ikm8r.x10wlt62').forEach(div => {
      if (div.textContent && div.textContent.includes('????')) {
        if (!hidden.has(div)) {
          hidden.add(div);
          div.style.setProperty('display', 'none', 'important');
        }
      }
    });
  }

  hideReels();
  const obs = new MutationObserver(hideReels);
  obs.observe(document.body, { childList: true, subtree: true, attributes: false });
})();
