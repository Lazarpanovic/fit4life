// Hysteresis prevents toggling when scroll position oscillates around 64px.
export const nextHeaderCompact = (scrollY: number, compact: boolean) =>
  scrollY >= 64 ? true : scrollY <= 32 ? false : compact;

/** Manual expansion survives small scroll adjustments and keyboard interaction. */
export const releaseHeaderExpansion = (
  scrollY: number,
  expandedAt: number,
  focused: boolean,
) => !focused && (scrollY <= 32 || Math.abs(scrollY - expandedAt) >= 48);
