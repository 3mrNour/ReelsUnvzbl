(() => {
  "use strict";

  const REEL_LINK = 'a[href*="/reel/"], a[href*="/reels/"]';
  const MAX_PARENT = 10;
  const MIN_REEL_CHILDREN = 3;
  const hidden = new Set();

  function countReelLinkChildren(node) {
    let count = 0;
    for (const child of node.children) {
      if (child.querySelector(REEL_LINK)) count++;
    }
    return count;
  }

  function findReelsRail(link) {
    let node = link.parentElement;
    for (let steps = 0; node && steps < MAX_PARENT; node = node.parentElement, steps++) {
      if (countReelLinkChildren(node) >= MIN_REEL_CHILDREN) return node;
    }
    return null;
  }

  function processNode(root) {
    const links = root.querySelectorAll ? root.querySelectorAll(REEL_LINK) : [];
    links.forEach((link) => {
      const rail = findReelsRail(link);
      if (!rail || hidden.has(rail)) return;
      if (!rail.closest('div[role="feed"]')) return;
      hidden.add(rail);
      rail.style.display = "none";
    });
  }

  function enable() {
    processNode(document);
    if (!observer) {
      observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          for (const node of m.addedNodes) {
            if (node.nodeType === 1) processNode(node);
          }
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  function disable() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    hidden.forEach((node) => {
      node.style.display = "";
    });
    hidden.clear();
  }

  let observer = null;

  chrome.storage.sync.get({ enabled: true }, ({ enabled }) => {
    if (enabled) enable();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync" || !changes.enabled) return;
    if (changes.enabled.newValue) enable();
    else disable();
  });
})();