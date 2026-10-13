import {
  Children,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslation } from "../../i18n/use-translation";
import {
  carouselLoopDistance,
  carouselLoopIndex,
  carouselSlideScale,
  sanitizeCarouselCopy,
} from "../../utils/carousel.utils";
import { HubButton } from "./hub-action";
import styles from "./hub-carousel.module.css";

/** Desktop is a grid; unhydrated mobile is a native, readable snap strip. */
export const HubCarousel = ({
  children,
  label,
  desktopClassName,
}: {
  children: ReactNode;
  label: string;
  desktopClassName: string;
}) => {
  const { t, locale } = useTranslation();
  const slides = Children.toArray(children);
  const count = slides.length;
  const id = useId();
  const viewport = useRef<HTMLDivElement | null>(null);
  const copies = useRef<(HTMLDivElement | null)[]>([]);
  const pointer = useRef<{ x: number; y: number; id: number } | null>(null);
  const dragged = useRef(false);
  const [active, setActive] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [copiesReady, setCopiesReady] = useState(false);
  // Two 82% slides cannot cover both viewport edges during a loop. Two inert visual
  // copies supply the missing geometry; originals are never moved or remounted.
  const two = count === 2 && mobile;
  const enhanced = mobile && count > 1 && (!two || copiesReady);
  const [emblaRef, api] = useEmblaCarousel({
    active: enhanced,
    loop: true,
    align: "center",
    containScroll: false,
    duration: reduced ? 0 : 25,
    watchFocus: false,
    dragThreshold: 10,
    breakpoints: { "(min-width: 768px)": { active: false } },
  });
  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      viewport.current = node;
      emblaRef(node);
    },
    [emblaRef],
  );
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setMobile(media.matches);
      setReduced(motion.matches);
    };
    update();
    media.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);
  useEffect(() => {
    if (!two) {
      setCopiesReady(false);
      return;
    }
    const originals = viewport.current?.querySelectorAll<HTMLElement>(
      "[data-carousel-slide]:not([data-copy]) [data-scale]",
    );
    originals?.forEach((slide, index) => {
      const host = copies.current[index];
      if (!host) return;
      const copy = slide.firstElementChild?.cloneNode(true) as
        | HTMLElement
        | undefined;
      if (!copy) return;
      sanitizeCarouselCopy(copy);
      host.replaceChildren(copy);
    });
    setCopiesReady(true);
  }, [two, locale]);
  useEffect(() => {
    if (!api || !enhanced) return;
    // Clear any native fallback scroll before Embla takes ownership of transforms.
    if (viewport.current) viewport.current.scrollLeft = 0;
    const update = () =>
      setActive(carouselLoopIndex(api.selectedScrollSnap(), count));
    const settle = () => {
      if (two && api.selectedScrollSnap() >= count)
        api.scrollTo(api.selectedScrollSnap() % count, true);
      update();
    };
    update();
    api.on("select", update).on("reInit", update).on("settle", settle);
    return () => {
      api.off("select", update).off("reInit", update).off("settle", settle);
    };
  }, [api, count, enhanced, two]);
  useEffect(() => {
    if (!api || !enhanced) return;
    const apply = () => {
      const snaps = api.scrollSnapList();
      const span =
        snaps.length > 1
          ? Math.abs(snaps[1] - snaps[0]) || 1 / snaps.length
          : 1;
      const progress = api.scrollProgress();
      api.slideNodes().forEach((node, index) => {
        const target = node.querySelector<HTMLElement>("[data-scale]");
        if (!target) return;
        if (reduced) {
          target.style.transform = "";
          return;
        }
        const scale = carouselSlideScale(
          carouselLoopDistance(snaps[index] ?? 0, progress),
          span,
        );
        target.style.transform = scale > 0.995 ? "" : `scale(${scale})`;
      });
    };
    apply();
    api.on("scroll", apply).on("reInit", apply).on("select", apply);
    return () => {
      api.off("scroll", apply).off("reInit", apply).off("select", apply);
      api.slideNodes().forEach((node) => {
        const target = node.querySelector<HTMLElement>("[data-scale]");
        if (target) target.style.transform = "";
      });
    };
  }, [api, enhanced, reduced]);
  const move = (direction: number) => {
    if (!api || !enhanced) return;
    if (direction < 0) api.scrollPrev(reduced);
    else api.scrollNext(reduced);
  };
  const keys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!enhanced || event.target !== event.currentTarget) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home" || event.key === "End")
      api?.scrollTo(event.key === "Home" ? 0 : count - 1, reduced);
    else move(event.key === "ArrowLeft" ? -1 : 1);
  };
  return (
    <div
      className={styles.carousel}
      role="region"
      aria-label={label}
      aria-roledescription={t.ui.carousel}
      data-reveal
      data-single={count <= 1}
    >
      <div
        ref={ref}
        id={id}
        className={styles.viewport}
        data-enhanced={enhanced}
        tabIndex={enhanced ? 0 : -1}
        role="group"
        aria-label={t.ui.carouselKeyboard}
        onKeyDown={keys}
        onFocusCapture={(event) => {
          if (
            !enhanced ||
            !(event.target instanceof HTMLElement) ||
            !event.target.matches(":focus-visible")
          )
            return;
          const slide = event.target.closest<HTMLElement>(
            "[data-carousel-slide]",
          );
          if (slide && !slide.hasAttribute("data-copy"))
            api?.scrollTo(Number(slide.dataset.carouselSlide), true);
        }}
        onPointerDownCapture={(event) => {
          dragged.current = false;
          pointer.current = mobile
            ? { x: event.clientX, y: event.clientY, id: event.pointerId }
            : null;
        }}
        onPointerMoveCapture={(event) => {
          const start = pointer.current;
          if (
            start?.id === event.pointerId &&
            Math.hypot(event.clientX - start.x, event.clientY - start.y) > 10
          )
            dragged.current = true;
        }}
        onPointerCancel={() => {
          pointer.current = null;
          dragged.current = true;
        }}
        onPointerUp={() => {
          pointer.current = null;
        }}
        onClickCapture={(event) => {
          if (!dragged.current) return;
          event.preventDefault();
          event.stopPropagation();
          dragged.current = false;
        }}
      >
        <div className={`${styles.track} ${desktopClassName}`}>
          {slides.map((slide, index) => (
            <div
              key={(slide as { key?: string }).key || index}
              className={styles.slide}
              data-carousel-slide={index}
              role="group"
              aria-roledescription={t.ui.slide}
              aria-label={`${index + 1} ${t.ui.of} ${count}`}
            >
              <div className={styles.scale} data-scale="">
                {slide}
              </div>
            </div>
          ))}
          {two &&
            slides.map((_, index) => (
              <div
                key={`copy-${index}`}
                className={styles.slide}
                data-carousel-slide={index}
                data-copy
                aria-hidden="true"
                ref={(node) => node?.setAttribute("inert", "")}
              >
                <div
                  className={styles.scale}
                  data-scale=""
                  ref={(node) => {
                    copies.current[index] = node;
                  }}
                />
              </div>
            ))}
        </div>
      </div>
      {count > 1 && (
        <div className={styles.explore}>
          <p className={styles.hint}>{t.ui.swipeExplore}</p>
          {enhanced && (
            <div className={styles.controls}>
              <HubButton
                compact
                arrow={false}
                variant="outline"
                aria-label={t.ui.previousSlide}
                aria-controls={id}
                onClick={() => move(-1)}
              >
                ←
              </HubButton>
              <HubButton
                compact
                arrow={false}
                variant="outline"
                aria-label={t.ui.nextSlide}
                aria-controls={id}
                onClick={() => move(1)}
              >
                →
              </HubButton>
            </div>
          )}
          <span
            className={styles.srOnly}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >{`${label}: ${t.ui.slide} ${active + 1} ${t.ui.of} ${count}`}</span>
        </div>
      )}
    </div>
  );
};
