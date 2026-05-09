// Footer.jsx — dark/light mode + real info
const Footer = ({ theme, onNavigate }) => {
  const dark = theme === 'dark';
  const bg = dark ? '#030810' : '#060D16';

  return (
    <footer style={{ background: bg, padding: '48px 40px 28px', transition: 'background 200ms', fontFamily: 'Barlow, sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 40 }}>
          <div>
            {/* Logo inline inject */}
            <LogoInject height={34} theme="white" style={{ marginBottom: 16 }} />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.40)', lineHeight: 1.65, maxWidth: 260, marginBottom: 16 }}>
              Firma rodzinna z wielopokoleniową tradycją w branży chłodnictwa i ogrzewania. Wrocław, działamy od 1989 roku.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Webasto', 'Eberspächer', 'DEFA'].map(b => (
                <span key={b} style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>{b}</span>
              ))}
            </div>
          </div>
          {[
            { title: 'Usługi', links: [['services','Klimatyzacja'], ['services','Dezynfekcja'], ['heating','Ogrzewacze postojowe'], ['heating','DEFA'], ['prices','Cennik']] },
            { title: 'Informacje', links: [['about','O firmie'], ['about','Historia'], ['about','Gwarancja'], ['contact','Jak dojechać?']] },
            { title: 'Kontakt', links: [['contact','ul. Grota Roweckiego 129'], ['contact','Wrocław 52-214'], ['contact','71 337 14 50'], ['contact','605 594 506'], ['contact','serwis@klima-kar.pl']] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#40B0D9', marginBottom: 14 }}>{col.title}</div>
              {col.links.map(([page, label]) => (
                <a key={label} href="#" onClick={e => { e.preventDefault(); onNavigate(page); }}
                  style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.40)', marginBottom: 8, lineHeight: 1.4, textDecoration: 'none', cursor: 'pointer' }}>{label}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>© 2025 Klima-Kar. Wszelkie prawa zastrzeżone.</span>
          <a href="mailto:serwis@klima-kar.pl" style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>serwis@klima-kar.pl</a>
        </div>
      </div>
    </footer>
  );
};

// Small helper to inject white logo inline
const LogoInject = ({ height, theme: logoTheme, style }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    async function inject() {
      if (!ref.current) return;
      ref.current.innerHTML = '';
      const r = await fetch('../../assets/logo_name.svg');
      const text = await r.text();
      const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
      const svg = doc.querySelector('svg');
      svg.style.height = height + 'px';
      svg.style.width = 'auto';
      svg.style.display = 'block';
      ref.current.appendChild(svg);
    }
    inject();
  }, []);
  const cls = logoTheme === 'white' ? 'logo-white' : 'logo-colored';
  return <div ref={ref} className={cls} style={style}></div>;
};

Object.assign(window, { Footer });
