// Header.jsx — Klima-Kar header with light/dark mode + colored logo
const Header = ({ currentPage, onNavigate, theme, onToggleTheme }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const logoRef = React.useRef(null);
  const logoMobileRef = React.useRef(null);
  const dark = theme === 'dark';

  const navLinks = [
    { id: 'home', label: 'Strona główna' },
    { id: 'services', label: 'Klimatyzacja' },
    { id: 'heating', label: 'Ogrzewanie' },
    { id: 'about', label: 'O firmie' },
    { id: 'prices', label: 'Cennik' },
    { id: 'contact', label: 'Kontakt' },
  ];

  // Inject SVG inline so CSS class colors apply
  React.useEffect(() => {
    async function injectLogo(container, height) {
      if (!container) return;
      container.innerHTML = '';
      const r = await fetch('../../assets/logo_name.svg');
      const text = await r.text();
      const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
      const svg = doc.querySelector('svg');
      svg.style.height = height + 'px';
      svg.style.width = 'auto';
      svg.style.display = 'block';
      container.appendChild(svg);
    }
    injectLogo(logoRef.current, 34);
    injectLogo(logoMobileRef.current, 27);
  }, []);

  const navBg    = dark ? '#0D1B2E' : '#ffffff';
  const topBg    = '#1C5EA6';
  const linkCol  = dark ? 'rgba(255,255,255,0.72)' : '#3A5068';
  const linkAct  = dark ? '#ffffff' : '#0D1B2E';
  const linkActBg= dark ? 'rgba(28,94,166,0.40)' : '#EDF8FC';
  const divider  = dark ? 'rgba(255,255,255,0.08)' : '#E8EFF4';

  // Logo class: colored on light bg, white on dark bg
  const logoClass = dark ? 'logo-white' : 'logo-colored';

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, fontFamily: 'Barlow, sans-serif' }}>
      {/* SVG color rules */}
      <style>{`
        .logo-colored .st0 { fill: #1C5EA6; }
        .logo-colored .st1 { fill: #3388BF; }
        .logo-colored .st2 { fill: #40B0D9; }
        .logo-white .st0, .logo-white .st1, .logo-white .st2 { fill: #ffffff; }
        .logo-inject svg { display: block; }
        @media (max-width: 900px) {
          .kk-nav-desktop { display: none !important; }
          .kk-nav-mobile { display: flex !important; }
        }
      `}</style>

      {/* Top bar */}
      <div style={{ background: topBg, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 40px' }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <TopBarItem icon="phone" text="71 337 14 50" href="tel:713371450" />
          <TopBarItem icon="phone" text="605 594 506" href="tel:605594506" />
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <TopBarItem icon="clock" text="Pon–Pt: 9:00–17:00" />
          <TopBarItem icon="mail" text="serwis@klima-kar.pl" href="mailto:serwis@klima-kar.pl" />
        </div>
      </div>

      {/* Main nav */}
      <nav className="kk-nav-desktop" style={{ background: navBg, borderBottom: `1px solid ${divider}`, display: 'flex', alignItems: 'center', padding: '0 40px', height: 64, gap: 0, transition: 'background 200ms' }}>
        <a href="#" onClick={e => { e.preventDefault(); onNavigate('home'); }}
          style={{ display: 'flex', alignItems: 'center', marginRight: 36, flexShrink: 0, textDecoration: 'none' }}>
          <div ref={logoRef} className={`logo-inject ${logoClass}`}></div>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 2, flex: 1 }}>
          {navLinks.map(link => (
            <a key={link.id} href="#"
              onClick={e => { e.preventDefault(); onNavigate(link.id); }}
              style={{
                color: currentPage === link.id ? linkAct : linkCol,
                fontSize: 14, fontWeight: 500, padding: '6px 13px', borderRadius: 4,
                textDecoration: 'none',
                background: currentPage === link.id ? linkActBg : 'transparent',
                transition: 'all 150ms',
              }}>{link.label}</a>
          ))}
        </div>

        {/* Dark mode toggle */}
        <button onClick={onToggleTheme}
          title={dark ? 'Tryb jasny' : 'Tryb ciemny'}
          style={{ background: 'none', border: `1px solid ${dark ? 'rgba(255,255,255,0.2)' : '#D0DDE5'}`, borderRadius: 4, padding: '6px 10px', cursor: 'pointer', color: dark ? 'rgba(255,255,255,0.7)' : '#5A7080', marginRight: 10, display: 'flex', alignItems: 'center' }}>
          {dark
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
          }
        </button>

        <button onClick={() => onNavigate('contact')}
          style={{ background: '#1C5EA6', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Barlow, sans-serif', flexShrink: 0 }}>
          Umów wizytę
        </button>
      </nav>

      {/* Mobile nav */}
      <nav style={{ display: 'none', background: navBg, borderBottom: `1px solid ${divider}`, justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', height: 54 }} className="kk-nav-mobile">
        <div ref={logoMobileRef} className={`logo-inject ${logoClass}`}></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={onToggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: dark ? 'rgba(255,255,255,0.7)' : '#5A7080' }}>
            {dark ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>}
          </button>
          <button onClick={() => setMobileOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ width: 22, height: 2, background: dark ? 'rgba(255,255,255,0.8)' : '#3A5068', borderRadius: 2, display: 'block' }} />
            <span style={{ width: 22, height: 2, background: dark ? 'rgba(255,255,255,0.8)' : '#3A5068', borderRadius: 2, display: 'block' }} />
            <span style={{ width: 22, height: 2, background: dark ? 'rgba(255,255,255,0.8)' : '#3A5068', borderRadius: 2, display: 'block' }} />
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div style={{ background: navBg, borderBottom: `1px solid ${divider}`, padding: '8px 20px 16px' }}>
          {navLinks.map(link => (
            <a key={link.id} href="#" onClick={e => { e.preventDefault(); onNavigate(link.id); setMobileOpen(false); }}
              style={{ display: 'block', color: currentPage === link.id ? linkAct : linkCol, fontSize: 15, fontWeight: 500, padding: '10px 0', borderBottom: `1px solid ${divider}`, textDecoration: 'none' }}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

const TopBarItem = ({ icon, text, href }) => {
  const icons = {
    phone: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.01 2.18 2 2 0 012 .01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>,
    clock: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
    mail:  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  };
  const inner = (
    <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.88)', fontSize: 11, fontWeight: 500, fontFamily: 'Barlow, sans-serif' }}>
      {icons[icon]}{text}
    </span>
  );
  return href ? <a href={href} style={{ textDecoration: 'none' }}>{inner}</a> : inner;
};

Object.assign(window, { Header });
