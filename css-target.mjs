// WHY: Astro builds client code for "esnext", so Lightning CSS would drop -webkit-backdrop-filter and
// Safari before 18 (iOS 17 and older) would lose the frosted-glass blur.
export const cssTarget = ['chrome111', 'edge111', 'firefox114', 'safari16.4', 'ios16.4'];
