// Cennik.jsx — Price list page
const Cennik = ({ theme, onNavigate }) => {
  const dark = theme === 'dark';
  const bg      = dark ? '#0D1B2E' : '#F4F7FB';
  const cardBg  = dark ? '#162336' : '#fff';
  const headCol = dark ? '#E8EFF4' : '#0D1B2E';
  const subCol  = dark ? '#5A7080' : '#5A7080';
  const border  = dark ? 'rgba(255,255,255,0.08)' : '#E8EFF4';
  const rowAlt  = dark ? 'rgba(255,255,255,0.03)' : '#F8FAFC';
  const rowHdr  = dark ? 'rgba(28,94,166,0.20)' : '#EDF8FC';

  const Section = ({ title, rows, note }) => (
    <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, overflow: 'hidden', boxShadow: dark ? '0 2px 8px rgba(0,0,0,0.25)' : '0 2px 8px rgba(13,27,46,0.07)', marginBottom: 20 }}>
      <div style={{ background: rowHdr, padding: '12px 20px', borderBottom: `1px solid ${border}` }}>
        <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 18, fontWeight: 700, color: '#1C5EA6' }}>{title}</h3>
        {note && <p style={{ fontSize: 12, color: subCol, fontFamily: 'Barlow, sans-serif', marginTop: 2 }}>{note}</p>}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {rows.map(([label, price], i) => (
            <tr key={label} style={{ background: i % 2 === 1 ? rowAlt : 'transparent' }}>
              <td style={{ padding: '11px 20px', fontSize: 14, color: headCol, fontFamily: 'Barlow, sans-serif', lineHeight: 1.4, borderBottom: i < rows.length - 1 ? `1px solid ${border}` : 'none' }}>{label}</td>
              <td style={{ padding: '11px 20px', fontSize: 14, fontWeight: 700, color: '#1C5EA6', fontFamily: 'Barlow Condensed, sans-serif', textAlign: 'right', whiteSpace: 'nowrap', borderBottom: i < rows.length - 1 ? `1px solid ${border}` : 'none' }}>{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{ background: bg, minHeight: '60vh', transition: 'background 200ms' }}>
      {/* Page hero */}
      <div style={{ background: dark ? '#060D16' : '#0D1B2E', padding: '56px 40px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#40B0D9', fontFamily: 'Barlow, sans-serif', marginBottom: 10 }}>Cennik</div>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>Cennik usług<br />klimatyzacja samochodowa</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.6, fontFamily: 'Barlow, sans-serif', maxWidth: 560 }}>Podane ceny są cenami netto. W razie pytań prosimy o kontakt telefoniczny lub e-mailowy.</p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 40px' }}>
        <Section title="Dezynfekcja" rows={[
          ['Dezynfekcja chemiczna metodą ultradźwiękową — usuwanie nieprzyjemnych zapachów', '120 zł'],
          ['Dezynfekcja TUNAP — odgrzybianie najskuteczniejszą, chemiczną metodą ręczną', '250 zł'],
        ]} />

        <Section title="Obsługa układu klimatyzacji R134a" note="Auta od 1993 r. do 2014 r. i niektóre po 2014 r." rows={[
          ['Serwis układu, uzupełnienie czynnika R134a, oleju, UV', '200 zł + 35 zł/100g powyżej 50g'],
        ]} />

        <Section title="Obsługa układu klimatyzacji R1234yf" note="Niektóre auta od 2014 r. i większość od 2017 r." rows={[
          ['Serwis układu, uzupełnienie czynnika R1234yf, oleju, UV', '300 zł + 10 zł/10 gram powyżej 50g'],
        ]} />

        <Section title="Obsługa układu klimatyzacji R12" note="Auta sprzed 1993 r." rows={[
          ['Serwis układu, uzupełnienie czynnika zamiennik za R12, oleju, UV', '300 zł + 40 zł/100g powyżej 50g'],
        ]} />

        <Section title="Diagnostyka usterek" rows={[
          ['Diagnostyka komputerowa / Diagnostyka szczelności klimatyzacji', '200 zł'],
          ['Diagnostyka kompresora na hamowni', '200 zł'],
        ]} />

        <Section title="Naprawy i regeneracja" note="Do podanych cen należy doliczyć demontaż/montaż i napełnienie" rows={[
          ['Naprawa przewodu aluminiowego', 'od 250 zł'],
          ['Naprawa przewodu aluminiowo-gumowego', 'od 300 zł'],
          ['Regeneracja kompresora (uszczelnienie + regeneracja kpl. sprzęgła)', 'od 1000 zł'],
          ['Płukanie układu klimatyzacji z opiłków i brudnego oleju po zatarciu kompresora', 'od 1500 zł'],
        ]} />

        <Section title="Robocizna" rows={[
          ['Roboczogodzina', '250 zł'],
        ]} />

        {/* CTA */}
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginTop: 8 }}>
          <div>
            <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 20, fontWeight: 700, color: headCol, marginBottom: 4 }}>Masz pytania o cennik?</div>
            <div style={{ fontSize: 14, color: subCol, fontFamily: 'Barlow, sans-serif' }}>Zadzwoń: <strong style={{ color: headCol }}>71 337 14 50</strong> lub <strong style={{ color: headCol }}>605 594 506</strong></div>
          </div>
          <button onClick={() => onNavigate('contact')}
            style={{ background: '#1C5EA6', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Barlow, sans-serif' }}>
            Umów wizytę
          </button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Cennik });
