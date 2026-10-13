/** Snap to a real slide start; the last start may be clipped by the viewport edge. */
export const carouselTarget = (
  index: number,
  offsets: number[],
  maxScroll: number,
) =>
  Math.max(
    0,
    Math.min(
      offsets[Math.max(0, Math.min(index, offsets.length - 1))] || 0,
      maxScroll,
    ),
  );

export const carouselIndex = (
  scrollLeft: number,
  offsets: number[],
  maxScroll: number,
) => {
  if (!offsets.length || maxScroll <= 0 || scrollLeft <= 1) return 0;
  if (scrollLeft >= maxScroll - 1) return offsets.length - 1;
  return offsets.reduce(
    (nearest, _, index) =>
      Math.abs(carouselTarget(index, offsets, maxScroll) - scrollLeft) <
      Math.abs(carouselTarget(nearest, offsets, maxScroll) - scrollLeft)
        ? index
        : nearest,
    0,
  );
};

/** Logical positions wrap in either direction, also for one/two-item groups. */
export const carouselLoopIndex = (index: number, count: number) =>
  count > 0 ? ((index % count) + count) % count : 0;

/** Shortest signed distance on a 0–1 circular scroll progress. */
export const carouselLoopDistance = (snap: number, progress: number) => {
  const diff = snap - progress;
  if (!Number.isFinite(diff)) return 0;
  return diff - Math.round(diff);
};

/** Neighbor emphasis settles at 0.96; the centered slide stays at 1. */
export const carouselSlideScale = (distance: number, snapSpan: number) => {
  if (!Number.isFinite(distance) || snapSpan <= 0) return 1;
  const emphasis = Math.min(Math.abs(distance) / snapSpan, 1);
  return 1 - emphasis * 0.04;
};

/** Only the two-item fallback needs visual copies. No duplicate identity or actions. */
export const sanitizeCarouselCopy = (root: HTMLElement) => {
  root.setAttribute("aria-hidden", "true");
  root.setAttribute("inert", "");
  const nodes = [root, ...Array.from(root.querySelectorAll<HTMLElement>("*"))];
  for (const node of nodes) {
    for (const name of [
      "id",
      "name",
      "for",
      "aria-labelledby",
      "aria-describedby",
      "aria-controls",
      "data-reveal",
      "data-stagger",
    ])
      node.removeAttribute(name);
    if (
      node.matches(
        "a,button,input,select,textarea,[tabindex],[contenteditable]",
      )
    ) {
      node.setAttribute("tabindex", "-1");
      node.removeAttribute("href");
      node.removeAttribute("contenteditable");
      if (node.matches("button,input,select,textarea"))
        node.setAttribute("disabled", "");
    }
  }
};
