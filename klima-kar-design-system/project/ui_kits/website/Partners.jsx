// Partners.jsx — dark/light mode aware partner brands section
const partners = [
  { name: 'Webasto', color: '#C8001E', desc: 'Autoryzowany serwis ogrzewaczy spalinowych i elektrycznych Webasto — montaż, naprawy gwarancyjne i pogwarancyjne dla pojazdów osobowych i dostawczych.' },
  { name: 'Eberspächer', color: '#E85D00', desc: 'Profesjonalny serwis ogrzewaczy Eberspächer. Diagnostyka, wymiana podzespołów, naprawy. Autoryzowany serwis z wieloletnim doświadczeniem.' },
  { name: 'DEFA', color: '#006BB4', desc: 'Autoryzowany instalator i serwis DEFA — elektryczne ogrzewanie silnika, wnętrza i ładowanie akumulatora. Idealne dla miejsc z dostępem do prądu.' },
];

const PartnerCard = ({ partner, theme }) => {
  const dark = theme === 'dark';
  return (
    <div style={{ background: dark ? '#162336' : '#fff', borderRadius: 6, padding: '28px 28px 24px',
      boxShadow: dark ? '0 2px 8px rgba(0,0,0,0.30)' : '0 2px 8px rgba(13,27,46,0.09)',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : '#E8EFF4'}`, flex: 1, minWidth: 240 }}>
      <div style={{ display: 'inline-block', background: partner.color, color: '#fff',
        fontFamily: 'Barlow Condensed, sans-serif', fontSize: 22, fontWeight: 700,
        padding: '4px 14px', borderRadius: 3, marginBottom: 16 }}>{partner.name}</div>
      <p style={{ fontSize: 13, color: dark ? '#5A7080' : '#5A7080', lineHeight: 1.6, fontFamily: 'Barlow, sans-serif', marginBottom: 14 }}>{partner.desc}</p>
      <div style={{ display: 'flex', gap: 6 }}>
        {['Gwarancja', 'Pogwarancja', 'Montaż'].map(t => (
          <span key={t} style={{ background: dark ? 'rgba(28,94,166,0.25)' : '#EDF8FC', color: '#3388BF', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 9999, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'Barlow, sans-serif' }}>{t}</span>
        ))}
      </div>
    </div>
  );
};

const Partners = ({ theme }) => {
  const dark = theme === 'dark';
  return (
    <section style={{ background: dark ? '#060D16' : '#0D1B2E', padding: '72px 40px', transition: 'background 200ms' }} id="partners">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#40B0D9', fontFamily: 'Barlow, sans-serif', marginBottom: 10 }}>Autoryzacje</div>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 38, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>Oficjalny partner<br />trzech wiodących marek</h2>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, fontFamily: 'Barlow, sans-serif', maxWidth: 340 }}>
            Certyfikaty autoryzacji gwarantują najwyższy standard usług i oryginalne części zamienne.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {partners.map(p => <PartnerCard key={p.name} partner={p} theme={theme} />)}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Partners });
