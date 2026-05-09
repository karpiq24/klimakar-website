// OgrzewaniePosojowe.jsx — Heating systems overview page
const OgrzewaniePosojowe = ({ theme, onNavigate }) => {
  const dark = theme === 'dark';
  const bg      = dark ? '#0D1B2E' : '#F4F7FB';
  const cardBg  = dark ? '#162336' : '#fff';
  const headCol = dark ? '#E8EFF4' : '#0D1B2E';
  const subCol  = dark ? '#5A7080' : '#5A7080';
  const border  = dark ? 'rgba(255,255,255,0.08)' : '#E8EFF4';

  const brands = [
    { name: 'Webasto', color: '#C8001E', tagline: 'Niezależne ogrzewanie spalinowe', desc: 'Jesteśmy Autoryzowanym Serwisem Webasto. Nasze wieloletnie doświadczenie i wiedza pozwalają na wykonywanie profesjonalnych napraw i montaży nowych instalacji dla pojazdów osobowych i dostawczych.', badges: ['Autoryzowany serwis', 'Montaż', 'Naprawa', 'Gwarancja'] },
    { name: 'Eberspächer', color: '#E85D00', tagline: 'Niezależne ogrzewanie spalinowe', desc: 'Autoryzowany Serwis Eberspächer. Profesjonalne naprawy i montaże ogrzewań spalinowych. Pełna diagnostyka komputerowa, wymiana podzespołów, naprawy gwarancyjne i pogwarancyjne.', badges: ['Autoryzowany serwis', 'Montaż', 'Naprawa', 'Diagnostyka'] },
    { name: 'DEFA', color: '#006BB4', tagline: 'Elektryczne ogrzewanie postojowe', desc: 'Polecamy osobom posiadającym dostęp do sieci elektrycznej w miejscu postoju. DEFA pozwala ogrzać wnętrze pojazdu i silnik, a także naładować akumulator. Oferujemy doradztwo i montaż.', badges: ['Doradztwo', 'Montaż', 'Serwis'] },
  ];

  return (
    <div style={{ background: bg, minHeight: '60vh', transition: 'background 200ms' }}>
      <div style={{ background: dark ? '#060D16' : '#0D1B2E', padding: '56px 40px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#40B0D9', fontFamily: 'Barlow, sans-serif', marginBottom: 10 }}>Usługi</div>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>Ogrzewanie postojowe<br />Webasto, Eberspächer, DEFA</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.6, fontFamily: 'Barlow, sans-serif', maxWidth: 560 }}>Jesteśmy autoryzowanym serwisem trzech wiodących marek ogrzewaczy niezależnych. Wykonujemy montaże, naprawy gwarancyjne i pogwarancyjne.</p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {brands.map((brand, i) => (
            <div key={brand.name} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, overflow: 'hidden', boxShadow: dark ? '0 2px 8px rgba(0,0,0,0.25)' : '0 2px 8px rgba(13,27,46,0.07)', display: 'flex' }}>
              <div style={{ width: 6, background: brand.color, flexShrink: 0 }} />
              <div style={{ padding: '28px 32px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                  <div>
                    <div style={{ display: 'inline-block', background: brand.color, color: '#fff', fontFamily: 'Barlow Condensed, sans-serif', fontSize: 22, fontWeight: 700, padding: '3px 14px', borderRadius: 3, marginBottom: 6 }}>{brand.name}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: dark ? '#3A5068' : '#7A94A8', fontFamily: 'Barlow, sans-serif' }}>{brand.tagline}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {brand.badges.map(b => (
                      <span key={b} style={{ background: dark ? 'rgba(28,94,166,0.2)' : '#EDF8FC', color: '#3388BF', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 9999, letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'Barlow, sans-serif' }}>{b}</span>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: 14, color: subCol, lineHeight: 1.65, fontFamily: 'Barlow, sans-serif', maxWidth: 680 }}>{brand.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 22, fontWeight: 700, color: headCol, marginBottom: 4 }}>Zapytaj o montaż lub naprawę</div>
            <div style={{ fontSize: 14, color: subCol, fontFamily: 'Barlow, sans-serif' }}>tel. <strong style={{ color: headCol }}>71 337 14 50</strong> · kom. <strong style={{ color: headCol }}>605 594 506</strong></div>
          </div>
          <button onClick={() => onNavigate('contact')} style={{ background: '#1C5EA6', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Barlow, sans-serif' }}>
            Umów wizytę
          </button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { OgrzewaniePosojowe });
