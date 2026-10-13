// What a brand site needs. sites/<name>/brand.ts fills it in, MicrositePage renders it.
// Copy comes from the old one-page sites (/mnt/klimakar/<name>/index.php) and the main site's
// /webasto/, /eberspacher/ and /ogrzewanie-postojowe/ pages. Don't invent copy.
import type { ControlSystem } from '../../src/data/sterowanie';

export interface Img {
  src: string;
  alt: string;
  /** CSS object-position for the crop. */
  position?: string;
}

export interface Brand {
  key: 'webasto' | 'eberspaecher';
  /** Display name, e.g. "Eberspächer". */
  name: string;
  domain: string;
  seo: { title: string; description: string };
  /** Colour logo (public/images/brand/<name>.svg) and its LogoStrip height class. */
  logo: string;
  logoClass: 'kk-lw' | 'kk-le';
  hero: Img;
  /** Photo beside "O nas" and the line on its frost tag. */
  about: Img & { tag: string };
  /** Model and controller names for the ticker under the hero. */
  ticker: string[];
  services: {
    repairs: string;
    diagnostics: string;
  };
  heaters: {
    /** Phone app for water heaters, e.g. "Webasto ThermoConnect". */
    app: string;
  };
  controls: {
    description: string;
    items: (ControlSystem & { imageSrc: string })[];
  };
  /** Imported photos of this brand's heater models in src/data/ogrzewanie.ts, keyed by path. */
  heaterImages: Record<string, { src: string }>;
}

/** Resolves the `/images/...` paths in src/data to the images a brand site imported. */
export function withImages<T extends { image: string }>(items: T[], images: Record<string, { src: string }>) {
  return items.map((item) => {
    const image = images[item.image];
    if (!image) throw new Error(`Brand site: import ${item.image} in brand.ts`);
    return { ...item, imageSrc: image.src };
  });
}

/** One-page sections, in page order: header nav, footer list and the scroll spy. */
export const sections = [
  { id: 'o-nas', label: 'O nas' },
  { id: 'serwis', label: 'Serwis' },
  { id: 'sterowanie', label: 'Sterowanie' },
  { id: 'kontakt', label: 'Kontakt' },
  { id: 'dojazd', label: 'Jak dojechać?' },
];
