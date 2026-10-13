// Klima-Kar's three websites. The main site's footer links to both brand sites; a brand site's footer
// links only to the main site (owner, 2026-10-13).
export const strony = [
  { key: 'main', url: 'https://klima-kar.wroclaw.pl/', label: 'klima-kar.wroclaw.pl' },
  { key: 'webasto', url: 'https://webasto.wroclaw.pl/', label: 'webasto.wroclaw.pl' },
  { key: 'eberspaecher', url: 'https://eberspaecher.wroclaw.pl/', label: 'eberspaecher.wroclaw.pl' },
] as const;

export const mainSite = 'https://klima-kar.wroclaw.pl';
