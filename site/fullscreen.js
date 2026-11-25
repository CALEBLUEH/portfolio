(() => {
  'use strict';
  // Keyboard Lock is restricted to the active top-level document. It also
  // covers fullscreen requested by a focused game in a descendant iframe.
  if (window.top !== window || window.PortfolioFullscreen) return;
  const keyboard = navigator.keyboard;
  let generation = 0;
  function report(mode) {
    document.documentElement.dataset.escapeFullscreen = mode;
    for (const status of document.querySelectorAll('[data-fullscreen-status]')) {
      const zh = document.documentElement.lang.startsWith('zh');
      status.textContent = mode === 'locked'
        ? (zh ? '短按 Esc 操作游戏；按住约 2 秒退出全屏。' : 'Tap Esc for the game; hold Esc for about 2 seconds to exit fullscreen.')
        : mode === 'pending'
        ? (zh ? '请允许浏览器的键盘锁定提示，以启用长按 Esc 退出。' : 'Allow the browser keyboard-lock prompt to enable hold-Esc exit.')
        : mode === 'fallback'
        ? (zh ? '浏览器未启用 Keyboard Lock，短按 Esc 仍会退出全屏。' : 'Keyboard Lock is unavailable or denied; the browser still exits fullscreen on a short Esc press.')
        : (zh ? '支持 Keyboard Lock 的浏览器：短按 Esc 操作游戏，按住约 2 秒退出全屏。' : 'With Keyboard Lock supported and allowed: tap Esc for the game; hold about 2 seconds to exit fullscreen.');
    }
    for (const button of document.querySelectorAll('[data-portfolio-fullscreen]')) {
      button.textContent = document.fullscreenElement
        ? (document.documentElement.lang.startsWith('zh') ? '退出全屏' : 'Exit fullscreen')
        : 'Fullscreen';
    }
  }
  async function sync() {
    const ticket = ++generation;
    if (!document.fullscreenElement) {
      keyboard?.unlock?.(); report('idle'); return;
    }
    if (!keyboard?.lock) { report('fallback'); return; }
    report('pending');
    try {
      // Only reserve Escape. Other browser and operating-system shortcuts stay
      // untouched. The browser retains its own long-Escape escape hatch.
      await keyboard.lock(['Escape']);
      if (ticket !== generation || !document.fullscreenElement) {
        if (!document.fullscreenElement) keyboard.unlock();
        return;
      }
      report('locked');
    } catch { if (ticket === generation) report('fallback'); }
  }
  window.PortfolioFullscreen = {
    refresh: () => report(document.documentElement.dataset.escapeFullscreen || 'idle'),
    async toggle(element) {
      if (document.fullscreenElement) return document.exitFullscreen();
      return element.requestFullscreen();
    }
  };
  document.addEventListener('fullscreenchange', sync);
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-portfolio-fullscreen]');
    if (!button) return;
    const player = button.closest('.player');
    player.querySelector('#launch-game')?.click();
    window.PortfolioFullscreen.toggle(player).catch(() => {
      const status = button.parentElement.querySelector('[data-fullscreen-status]');
      if (status) status.textContent = 'Fullscreen was refused. Click the game’s Fullscreen button or open the game in a new tab.';
    });
  });
  window.addEventListener('pagehide', () => keyboard?.unlock?.());
  report('idle');
})();
