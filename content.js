(() => {
  "use strict";

  const hidden = new Set();

  function hideReelsSection() {
    // Target the specific reels section div
    const targets = document.querySelectorAll('div.x6ikm8r.x10wlt62');
    targets.forEach(div => {
      if (div.textContent.includes('????')) {
        if (!hidden.has(div)) {
          hidden.add(div);
          div.style.display = 'none';
        }
      }
    });
  }

  function enable() {
    hideReelsSection();
    if (!observer) {
      observer = new MutationObserver(() => {
        hideReelsSection();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  function disable() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    hidden.forEach(node => {
      node.style.display = '';
    });
    hidden.clear();
  }

  let observer = null;

  chrome.storage.sync.get({ enabled: true }, ({ enabled }) => {
    if (enabled) enable();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync' || !changes.enabled) return;
    if (changes.enabled.newValue) enable();
    else disable();
  });
})();
