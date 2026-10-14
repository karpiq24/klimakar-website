// Parking-heater controllers ("Systemy sterowania") for the Webasto and Eberspächer pages.
// Shared by the main site (/webasto/, /eberspacher/) and the brand sites in sites/, so a change
// here updates every page that lists them. Images are paths under public/.
// A feature may contain `{dzisiaj}`, rendered as today's date (see ProductCard).
// Retired products (no longer sold, still serviced) go last and render greyed out.

export interface ControlSystem {
  name: string;
  type: string;
  image: string;
  features: string[];
  retired?: boolean;
}

export const webastoControls: ControlSystem[] = [
  {
    name: 'MultiControl',
    type: 'Programator z wyświetlaczem',
    image: '/images/MC.jpg',
    features: [
      'Menu w języku polskim',
      'Przejrzysty wyświetlacz i wygodny przycisk',
      '3 czasy włączania na dzień, programowanie na 7 dni',
      'Montaż możliwy bez wiercenia',
    ],
  },
  {
    name: 'Telestart T99',
    type: 'Pilot radiowy z potwierdzeniem',
    image: '/images/t99.webp',
    features: [
      'Zasięg do 1000 metrów',
      'Funkcja informacji zwrotnej',
      'Wybór grzania lub wentylacji (zima/lato)',
      'Czas działania od 10 do 120 minut',
      'Eleganckie wzornictwo, wytrzymała obudowa',
    ],
  },
  {
    name: 'Telestart T100',
    type: 'Pilot z wyświetlaczem',
    image: '/images/t100.jpg',
    features: [
      'Zasięg do 1000 metrów z informacją zwrotną',
      'Programowanie czasu odjazdu: pilot sam obliczy czas ogrzewania na podstawie temperatury i poziomu komfortu C1–C5',
      'Odczyt temperatury wnętrza pojazdu',
      'Prosta obsługa przyciskami On / Off i lewo / prawo',
      'Wybór grzania lub wentylacji (zima/lato)',
    ],
  },
  {
    name: 'ThermoConnect',
    type: 'Sterowanie przez internet',
    image: '/images/ThermoConnect.jpg',
    features: [
      'Aplikacja mobilna i webowa',
      'Timer jednorazowy i powtarzalny',
      'Uruchamianie oparte na pozycji GPS',
      'Lokalizacja pojazdu i geo-fencing',
      'Obsługa wielu urządzeń z jednej aplikacji',
      'Nie wymaga karty SIM',
      'W zestawie przycisk z diodą do szybkiego włączania i wyłączania ogrzewania',
      'Pierwszy rok bezpłatny, każdy kolejny — abonament 35 € rocznie',
    ],
  },
  {
    name: 'Telestart T91',
    type: 'Pilot radiowy',
    retired: true,
    image: '/images/t91.jpg',
    features: [
      'Zasięg do 1000 metrów',
      'Prosta obsługa przyciskami On / Off',
      'Wybór grzania lub wentylacji (zima/lato)',
      'Czas działania od 10 do 120 minut',
      'Eleganckie wzornictwo, wytrzymała obudowa',
    ],
  },
  {
    name: 'ThermoCall',
    type: 'Sterowanie GSM',
    retired: true,
    image: '/images/TC.png',
    features: [
      'Sterowanie z dowolnego miejsca w zasięgu GSM',
      'Bezpłatna aplikacja mobilna',
      'Programowanie z 24h wyprzedzeniem',
      'Informacja o statusie, temperaturze, napięciu',
      'Wymaga aktywnej karty SIM',
    ],
  },
];

export const eberspacherControls: ControlSystem[] = [
  {
    name: 'EasyStart Select',
    type: 'Włącznik z wyświetlaczem',
    image: '/images/ess.jpg',
    features: [
      'Prosta funkcja włączania i wyłączania jednym przyciskiem',
      'Odczyt błędów urządzenia',
      'Przejrzysty wyświetlacz i wygodne przyciski',
      'Odczyt nastawionej i aktualnej temperatury',
      'Zalecany do ogrzewań powietrznych',
    ],
  },
  {
    name: 'EasyStart Timer',
    type: 'Programator tygodniowy',
    image: '/images/est.jpg',
    features: [
      'Programowanie w cyklu tygodniowym',
      'Możliwość ustawienia trzech programów',
      'Przejrzysty wyświetlacz i wygodne przyciski',
      'Odczyt błędów urządzenia',
      'Wybór czasu pracy ogrzewania',
    ],
  },
  {
    name: 'EasyStart Pro',
    type: 'Element sterujący z wyświetlaczem',
    image: '/images/esp.jpg',
    features: [
      'Obsługa jednym przyciskiem — obrót i naciśnięcie',
      'Wyświetlacz: stan pracy, temperatura we wnętrzu, programator',
      'Kolorowy pierścień LED wskazuje tryb pracy',
      'Do trzech programów czasowych w tygodniu',
      'Czas pracy od 10 do 120 minut lub ogrzewanie ciągłe',
    ],
  },
  {
    name: 'EasyStart Remote',
    type: 'Pilot radiowy',
    image: '/images/esr.jpg',
    features: [
      'Zasięg do 1000 metrów',
      'Funkcja informacji zwrotnej',
      'Prosta obsługa przyciskami Wł. / Wył.',
      'Wybór grzania lub wentylacji (zima/lato)',
      'Czas działania od 10 do 60 minut',
    ],
  },
  {
    name: 'EasyStart Remote+',
    type: 'Pilot z wyświetlaczem i programowaniem',
    image: '/images/esr+.jpg',
    features: [
      'Zasięg do 1000 metrów z informacją zwrotną',
      'Programowanie czasu odjazdu (automatyczne)',
      'Trzy programy w cyklu tygodniowym',
      'Odczyt temperatury wnętrza pojazdu',
      'Odczyt błędów urządzenia',
      'Wybór grzania lub wentylacji (zima/lato)',
    ],
  },
  {
    name: 'EasyStart Web',
    type: 'Sterowanie przez internet',
    image: '/images/esw.jpg',
    features: [
      'Sterowanie z dowolnego miejsca przez internet',
      'Aplikacja dostępna w Google Play i App Store',
      'Sterowanie przez przeglądarkę internetową',
      'Automatyczne programowanie czasu odjazdu',
      'Informacja o statusie i temperaturze wnętrza',
      'Nie wymaga karty SIM',
      'W zestawie przycisk z diodą do szybkiego włączania i wyłączania ogrzewania',
      'Wymaga abonamentu — 129 zł rocznie (cena na dzień {dzisiaj})',
    ],
  },
];
