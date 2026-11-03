/* Native details provides a usable disclosure even when JavaScript is disabled. */
(() => {
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const initialized = new Set();
  const controllers = new WeakMap();

  function init(root = document) {
    root.querySelectorAll('[data-nav-more]').forEach(details => {
      if (controllers.has(details)) return;
      const summary = details.querySelector('summary');
      const panel = details.querySelector('.nav-more-popover');
      let closeDelay, finishClose, enterFrame, hovered = false;
      details.dataset.navReady = '';
      details.dataset.state = details.open ? 'open' : 'closed';
      summary.setAttribute('aria-expanded', String(details.open));

      const cancel = () => {
        clearTimeout(closeDelay);
        clearTimeout(finishClose);
        cancelAnimationFrame(enterFrame);
      };
      const close = ({ immediate = false } = {}) => {
        cancel();
        details.dataset.state = 'closed';
        summary.setAttribute('aria-expanded', 'false');
        panel.inert = true;
        const finish = () => { details.open = false; };
        if (immediate || reducedMotion.matches) finish();
        else finishClose = setTimeout(finish, 180);
      };
      const open = () => {
        cancel();
        initialized.forEach(other => {
          if (other !== details) controllers.get(other).close({ immediate: true });
        });
        details.open = true;
        panel.inert = false;
        summary.setAttribute('aria-expanded', 'true');
        enterFrame = requestAnimationFrame(() => {
          // Commit the starting pose before revealing the freshly opened panel.
          panel.getBoundingClientRect();
          details.dataset.state = 'open';
        });
      };
      const queueClose = () => {
        clearTimeout(closeDelay);
        closeDelay = setTimeout(() => {
          const active = document.activeElement;
          const focused = details.contains(active) && (active !== summary || summary.matches(':focus-visible'));
          if (!hovered && !focused) close();
        }, 140);
      };
      controllers.set(details, { close });
      initialized.add(details);
      details.addEventListener('pointerenter', event => {
        if (!finePointer.matches || event.pointerType === 'touch') return;
        hovered = true;
        open();
      });
      details.addEventListener('pointerleave', event => {
        if (!finePointer.matches || event.pointerType === 'touch') return;
        hovered = false;
        queueClose();
      });
      details.addEventListener('focusout', event => {
        if (details.contains(event.relatedTarget)) return;
        // Focus may briefly be on body between the blur and focus events.
        setTimeout(() => {
          if (!hovered && !details.contains(document.activeElement)) close();
        }, 0);
      });
      summary.addEventListener('click', event => {
        event.preventDefault();
        details.dataset.state === 'open' ? close() : open();
      });
      details.addEventListener('keydown', event => {
        if (event.key === 'Escape' && details.open) {
          event.preventDefault();
          event.stopPropagation();
          close();
          summary.focus();
        } else if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && event.target === summary) {
          event.preventDefault();
          open();
          const links = panel.querySelectorAll('a');
          (event.key === 'ArrowUp' ? links[links.length - 1] : links[0])?.focus();
        }
      });
      panel.addEventListener('click', event => {
        if (event.target.closest('a')) close({ immediate: true });
      });
      panel.querySelectorAll('a').forEach(link => {
        const target = new URL(link.href);
        const clean = path => path.replace(/\.html$/, '').replace(/\/$/, '') || '/';
        if (clean(target.pathname) === clean(location.pathname)) {
          if (!target.hash) link.setAttribute('aria-current', 'page');
          else if (target.hash === location.hash) link.setAttribute('aria-current', 'location');
        }
      });
    });
  }
  document.addEventListener('pointerdown', event => {
    initialized.forEach(details => {
      if (!details.contains(event.target)) controllers.get(details).close();
    });
  });
  window.addEventListener('resize', () => {
    initialized.forEach(details => controllers.get(details).close({ immediate: true }));
  });
  window.initPortfolioNavigation = init;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
})();
