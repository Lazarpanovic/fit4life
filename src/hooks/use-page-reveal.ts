import { useLayoutEffect } from "react";

/** Below-fold blocks rise in once. Anything already on screen stays still. */
export const usePageReveal = (route: string, locale?: string) => {
  useLayoutEffect(() => {
    if (!window.IntersectionObserver) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const arm = (element: HTMLElement) => {
      element.setAttribute("data-reveal-arm", "");
      element.setAttribute("data-reveal-hold", "");
    };
    targets.forEach((target) => {
      if (target.getBoundingClientRect().top <= window.innerHeight * 0.92) return;
      if (target.hasAttribute("data-stagger")) {
        Array.from(target.children).forEach((child) => {
          if (child instanceof HTMLElement) arm(child);
        });
      } else {
        arm(target);
      }
    });

    const release = (element: HTMLElement) => {
      element.removeAttribute("data-reveal-hold");
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const target = entry.target;
          if (!(target instanceof HTMLElement)) return;
          if (target.hasAttribute("data-stagger")) {
            Array.from(target.children).forEach((child) => {
              if (child instanceof HTMLElement) release(child);
            });
          } else {
            release(target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    targets.forEach((target) => observer.observe(target));

    const stop = () => {
      if (!motion.matches) return;
      observer.disconnect();
      document
        .querySelectorAll<HTMLElement>("[data-reveal-hold]")
        .forEach((element) => element.removeAttribute("data-reveal-hold"));
    };
    motion.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", stop);
    };
  }, [route, locale]);
};
