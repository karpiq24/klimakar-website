// WHY: status.json lives only on the production server, written by /panel/, never part of a build; the brand
// sites read it cross-origin (.htaccess allows it); the demo build reads /status-demo.json instead. Without it: no notice, public holidays only.

export interface DayOff {
  od: string;
  do?: string;
}
export interface SiteStatus {
  komunikat: string;
  dniWolne: DayOff[];
}

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
