// webasto.wroclaw.pl — content for MicrositePage (see sites/shared/brand.ts).
import type { Brand } from '../shared/brand';
import { withImages } from '../shared/brand';
import { webastoControls } from '../../src/data/sterowanie';
import logo from '../../public/images/brand/webasto.svg';
import winter from '../../public/images/webastoauto.jpg';
import flags from './assets/flagi.jpg';
import mc from '../../public/images/MC.jpg';
import t99 from '../../public/images/t99.webp';
import t100 from '../../public/images/t100.jpg';
import thermoConnect from '../../public/images/ThermoConnect.jpg';
import t91 from '../../public/images/t91.jpg';
import thermoCall from '../../public/images/TC.png';
import thermoTopEvo from '../../public/images/webasto-thermo-top-evo.webp';
import airTopPro25 from '../../public/images/webasto-air-top-pro-25.webp';

export const brand: Brand = {
  key: 'webasto',
  name: 'Webasto',
  domain: 'webasto.wroclaw.pl',
  seo: {
    title: 'Autoryzowany Serwis Webasto Wrocław — Klima-Kar',
    description:
      'Autoryzowany Serwis Webasto we Wrocławiu. Montaż ogrzewań postojowych, naprawy gwarancyjne i pogwarancyjne Webasto AirTop i ThermoTop, diagnostyka Webasto ThermoTest.',
  },
  logo: logo.src,
  logoClass: 'kk-lw',
  hero: { src: flags.src, alt: 'Flagi Webasto na tle nieba', position: '30% 50%' },
  about: { src: winter.src, alt: 'Samochód z ogrzewaniem postojowym na zaśnieżonym parkingu', tag: 'Zimą grzejemy.' },
  ticker: ['AirTop', 'ThermoTop', 'ThermoTest', 'MultiControl', 'Telestart T99', 'Telestart T100', 'ThermoConnect'],
  services: {
    repairs: 'Naprawy Webasto AirTop i ThermoTop',
    diagnostics: 'Diagnostyka Webasto ThermoTest',
  },
  heaters: { app: 'Webasto ThermoConnect' },
  controls: {
    description: 'Wybierz sposób sterowania ogrzewaniem postojowym dopasowany do Twoich potrzeb — od prostego programatora po sterowanie smartfonem.',
    items: withImages(webastoControls, {
      '/images/MC.jpg': mc,
      '/images/t99.webp': t99,
      '/images/t100.jpg': t100,
      '/images/ThermoConnect.jpg': thermoConnect,
      '/images/t91.jpg': t91,
      '/images/TC.png': thermoCall,
    }),
  },
  heaterImages: { '/images/webasto-thermo-top-evo.webp': thermoTopEvo, '/images/webasto-air-top-pro-25.webp': airTopPro25 },
};
