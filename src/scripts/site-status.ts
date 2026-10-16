// The owner's notice and extra days off (owner, 2026-10-17). They live only on the production server in
// https://klima-kar.wroclaw.pl/status.json, written by the panel (/panel/, public/panel/api.php), and
// are read here by all three sites (the brand sites and the demo cross-origin; .htaccess allows it).
// The file is never part of a build. When it can't be loaded the sites go on without it: no notice,
// public holidays only.

export interface DayOff {
  od: string;
  do?: string;
}
export interface SiteStatus {
  komunikat: string;
  dniWolne: DayOff[];
}

// The demo (PUBLIC_NOINDEX build, `npm run build:demo`) shows the example in demo/status-demo.json instead.
const URL_STATUS = import.meta.env.PUBLIC_NOINDEX === 'true' ? '/status-demo.json' : 'https://klima-kar.wroclaw.pl/status.json';
let pending: Promise<SiteStatus | null> | undefined;

export function siteStatus(): Promise<SiteStatus | null> {
  pending ??= (async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    try {
      const response = await fetch(URL_STATUS, { cache: 'no-cache', signal: controller.signal });
      if (!response.ok) return null;
      const data = await response.json();
      return {
        komunikat: typeof data.komunikat === 'string' ? data.komunikat.trim() : '',
        dniWolne: Array.isArray(data.dniWolne) ? data.dniWolne.filter((d: DayOff) => typeof d?.od === 'string') : [],
      };
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  })();
  return pending;
}
