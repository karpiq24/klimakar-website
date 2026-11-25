// Browsers the CSS is built for. Astro builds client code for "esnext", so Vite's Lightning CSS
// minifier would drop -webkit-backdrop-filter, and Safari before 18 (iOS 17 and older) would lose
// the frosted-glass blur. Vite's "baseline widely available" set, with Safari/iOS 16.4.
export const cssTarget = ['chrome111', 'edge111', 'firefox114', 'safari16.4', 'ios16.4'];
