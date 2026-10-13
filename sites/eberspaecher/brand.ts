// eberspaecher.wroclaw.pl — content for MicrositePage (see sites/shared/brand.ts).
import type { Brand } from '../shared/brand';
import { withImages } from '../shared/brand';
import { eberspacherControls } from '../../src/data/sterowanie';
import logo from '../../public/images/brand/eberspacher.svg';
import winter from '../../public/images/eberspacher-zima.jpg';
import easyScan from './assets/easyscan.jpg';
import og from './assets/og.jpg';
import ess from '../../public/images/ess.jpg';
import est from '../../public/images/est.jpg';
import esp from '../../public/images/esp.jpg';
import esr from '../../public/images/esr.jpg';
import esrPlus from '../../public/images/esr+.jpg';
import esw from '../../public/images/esw.jpg';
import hydronicS3 from '../../public/images/eberspacher-hydronic-s3.webp';
import airtronicS3 from '../../public/images/eberspacher-airtronic-s3.webp';

export const brand: Brand = {
  key: 'eberspaecher',
  name: 'Eberspächer',
  domain: 'eberspaecher.wroclaw.pl',
  seo: {
    title: 'Autoryzowany Serwis Eberspächer Wrocław — Klima-Kar',
    description:
      'Autoryzowany Serwis Eberspächer we Wrocławiu. Montaż ogrzewań postojowych, naprawy gwarancyjne i pogwarancyjne Airtronic i Hydronic, diagnostyka Eberspächer EasyScan.',
    image: og.src,
  },
  logo: logo.src,
  logoClass: 'kk-le',
  hero: { src: winter.src, alt: 'Ciepłe auto bez śniegu obok zaśnieżonego samochodu', position: '50% 60%' },
  about: { src: easyScan.src, alt: 'Diagnostyka ogrzewania testerem Eberspächer EasyScan', position: '45% 50%', tag: 'Eberspächer EasyScan' },
  ticker: ['Airtronic', 'Hydronic', 'EasyScan', 'EasyStart Select', 'EasyStart Timer', 'EasyStart Pro', 'EasyStart Remote+', 'EasyStart Web'],
  services: {
    repairs: 'Naprawy Airtronic i Hydronic',
    diagnostics: 'Diagnostyka Eberspächer EasyScan',
  },
  heaters: { app: 'Eberspächer EasyStart Web' },
  controls: {
    description: 'Wybierz sposób sterowania ogrzewaniem postojowym dopasowany do Twoich potrzeb — od prostego włącznika po sterowanie smartfonem.',
    items: withImages(eberspacherControls, {
      '/images/ess.jpg': ess,
      '/images/est.jpg': est,
      '/images/esp.jpg': esp,
      '/images/esr.jpg': esr,
      '/images/esr+.jpg': esrPlus,
      '/images/esw.jpg': esw,
    }),
  },
  heaterImages: { '/images/eberspacher-hydronic-s3.webp': hydronicS3, '/images/eberspacher-airtronic-s3.webp': airtronicS3 },
};
