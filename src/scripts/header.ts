// Sticky header behaviour, shared by Header.astro and the brand sites' MicroHeader.astro.
// - `.kk-headbar` gets `is-stuck` once the page scrolls, so the pill turns more opaque over content.
// - On mobile (≤ 760px) it also gets `is-hidden` while scrolling down and comes back on scroll up,
//   so the header and the bottom call bar don't both take space from the content.
// - `.kk-nav` gets a floating highlight (`.kk-nav-pill`): it sits under the current link
//   (aria-current, also when a scroll spy changes it) and slides to the link under the pointer or focus.
// Without JS the header still sticks and the current link keeps its own white background.

export function initHeader(headbar: HTMLElement | null) {
  if (!headbar) return;

  const mobile = matchMedia('(max-width: 760px)');
  const burger = headbar.querySelector('[aria-expanded]');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    headbar.classList.toggle('is-stuck', y > 4);
    // Ignore small jitters (momentum scrolling, the address bar resizing the viewport).
    if (Math.abs(y - lastY) < 8) return;
    const down = y > lastY;
    lastY = y;
    const menuOpen = burger?.getAttribute('aria-expanded') === 'true';
    headbar.classList.toggle('is-hidden', mobile.matches && down && y > headbar.offsetHeight && !menuOpen);
  };
  addEventListener('scroll', onScroll, { passive: true });
  mobile.addEventListener('change', () => headbar.classList.remove('is-hidden'));
  onScroll();

  const nav = headbar.querySelector<HTMLElement>('.kk-nav');
  if (!nav) return;
  const links = [...nav.querySelectorAll<HTMLAnchorElement>('a')];
  const pill = document.createElement('span');
  pill.className = 'kk-nav-pill';
  pill.setAttribute('aria-hidden', 'true');
  nav.prepend(pill);
  nav.classList.add('kk-nav--pill');

  let hovered: HTMLAnchorElement | null = null;
  const place = () => {
    const target = hovered ?? links.find((a) => a.hasAttribute('aria-current')) ?? null;
    links.forEach((a) => a.classList.toggle('is-lit', a === target));
    if (!target) {
      pill.classList.remove('is-on');
      return;
    }
    // Coming from hidden: jump to the link and fade in instead of sliding from the old spot.
    const jump = !pill.classList.contains('is-on');
    if (jump) pill.style.transition = 'opacity .25s';
    pill.style.width = `${target.offsetWidth}px`;
    pill.style.height = `${target.offsetHeight}px`;
    pill.style.transform = `translate(${target.offsetLeft}px, ${target.offsetTop}px)`;
    if (jump) {
      void pill.offsetWidth;
      pill.style.transition = '';
    }
    pill.classList.add('is-on');
  };

  links.forEach((a) => {
    a.addEventListener('pointerenter', () => { hovered = a; place(); });
    a.addEventListener('focus', () => { hovered = a; place(); });
  });
  nav.addEventListener('pointerleave', () => { hovered = null; place(); });
  nav.addEventListener('focusout', (e) => {
    if (!nav.contains(e.relatedTarget as Node | null)) { hovered = null; place(); }
  });
  new MutationObserver(place).observe(nav, { subtree: true, attributeFilter: ['aria-current'] });
  // Link widths change when the web font arrives or the nav wraps.
  new ResizeObserver(place).observe(nav);
  place();
}
