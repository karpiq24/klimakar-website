// OFirmie.jsx — Company history timeline page
const OFirmie = ({ theme, onNavigate }) => {
  const dark = theme === 'dark';
  const bg      = dark ? '#0D1B2E' : '#F4F7FB';
  const cardBg  = dark ? '#162336' : '#fff';
  const headCol = dark ? '#E8EFF4' : '#0D1B2E';
  const subCol  = dark ? '#5A7080' : '#5A7080';
  const border  = dark ? 'rgba(255,255,255,0.08)' : '#E8EFF4';

  const timeline = [
    { year: '1989', title: 'Początek działalności', desc: 'Założyciel Krzysztof Karpiński otwiera warsztat zajmujący się serwisem zmechanizowanego sprzętu gospodarstwa domowego. Początki wolnej Polski — i naszej firmy.' },
    { year: '1993', title: 'Klimatyzacja samochodowa', desc: 'Wprowadzamy do oferty pełną obsługę urządzeń klimatyzacyjnych w samochodach osobowych i dostawczych. Nowa specjalizacja, która stała się naszą pasją.' },
    { year: '1999', title: 'Klima-Kar — nowa nazwa', desc: 'Firma przyjmuje nazwę Klima-Kar i przenosi siedzibę na ul. Grota Roweckiego 129 we Wrocławiu. Od tej chwili skupiamy się wyłącznie na klimatyzacjach samochodowych.' },
    { year: '2008', title: 'Rozbudowa i ogrzewacze', desc: 'Rozbudowujemy serwis o dwa stanowiska z podnośnikami. Wprowadzamy naprawy i montaż ogrzewań postojowych Webasto i Eberspächer. Wkrótce zostajemy ich Autoryzowanym Serwisem.' },
    { year: 'Dziś', title: 'Firma rodzinna z tradycją', desc: 'Dwupokoleniowa firma rodzinna. Klimatyzacje samochodowe oraz ogrzewania postojowe Webasto, Eberspächer i DEFA. Tysiące skutecznych napraw i zadowolonych klientów we Wrocławiu.' },
  ];

  return (
    <div style={{ background: bg, minHeight: '60vh', transition: 'background 200ms' }}>
      {/* Page hero */}
      <div style={{ background: dark ? '#060D16' : '#0D1B2E', padding: '56px 40px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#40B0D9', fontFamily: 'Barlow, sans-serif', marginBottom: 10 }}>O firmie</div>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>Firma rodzinna<br />z dwupokoleniową tradycją</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.6, fontFamily: 'Barlow, sans-serif', maxWidth: 560 }}>Jesteśmy firmą rodzinną z wieloletnim doświadczeniem w branży chłodnictwa i ogrzewania. Nasza pasja i zaangażowanie sprawiają, że jesteśmy liderem w naprawach klimatyzacji samochodowej we Wrocławiu.</p>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#3388BF', fontFamily: 'Barlow, sans-serif', marginBottom: 32 }}>Historia firmy</div>
        <div style={{ position: 'relative' }}>
          {/* vertical line */}
          <div style={{ position: 'absolute', left: 64, top: 0, bottom: 0, width: 2, background: dark ? 'rgba(255,255,255,0.08)' : '#E8EFF4' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {timeline.map((item, i) => (
              <div key={item.year} style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
                {/* Year badge */}
                <div style={{ width: 128, flexShrink: 0, display: 'flex', justifyContent: 'flex-end', paddingRight: 24, paddingTop: 18, boxSizing: 'border-box' }}>
                  <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 22, fontWeight: 700, color: i === timeline.length - 1 ? '#1C5EA6' : (dark ? '#3A5068' : '#A8BEC9') }}>{item.year}</span>
                </div>
                {/* Dot */}
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: i === timeline.length - 1 ? '#1C5EA6' : '#3388BF', border: `3px solid ${bg}`, flexShrink: 0, marginTop: 20, zIndex: 1 }} />
                {/* Card */}
                <div style={{ flex: 1, background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: '20px 24px', boxShadow: dark ? '0 2px 8px rgba(0,0,0,0.25)' : '0 2px 8px rgba(13,27,46,0.07)' }}>
                  <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 20, fontWeight: 700, color: headCol, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: subCol, lineHeight: 1.6, fontFamily: 'Barlow, sans-serif' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why us section */}
        <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 36, fontWeight: 700, color: headCol, lineHeight: 1.1, marginBottom: 16 }}>Dlaczego Klima-Kar?</h2>
            <p style={{ fontSize: 15, color: subCol, lineHeight: 1.65, fontFamily: 'Barlow, sans-serif', marginBottom: 12 }}>
              Zaufaj ekspertom z wieloletnim doświadczeniem! Nasza wiedza, poparta tysiącami udanych napraw i serwisów, to Twoja gwarancja trafnej diagnozy i skutecznego rozwiązania problemu.
            </p>
            <p style={{ fontSize: 15, color: subCol, lineHeight: 1.65, fontFamily: 'Barlow, sans-serif', marginBottom: 24 }}>
              Dbamy o Twój komfort i czas — dlatego popularne części zamienne i filtry kabinowe mamy dostępne od ręki.
            </p>
            <button onClick={() => onNavigate('contact')}
              style={{ background: '#1C5EA6', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Barlow, sans-serif' }}>
              Skontaktuj się z nami
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['35+', 'lat doświadczenia'],
              ['3', 'autoryzacje partnerskie'],
              ['Wrocław', 'siedziba od 1999'],
              ['Rodzinna', 'firma dwupokoleniowa'],
            ].map(([val, lbl]) => (
              <div key={lbl} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 32, fontWeight: 700, color: '#1C5EA6', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 12, color: subCol, fontFamily: 'Barlow, sans-serif', marginTop: 6 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { OFirmie });
