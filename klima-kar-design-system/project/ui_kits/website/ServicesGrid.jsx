// ServicesGrid.jsx — dark/light mode aware services grid
const services = [
  { id: 'ac-recharge', tag: 'Klimatyzacja', title: 'Napełnianie i przegląd', desc: 'Odzysk czynnika, wykonanie próżni, kontrola szczelności, napełnienie czystym czynnikiem. Obsługa R134a, R1234yf i R12.', icon: 'wind' },
  { id: 'ac-diag', tag: 'Klimatyzacja', title: 'Diagnostyka i szczelność', desc: 'Diagnostyka komputerowa, testy szczelności elektroniczne i UV, diagnostyka kompresora na hamowni.', icon: 'search' },
  { id: 'compressor', tag: 'Klimatyzacja', title: 'Regeneracja sprężarki', desc: 'Uszczelnienie i regeneracja kompletnego sprzęgła. Płukanie układu z opiłków po zatarciu kompresora.', icon: 'settings' },
  { id: 'sanit', tag: 'Dezynfekcja', title: 'Dezynfekcja i odkażanie', desc: 'Dezynfekcja chemiczna metodą ultradźwiękową (120 zł) lub skuteczna metoda ręczna TUNAP (250 zł). Odgrzybianie.', icon: 'shield' },
  { id: 'heater', tag: 'Ogrzewanie', title: 'Ogrzewacze postojowe', desc: 'Montaż, serwis i diagnostyka niezależnych ogrzewaczy Webasto i Eberspächer. Naprawa i montaż nowych instalacji.', icon: 'flame' },
  { id: 'defa', tag: 'Ogrzewanie', title: 'DEFA — ogrzewanie elektryczne', desc: 'Doradztwo i montaż elektrycznych ogrzewaczy postojowych DEFA. Podgrzewanie silnika, wnętrza i ładowanie akumulatora.', icon: 'zap' },
];

const iconPaths = {
  wind:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/></svg>,
  search:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  settings:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  shield:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  flame:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>,
  zap:     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>,
};

const ServiceCard = ({ service, theme }) => {
  const [hovered, setHovered] = React.useState(false);
  const dark = theme === 'dark';
  const bg        = dark ? (hovered ? '#1C2E42' : '#162336') : (hovered ? '#fff' : '#fff');
  const border    = hovered ? '#1C5EA6' : (dark ? 'rgba(255,255,255,0.08)' : '#E8EFF4');
  const iconBg    = hovered ? '#1C5EA6' : (dark ? 'rgba(28,94,166,0.25)' : '#EDF8FC');
  const iconColor = hovered ? '#fff' : '#1C5EA6';
  const tagColor  = '#3388BF';
  const titleColor= dark ? '#E8EFF4' : '#0D1B2E';
  const descColor = dark ? '#5A7080' : '#5A7080';

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: bg, borderRadius: 6, border: `1.5px solid ${border}`, padding: '24px 22px',
        boxShadow: hovered ? '0 6px 20px rgba(13,27,46,0.18)' : (dark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(13,27,46,0.08)'),
        transition: 'all 180ms ease-out', cursor: 'default', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ width: 44, height: 44, background: iconBg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor, transition: 'all 180ms', flexShrink: 0 }}>
        {iconPaths[service.icon]}
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: tagColor, fontFamily: 'Barlow, sans-serif', marginBottom: 4 }}>{service.tag}</div>
        <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 20, fontWeight: 700, color: titleColor, marginBottom: 6, lineHeight: 1.2 }}>{service.title}</h3>
        <p style={{ fontSize: 13, color: descColor, lineHeight: 1.55, fontFamily: 'Barlow, sans-serif' }}>{service.desc}</p>
      </div>
    </div>
  );
};

const ServicesGrid = ({ theme, onNavigate }) => {
  const dark = theme === 'dark';
  const bg       = dark ? '#0D1B2E' : '#F4F7FB';
  const headCol  = dark ? '#E8EFF4' : '#0D1B2E';
  const subCol   = dark ? '#5A7080' : '#5A7080';

  return (
    <section style={{ background: bg, padding: '72px 40px', transition: 'background 200ms' }} id="services">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 48, maxWidth: 580 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#3388BF', fontFamily: 'Barlow, sans-serif', marginBottom: 10 }}>Nasze usługi</div>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 42, fontWeight: 700, color: headCol, lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 14 }}>Kompleksowy serwis<br />klimatyzacji i ogrzewania</h2>
          <p style={{ fontSize: 15, color: subCol, lineHeight: 1.6, fontFamily: 'Barlow, sans-serif' }}>Wykonujemy pełen zakres napraw i obsługi — od diagnostyki po regenerację sprężarek, wymianę podzespołów i montaż ogrzewaczy postojowych.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {services.map(s => <ServiceCard key={s.id} service={s} theme={theme} />)}
        </div>
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <button onClick={() => onNavigate && onNavigate('prices')}
            style={{ background: 'transparent', color: '#1C5EA6', border: '1.5px solid #1C5EA6', borderRadius: 4, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Barlow, sans-serif' }}>
            Zobacz cennik →
          </button>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { ServicesGrid });
