// "Które ogrzewanie dla Ciebie": water (wet) vs air (dry) heaters, with the matching kind of customer
// and the heater models we fit. Shared by /ogrzewanie-postojowe/ and the brand sites in sites/.

export type HeaterBrand = 'webasto' | 'eberspaecher';

export interface HeaterModel {
  brand: HeaterBrand;
  name: string;
  /** Path under public/ (manufacturer press packshot). */
  image: string;
  features: string[];
}

// Owner request 2026-10-13: Thermo Top Evo and Hydronic S3 for water, Air Top Pro 25 and
// Airtronic S3 D2L for air. Features are taken from the manufacturers' own pages:
// webasto.com › Thermo Top Evo, Air Top Pro 25 (+ datasheet); eberspaecher.com › Hydronic S3 Economy
// datasheet and press release (2018), Airtronic 3 press release (2021). Photos: the same sources.
const models: Record<'wodne' | 'powietrzne', HeaterModel[]> = {
  wodne: [
    {
      brand: 'webasto',
      name: 'Webasto Thermo Top Evo',
      image: '/images/webasto-thermo-top-evo.webp',
      features: [
        'Moc grzewcza do 5 kW (Thermo Top Evo 4: 2,5–4 kW, Evo 5: 2,8–5 kW)',
        'Nagrzewa silnik przed jazdą, więc unikasz zimnego startu',
        'Przez nawiew auta ogrzewa i osusza wnętrze oraz rozmraża szyby',
        'Mały i lekki (2,1 kg), do aut z niewielką przestrzenią montażową',
        'Zestawy montażowe do wielu popularnych modeli aut',
        'Wersje na benzynę i olej napędowy',
        'Sterowanie pilotem lub aplikacją ThermoConnect',
      ],
    },
    {
      brand: 'eberspaecher',
      name: 'Eberspächer Hydronic S3',
      image: '/images/eberspacher-hydronic-s3.webp',
      features: [
        'Moc grzewcza regulowana płynnie: 1,3–5 kW (olej napędowy), 1,8–5 kW (benzyna)',
        'Ogrzewa płyn chłodzący przy wyłączonym silniku, ciepło rozprowadza nawiew auta',
        'Nagrzany silnik to łagodniejszy rozruch',
        'Kompaktowy, mieści się w niemal każdej komorze silnika',
        'Zestawy montażowe dopasowane do aut osobowych',
        'Sterowanie pilotem lub aplikacją EasyStart Web',
      ],
    },
  ],
  powietrzne: [
    {
      brand: 'webasto',
      name: 'Webasto Air Top Pro 25',
      image: '/images/webasto-air-top-pro-25.webp',
      features: [
        'Moc grzewcza regulowana płynnie: 0,7–2,5 kW',
        'Tryb boost szybko nagrzewa wnętrze i utrzymuje temperaturę',
        'Bardzo cicha praca na niższej mocy, tryb eco do spania',
        'Automatyczna korekta wysokości, praca do 5500 m n.p.m.',
        'Montaż w pojeździe lub na zewnątrz, pod podwoziem',
        'Olej napędowy (także HVO) lub benzyna',
        'Sterowanie elementami Webasto, z panelu pojazdu lub aplikacją ThermoConnect',
      ],
    },
    {
      brand: 'eberspaecher',
      name: 'Eberspächer Airtronic S3 D2L',
      image: '/images/eberspacher-airtronic-s3.webp',
      features: [
        'Moc grzewcza regulowana płynnie: 0,85–2,2 kW',
        'Bezszczotkowy silnik na dłuższą żywotność',
        'Cicha praca pompy dozującej paliwo',
        'Automatyczna korekta wysokości dzięki czujnikowi ciśnienia',
        'Montaż w kabinie, w bagażniku lub pod podłogą',
        'Wersja na olej napędowy',
        'Sterowanie EasyStart Pro lub aplikacją EasyStart Web',
      ],
    },
  ],
};

/**
 * The two heater types. `app` names the phone app(s) for water heaters, e.g.
 * "Webasto ThermoConnect lub Eberspächer EasyStart Web"; `brands` picks whose models are shown
 * (a brand site shows only its own).
 */
export function heaterTypes(app: string, brands: HeaterBrand[] = ['webasto', 'eberspaecher']) {
  const pick = (list: HeaterModel[]) => list.filter((m) => brands.includes(m.brand));
  return [
    {
      kind: 'Ogrzewanie wodne',
      title: 'Komfort w aucie osobowym i ochrona silnika',
      who: 'Klient indywidualny · auta osobowe',
      items: [
        'Nagrzany silnik, ciepłe wnętrze i odmrożone szyby rano',
        'Mniejsze zużycie elementów silnika podczas rozruchu',
        `Sterowanie z aplikacji: ${app}`,
      ],
      models: pick(models.wodne),
    },
    {
      kind: 'Ogrzewanie powietrzne',
      title: 'Ciepła kabina w busie, dostawczaku i kamperze',
      who: 'Firmy, floty, kampery · auta dostawcze, busy, pojazdy specjalne',
      items: [
        'Ciepło w kabinie w trasie i na postoju, także do spania w pojeździe',
        'Montaż pod fotelem lub w zabudowie',
        'Większość napraw robimy tego samego dnia, żeby bus mógł ruszyć w trasę',
      ],
      models: pick(models.powietrzne),
    },
  ];
}
