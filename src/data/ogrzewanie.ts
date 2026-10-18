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
// Airtronic S3 D2L for air, shown as example models ("Przykładowy model"). Owner feedback: models of
// one type are listed with the same rows ("Label: value"), in the same order and the same words, so
// they can be compared; only the values differ. Owner 2026-10-13 (second round): the power is a
// regulation range ("Regulacja mocy grzewczej"), weight dropped, controls as he listed them. Sources: webasto.com › Thermo Top Evo, Air Top Pro 25
// (+ press release 2025); eberspaecher.com › Hydronic S3 Economy datasheet, Airtronic 3 technical
// description 04.2024 and press release 2021; S3 D2L altitude correction up to 3000 m per the owner
// (2026-10-14; the datasheet table says 4000 m). Photos: the same.
const models: Record<'wodne' | 'powietrzne', HeaterModel[]> = {
  wodne: [
    {
      brand: 'webasto',
      name: 'Webasto Thermo Top Evo',
      image: '/images/webasto-thermo-top-evo.webp',
      features: [
        'Regulacja mocy grzewczej: od 2,5 do 5 kW, zależnie od wersji',
        'Paliwo: benzyna lub olej napędowy',
        'Napięcie: 12 V',
        'Działanie: nagrzewa silnik, a przez nawiew auta ogrzewa wnętrze i rozmraża szyby',
        'Budowa: kompaktowa, do ciasnych komór silnika',
        'Montaż: zestawy dopasowane do konkretnych modeli aut',
        'Sterowanie: pilot, programator lub aplikacja ThermoConnect',
      ],
    },
    {
      brand: 'eberspaecher',
      name: 'Eberspächer Hydronic S3',
      image: '/images/eberspacher-hydronic-s3.webp',
      features: [
        'Regulacja mocy grzewczej: od 1,3 do 5 kW, zależnie od wersji',
        'Paliwo: benzyna lub olej napędowy',
        'Napięcie: 12 V',
        'Działanie: nagrzewa silnik, a przez nawiew auta ogrzewa wnętrze i rozmraża szyby',
        'Budowa: kompaktowa, do ciasnych komór silnika',
        'Montaż: zestawy dopasowane do konkretnych modeli aut',
        'Sterowanie: pilot, programator lub aplikacja EasyStart Web',
      ],
    },
  ],
  powietrzne: [
    {
      brand: 'webasto',
      name: 'Webasto Air Top Pro 25',
      image: '/images/webasto-air-top-pro-25.webp',
      features: [
        'Regulacja mocy grzewczej: płynna, od 0,7 do 2,5 kW',
        'Paliwo: olej napędowy lub HVO, wersja na benzynę',
        'Napięcie: 12 V lub 24 V',
        'Silnik: bezszczotkowy',
        'Korekta wysokości: automatyczna, do 5500 m n.p.m.',
        'Montaż: w pojeździe lub na zewnątrz, pod podwoziem',
        'Sterowanie: programator MultiControl lub aplikacja ThermoConnect',
      ],
    },
    {
      brand: 'eberspaecher',
      name: 'Eberspächer Airtronic S3 D2L',
      image: '/images/eberspacher-airtronic-s3.webp',
      features: [
        'Regulacja mocy grzewczej: płynna, od 0,85 do 2,2 kW',
        'Paliwo: olej napędowy lub HVO, wersja na benzynę: Airtronic S3 B2L',
        'Napięcie: 12 V lub 24 V',
        'Silnik: bezszczotkowy',
        'Korekta wysokości: automatyczna, do 3000 m n.p.m.',
        'Montaż: w pojeździe lub na zewnątrz, pod podwoziem',
        'Sterowanie: panel EasyStart Pro, pilot EasyStart Remote+ albo aplikacja EasyStart Web',
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
