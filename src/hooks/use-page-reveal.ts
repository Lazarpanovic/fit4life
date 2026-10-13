import { useEffect } from "react";

/** Content is visible by default. Animate only once, after the observer fires. */
export const usePageReveal = (route: string, locale?: string) => {
  useEffect(() => {
    if (!window.IntersectionObserver || !Element.prototype.animate) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tokens = getComputedStyle(document.documentElement);
    const duration =
      parseFloat(tokens.getPropertyValue("--hub-reveal-duration")) || 520;
    const stagger = parseFloat(tokens.getPropertyValue("--hub-stagger")) || 70;
    const distance =
      parseFloat(tokens.getPropertyValue("--hub-reveal-distance")) || 20;
    const mobileDistance =
      parseFloat(tokens.getPropertyValue("--hub-reveal-distance-mobile")) || 12;
    const easing = tokens.getPropertyValue("--hub-ease").trim() || "ease-out";
    const animations = new Map<Element, Animation>();
    const cancel = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const focus = (event: FocusEvent) => {
      animations.forEach((animation, element) => {
        if (event.target instanceof Node && element.contains(event.target)) {
          animation.cancel();
          animations.delete(element);
        }
      });
    };
    const preference = () => {
      if (motion.matches) cancel();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (motion.matches) continue;
          const elements = entry.target.hasAttribute("data-stagger")
            ? Array.from(entry.target.children)
            : [entry.target];
          const mobile = window.innerWidth < 768;
          // Hydration may happen after SSR content has already been painted.
          // Never fade already-visible content back to zero (especially the hero).
          const initialOpacity =
            entry.boundingClientRect.top < window.innerHeight ? 0.8 : 0;
          elements.forEach((element, index) => {
            if (element.matches(":focus-within")) return;
            const animation = element.animate(
              [
                {
                  opacity: initialOpacity,
                  transform: `translateY(${mobile ? mobileDistance : distance}px)`,
                },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                duration,
                delay: Math.min(index * stagger, stagger * (mobile ? 2 : 4)),
                easing,
                fill: "backwards",
              },
            );
            animations.set(element, animation);
            animation.onfinish = () => animations.delete(element);
          });
        }
      },
      { rootMargin: "0px 0px 100px 0px", threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal], [data-stagger]")
      .forEach((element) => observer.observe(element));
    document.addEventListener("focusin", focus);
    motion.addEventListener("change", preference);
    return () => {
      observer.disconnect();
      cancel();
      document.removeEventListener("focusin", focus);
      motion.removeEventListener("change", preference);
    };
  }, [route, locale]);
};
