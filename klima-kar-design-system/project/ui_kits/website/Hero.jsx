// Hero.jsx — dark/light mode aware hero section
const Hero = ({ onNavigate, theme }) => {
  const dark = theme === 'dark';
  const logoRef = React.useRef(null);

  React.useEffect(() => {
    async function injectLogo(container) {
      if (!container) return;
      container.innerHTML = '';
      const r = await fetch('../../assets/logo_noname.svg');
      const text = await r.text();
      const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
      const svg = doc.querySelector('svg');
      svg.style.width = '100%';
      svg.style.height = '100%';
      container.appendChild(svg);
    }
    injectLogo(logoRef.current);
  }, []);

  const heroBg = dark ? '#060D16' : '#0D1B2E';

  return (
    <section style={{ background: heroBg, position: 'relative', overflow: 'hidden', padding: '80px 40px 72px', transition: 'background 200ms' }}>
      <style>{`
        .logo-white .st0, .logo-white .st1, .logo-white .st2 { fill: #ffffff; }
        .logo-colored .st0 { fill: #1C5EA6; }
        .logo-colored .st1 { fill: #3388BF; }
        .logo-colored .st2 { fill: #40B0D9; }
        .logo-bg-feature .st0,
        .logo-bg-feature .st1,
        .logo-bg-feature .st2 { fill: #4A6E94; }
        .logo-bg-feature svg { width: 100%; height: 100%; display: block; }
      `}</style>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 460, height: 460, borderRadius: '50%', border: '1px solid rgba(28,94,166,0.22)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -40, right: -40, width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(51,136,191,0.18)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(64,176,217,0.10)', pointerEvents: 'none' }} />

      {/* Logo as large, rotated, toned-down background feature */}
      <div
        ref={logoRef}
        className="logo-bg-feature"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          right: '-180px',
          width: 880,
          height: 880,
          transform: 'translateY(-50%) rotate(-45deg)',
          opacity: 0.07,
          pointerEvents: 'none',
          filter: 'blur(0.3px)',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 64, position: 'relative' }}>
        <div style={{ flex: 1, maxWidth: 640 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(28,94,166,0.22)', border: '1px solid rgba(28,94,166,0.4)', borderRadius: 9999, padding: '4px 14px', marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#40B0D9' }} />
            <span style={{ color: '#7AAED4', fontSize: 12, fontWeight: 600, fontFamily: 'Barlow, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Działamy od 1989 roku · Wrocław</span>
          </div>

          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20 }}>
            Klimatyzacja<br /><span style={{ color: '#40B0D9' }}>i ogrzewanie</span><br />Twojego auta
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.65, fontFamily: 'Barlow, sans-serif', marginBottom: 32, maxWidth: 480 }}>
            Kompleksowy serwis układów klimatyzacji i ogrzewaczy postojowych. Autoryzowany partner Webasto, Eberspächer i DEFA. Firma rodzinna z wielopokoleniową tradycją.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('contact')}
              style={{ background: '#1C5EA6', color: '#fff', border: 'none', borderRadius: 4, padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Barlow, sans-serif' }}>
              Umów wizytę
            </button>
            <button onClick={() => onNavigate('prices')}
              style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 4, padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Barlow, sans-serif' }}>
              Cennik usług
            </button>
          </div>

          <div style={{ display: 'flex', gap: 32, marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
            {[['35+', 'lat doświadczenia'], ['3', 'autoryzacje'], ['71 337 14 50', 'zadzwoń do nas']].map(([val, lbl]) => (
              <div key={lbl}>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'Barlow, sans-serif', marginTop: 4 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Hero });
