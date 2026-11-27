// WHY: copy comes from the old one-page sites and the main site's /webasto/, /eberspacher/ and
// /ogrzewanie-postojowe/ pages; never invent copy.
import type { ControlSystem } from '../../src/data/sterowanie';

export interface Img {
  src: string;
  alt: string;
  position?: string;
}

export interface Brand {
  key: 'webasto' | 'eberspaecher';
  name: string;
  domain: string;
  seo: { title: string; description: string; image: string };
  logo: string;
  logoClass: 'kk-lw' | 'kk-le';
  hero: Img;
  about: Img & { tag: string };
  ticker: string[];
  services: {
    repairs: string;
    diagnostics: string;
  };
  heaters: {
    app: string;
  };
  controls: {
    description: string;
    items: (ControlSystem & { imageSrc: string })[];
  };
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

/**
 * One-page sections, in page order: header nav, footer list and the scroll spy.
 * `footerOnly`: listed in the footer, not the header (the directions are a small note under Kontakt).
 */
export const sections: { id: string; label: string; footerOnly?: boolean }[] = [
  { id: 'o-nas', label: 'O nas' },
  { id: 'serwis', label: 'Serwis' },
  { id: 'sterowanie', label: 'Sterowanie' },
  { id: 'kontakt', label: 'Kontakt' },
  { id: 'dojazd', label: 'Jak dojechać?', footerOnly: true },
];
