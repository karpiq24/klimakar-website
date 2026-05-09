// Klimatyzacja.jsx — A/C service detail page
const Klimatyzacja = ({ theme, onNavigate }) => {
  const dark = theme === 'dark';
  const bg      = dark ? '#0D1B2E' : '#F4F7FB';
  const cardBg  = dark ? '#162336' : '#fff';
  const headCol = dark ? '#E8EFF4' : '#0D1B2E';
  const subCol  = dark ? '#5A7080' : '#5A7080';
  const border  = dark ? 'rgba(255,255,255,0.08)' : '#E8EFF4';

  const services = [
    { title: 'Napełnianie i serwis układu', desc: 'Odzysk czynnika, wykonanie próżni, kontrola szczelności, napełnienie czystym czynnikiem R134a, R1234yf lub R12. Kontrola ciśnienia podczas pracy. Uzupełnienie oleju i barwnika UV.', icon: 'wind', price: 'od 200 zł' },
    { title: 'Diagnostyka i test szczelności', desc: 'Elektroniczne testy szczelności układu z użyciem wykrywacza nieszczelności i barwnika UV. Diagnostyka komputerowa. Diagnostyka kompresora na hamowni.', icon: 'search', price: '200 zł' },
    { title: 'Regeneracja sprężarki', desc: 'Naprawa i regeneracja sprężarek klimatyzacji wszystkich marek pojazdów. Uszczelnienie i regeneracja kompletnego sprzęgła. Płukanie układu z opiłków po zatarciu kompresora.', icon: 'settings', price: 'od 1000 zł' },
    { title: 'Dezynfekcja TUNAP', desc: 'Najskuteczniejsza chemiczna metoda ręczna oczyszczania układu. Eliminacja bakterii, grzybów i nieprzyjemnych zapachów z parownika i kanałów wentylacyjnych.', icon: 'shield', price: '250 zł' },
    { title: 'Dezynfekcja ultradźwiękowa', desc: 'Szybka i skuteczna dezynfekcja chemiczna metodą ultradźwiękową. Zapobieganie i usuwanie nieprzyjemnych zapachów. Idealna jako profilaktyczne odświeżenie układu.', icon: 'zap', price: '120 zł' },
    { title: 'Wymiana podzespołów', desc: 'Wymiana skraplacza, parownika, przewodów elastycznych i aluminiowych. Naprawa przewodów aluminiowych i aluminiowo-gumowych. Wymiana filtrów kabinowych.', icon: 'layers', price: 'od 250 zł' },
  ];

  const iconPaths = {
    wind:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/></svg>,
    search:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    settings:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    shield:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    zap:     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>,
    layers:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>,
  };

  return (
    <div style={{ background: bg, minHeight: '60vh', transition: 'background 200ms' }}>
      <div style={{ background: dark ? '#060D16' : '#0D1B2E', padding: '56px 40px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#40B0D9', fontFamily: 'Barlow, sans-serif', marginBottom: 10 }}>Usługi</div>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>Klimatyzacja<br />samochodowa</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.6, fontFamily: 'Barlow, sans-serif', maxWidth: 560 }}>Wykonujemy wszelkie naprawy: regeneracja sprężarek, naprawa przewodów, wymiana chłodnic i parowników, usuwanie nieprzyjemnych zapachów, dezynfekcja, napełnianie.</p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginBottom: 48 }}>
          {services.map(s => (
            <div key={s.title} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: '22px 22px', boxShadow: dark ? '0 2px 8px rgba(0,0,0,0.25)' : '0 2px 8px rgba(13,27,46,0.07)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, background: dark ? 'rgba(28,94,166,0.25)' : '#EDF8FC', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1C5EA6' }}>
                  {iconPaths[s.icon]}
                </div>
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 16, fontWeight: 700, color: '#1C5EA6' }}>{s.price}</span>
              </div>
              <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 18, fontWeight: 700, color: headCol, lineHeight: 1.2 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: subCol, lineHeight: 1.55, fontFamily: 'Barlow, sans-serif' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#1C5EA6', borderRadius: 6, padding: '32px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Gotowy na serwis klimatyzacji?</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontFamily: 'Barlow, sans-serif' }}>Zadzwoń: <strong style={{ color: '#fff' }}>71 337 14 50</strong> lub umów się online</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => onNavigate('prices')} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 4, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Barlow, sans-serif' }}>
              Zobacz cennik
            </button>
            <button onClick={() => onNavigate('contact')} style={{ background: '#fff', color: '#1C5EA6', border: 'none', borderRadius: 4, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Barlow, sans-serif' }}>
              Umów wizytę
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Klimatyzacja });
