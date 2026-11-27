import { siteStatus, type DayOff } from './site-status';

const OPEN = 9 * 60;
const CLOSE = 17 * 60;
const WEEKDAYS = ['w niedzielę', 'w poniedziałek', 'we wtorek', 'w środę', 'w czwartek', 'w piątek', 'w sobotę'];
const MONTHS = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
let daysOff: DayOff[] = [];

// WHY: a Wrocław wall-clock time stored as a UTC date; read only the getUTC* fields.
function wroclawNow(): Date {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Warsaw', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
  }).formatToParts(new Date());
  const n = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return new Date(Date.UTC(n('year'), n('month') - 1, n('day'), n('hour'), n('minute')));
}

function easter(y: number): Date {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(y, month - 1, day));
}

function isHoliday(d: Date): boolean {
  const md = `${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
  if (['1-1', '1-6', '5-1', '5-3', '8-15', '11-1', '11-11', '12-24', '12-25', '12-26'].includes(md)) return true;
  const e = easter(d.getUTCFullYear()).getTime();
  const day = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return day === e + 1 * 864e5 || day === e + 60 * 864e5;
}

function isDayOff(d: Date): boolean {
  const day = d.toISOString().slice(0, 10);
  return daysOff.some((r) => day >= r.od && day <= (r.do || r.od));
}

const isWorkday = (d: Date) => d.getUTCDay() >= 1 && d.getUTCDay() <= 5 && !isHoliday(d) && !isDayOff(d);

function nextOpening(now: Date): string | null {
  const minutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  if (isWorkday(now)) {
    if (minutes >= OPEN && minutes < CLOSE) return null;
    if (minutes < OPEN) return 'dziś';
  }
  for (let k = 1; k < 120; k++) {
    const d = new Date(now.getTime() + k * 864e5);
    if (!isWorkday(d)) continue;
    if (k === 1) return 'jutro';
    // WHY: a weekday name only within the coming week; after a longer break the date is clearer.
    return k < 7 ? WEEKDAYS[d.getUTCDay()] : `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
  }
  return 'wkrótce';
}

function update() {
  const next = nextOpening(wroclawNow());
  document.querySelectorAll<HTMLElement>('[data-open]').forEach((el) => {
    el.classList.toggle('is-closed', next !== null);
    el.querySelector<HTMLElement>('[data-open-yes]')?.toggleAttribute('hidden', next !== null);
    el.querySelector<HTMLElement>('[data-open-no]')?.toggleAttribute('hidden', next === null);
    const when = el.querySelector<HTMLElement>('[data-open-next]');
    if (when && next) when.textContent = next;
    el.hidden = false;
  });
  document.getElementById('kk-callbar')?.classList.toggle('is-closed', next !== null);
}

siteStatus().then((status) => {
  daysOff = status?.dniWolne ?? [];
  update();
  setInterval(update, 60_000);
});
