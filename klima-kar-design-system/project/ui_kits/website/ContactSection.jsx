// ContactSection.jsx — dark/light mode + real contact info
const ContactSection = ({ theme }) => {
  const [form, setForm] = React.useState({ name: '', phone: '', service: '', car: '', notes: '' });
  const [sent, setSent] = React.useState(false);
  const dark = theme === 'dark';

  const bg       = dark ? '#0D1B2E' : '#F4F7FB';
  const cardBg   = dark ? '#162336' : '#fff';
  const border   = dark ? 'rgba(255,255,255,0.08)' : '#E8EFF4';
  const headCol  = dark ? '#E8EFF4' : '#0D1B2E';
  const subCol   = dark ? '#5A7080' : '#5A7080';
  const iconBg   = dark ? 'rgba(28,94,166,0.25)' : '#EDF8FC';
  const inputBg  = dark ? '#0D1B2E' : '#fff';
  const inputBdr = dark ? 'rgba(255,255,255,0.12)' : '#D0DDE5';
  const inputCol = dark ? '#E8EFF4' : '#1A2A3A';
  const labelCol = dark ? '#E8EFF4' : '#1A2A3A';
  const mapBg    = dark ? '#1C2E42' : '#D0DDE5';

  const inputStyle = { fontFamily: 'Barlow, sans-serif', fontSize: 14, padding: '9px 12px', borderRadius: 4,
    border: `1.5px solid ${inputBdr}`, background: inputBg, color: inputCol, outline: 'none', width: '100%', boxSizing: 'border-box' };

  const handleSubmit = e => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3500); };

  const contactItems = [
    { icon: 'map-pin', label: 'Adres', lines: ['ul. Grota Roweckiego 129', 'Wrocław 52-214'] },
    { icon: 'phone',   label: 'Telefon', lines: ['71 337 14 50', '605 594 506'] },
    { icon: 'mail',    label: 'E-mail', lines: ['serwis@klima-kar.pl'] },
    { icon: 'clock',   label: 'Godziny otwarcia', lines: ['Poniedziałek – Piątek: 9:00 – 17:00', 'Sobota – Niedziela: nieczynne'] },
  ];

  const icons = {
    'map-pin': <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    phone:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.01 2.18 2 2 0 012 .01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>,
    mail:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    clock:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
  };

  return (
    <section style={{ background: bg, padding: '72px 40px', transition: 'background 200ms' }} id="contact">
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#3388BF', fontFamily: 'Barlow, sans-serif', marginBottom: 10 }}>Kontakt</div>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 38, fontWeight: 700, color: headCol, lineHeight: 1.1, marginBottom: 28 }}>Skontaktuj się<br />lub odwiedź nas</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>
            {contactItems.map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, background: iconBg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#1C5EA6' }}>
                  {icons[item.icon]}
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: dark ? '#3A5068' : '#7A94A8', fontFamily: 'Barlow, sans-serif', marginBottom: 2 }}>{item.label}</div>
                  {item.lines.map(l => <div key={l} style={{ fontSize: 14, color: headCol, fontFamily: 'Barlow, sans-serif', lineHeight: 1.5 }}>{l}</div>)}
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div style={{ borderRadius: 6, height: 160, background: mapBg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${border}` }}>
            <div style={{ textAlign: 'center', color: dark ? '#3A5068' : '#7A94A8' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ margin: '0 auto 8px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <div style={{ fontSize: 12, fontFamily: 'Barlow, sans-serif', fontWeight: 500 }}>ul. Grota Roweckiego 129, Wrocław</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ background: cardBg, borderRadius: 8, padding: 32, boxShadow: dark ? '0 4px 16px rgba(0,0,0,0.35)' : '0 4px 16px rgba(13,27,46,0.10)', border: `1px solid ${border}` }}>
          <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 24, fontWeight: 700, color: headCol, marginBottom: 6 }}>Umów wizytę</h3>
          <p style={{ fontSize: 13, color: subCol, fontFamily: 'Barlow, sans-serif', marginBottom: 24, lineHeight: 1.5 }}>Wypełnij formularz — oddzwonimy w ciągu 1 dnia roboczego.</p>
          {sent ? (
            <div style={{ background: '#E6F5EC', border: '1px solid #1A8A4A', borderRadius: 6, padding: '16px 20px', color: '#1A8A4A', fontSize: 14, fontFamily: 'Barlow, sans-serif', fontWeight: 600 }}>
              Dziękujemy! Oddzwonimy wkrótce.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><label style={{ fontSize: 12, fontWeight: 600, color: labelCol, fontFamily: 'Barlow, sans-serif', marginBottom: 4, display: 'block' }}>Imię i nazwisko</label>
                  <input style={inputStyle} placeholder="Jan Kowalski" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div><label style={{ fontSize: 12, fontWeight: 600, color: labelCol, fontFamily: 'Barlow, sans-serif', marginBottom: 4, display: 'block' }}>Telefon</label>
                  <input style={inputStyle} placeholder="71 337 14 50" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
              </div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: labelCol, fontFamily: 'Barlow, sans-serif', marginBottom: 4, display: 'block' }}>Rodzaj usługi</label>
                <select style={inputStyle} value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                  <option value="">Wybierz usługę...</option>
                  <option>Klimatyzacja — przegląd i napełnianie R134a</option>
                  <option>Klimatyzacja — przegląd i napełnianie R1234yf</option>
                  <option>Klimatyzacja — diagnostyka nieszczelności</option>
                  <option>Dezynfekcja chemiczna (120 zł)</option>
                  <option>Dezynfekcja TUNAP (250 zł)</option>
                  <option>Ogrzewacz postojowy — montaż Webasto/Eberspächer</option>
                  <option>Serwis Webasto / Eberspächer / DEFA</option>
                  <option>Inne / diagnostyka</option>
                </select>
              </div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: labelCol, fontFamily: 'Barlow, sans-serif', marginBottom: 4, display: 'block' }}>Marka i model pojazdu</label>
                <input style={inputStyle} placeholder="np. Volkswagen Golf 2020" value={form.car} onChange={e => setForm({ ...form, car: e.target.value })} /></div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: labelCol, fontFamily: 'Barlow, sans-serif', marginBottom: 4, display: 'block' }}>Uwagi (opcjonalnie)</label>
                <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 72 }} placeholder="Opisz problem lub dodaj informacje..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
              <button type="submit" style={{ background: '#1C5EA6', color: '#fff', border: 'none', borderRadius: 4, padding: '11px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Barlow, sans-serif', marginTop: 4 }}>
                Wyślij zapytanie
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { ContactSection });
