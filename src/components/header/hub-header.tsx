import { useCallback, useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "../../i18n/use-translation";
import {
  nextHeaderCompact,
  releaseHeaderExpansion,
} from "../../utils/header-state";
import {
  BrandWordmark,
  BrandWordmarkContent,
  brandWordmarkClass,
  HubLink,
} from "../hub/hub-ui";
import styles from "./hub-header.module.css";

export const hubNavItems = [
  { href: "/", key: "home" },
  { href: "/programs", key: "programs" },
  { href: "/trainers", key: "trainers" },
  { href: "/resources", key: "resources" },
  { href: "/contact", key: "contact" },
] as const;

const navIconPaths = {
  home: (
    <>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10.5V20h4.5v-6h3V20H18V10.5" />
    </>
  ),
  programs: (
    <>
      <rect x="4.5" y="4.5" width="6.5" height="6.5" rx="1.4" />
      <rect x="13" y="4.5" width="6.5" height="6.5" rx="1.4" />
      <rect x="4.5" y="13" width="6.5" height="6.5" rx="1.4" />
      <rect x="13" y="13" width="6.5" height="6.5" rx="1.4" />
    </>
  ),
  trainers: (
    <>
      <circle cx="9" cy="8" r="2.6" />
      <path d="M4.2 19c.4-3.2 2.4-4.8 4.8-4.8s4.4 1.6 4.8 4.8" />
      <circle cx="16.6" cy="9" r="2.2" />
      <path d="M14.4 19c.3-2.4 1.6-3.7 3.4-3.7 1.9 0 3.1 1.3 3.4 3.7" />
    </>
  ),
  resources: (
    <>
      <path d="M6 5.5A2.5 2.5 0 0 1 8.5 3H19v16.5H8.5A2.5 2.5 0 0 0 6 22V5.5z" />
      <path d="M6 19.2A2.5 2.5 0 0 1 8.5 16.8H19" />
    </>
  ),
  contact: (
    <>
      <rect x="3.5" y="6" width="17" height="12.5" rx="2.2" />
      <path d="M4 8.2l8 5.4 8-5.4" />
    </>
  ),
} as const;

const NavIcon = ({ name }: { name: (typeof hubNavItems)[number]["key"] }) => (
  <span className={styles.navIcon} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none">
      {navIconPaths[name]}
    </svg>
  </span>
);

const BurgerLines = () => (
  <span aria-hidden="true">
    <i />
    <i />
  </span>
);

export const HubHeader = () => {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const reducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [manualExpanded, setManualExpanded] = useState(false);
  const [compact, setCompact] = useState(false);
  const compactRef = useRef(false);
  const expandedAt = useRef<number | null>(null);
  const openedByKeyboard = useRef(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const modalToggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const focusFrame = useRef(0);
  const closeMenu = useCallback(() => setOpen(false), []);
  const expand = () => {
    expandedAt.current = window.scrollY;
    setManualExpanded(true);
  };
  const finishClose = () => {
    setMenuVisible(false);
    // Keep the returning trigger present. A later substantial scroll may contract it.
    expand();
    if (openedByKeyboard.current) setKeyboardFocus(true);
  };
  useEffect(() => {
    closeMenu();
  }, [router.asPath, locale, closeMenu]);
  useEffect(() => {
    if (!menuVisible) return;
    const nodes = document.querySelectorAll("main, footer");
    nodes.forEach((node) => {
      node.setAttribute("inert", "");
      node.setAttribute("aria-hidden", "true");
    });
    return () => {
      nodes.forEach((node) => {
        node.removeAttribute("inert");
        node.removeAttribute("aria-hidden");
      });
    };
  }, [menuVisible]);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 1099px)");
    const update = () => {
      setMobile(query.matches);
      if (!query.matches) closeMenu();
    };
    update();
    query.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      cancelAnimationFrame(focusFrame.current);
    };
  }, [closeMenu]);
  useEffect(() => {
    if (menuVisible) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const active = document.activeElement;
      const focused =
        !!header.current?.contains(active) &&
        (keyboardFocus ||
          (active instanceof HTMLElement && active.matches(":focus-visible")));
      if (
        expandedAt.current !== null &&
        releaseHeaderExpansion(y, expandedAt.current, focused)
      ) {
        expandedAt.current = null;
        setManualExpanded(false);
      }
      const next = nextHeaderCompact(y, compactRef.current);
      if (next !== compactRef.current) {
        compactRef.current = next;
        setCompact(next);
      }
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, [menuVisible, router.pathname, keyboardFocus]);

  const mobileCompact =
    mobile && compact && !menuVisible && !manualExpanded && !keyboardFocus;
  const nav = (inMenu = false) =>
    hubNavItems.map((item, index) => {
      const active =
        item.href === "/"
          ? router.pathname === "/"
          : router.pathname.startsWith(item.href);
      const secondary = item.key === "home" || item.key === "contact";
      return (
        <Link
          key={item.href}
          href={item.href}
          aria-current={active ? "page" : undefined}
          onClick={closeMenu}
          style={inMenu ? { animationDelay: `${index * 45}ms` } : undefined}
          className={
            inMenu
              ? styles.mobileLink
              : `${styles.navLink} ${secondary ? styles.secondary : ""}`
          }
        >
          {inMenu ? <NavIcon name={item.key} /> : null}
          {t.nav[item.key]}
        </Link>
      );
    });
  const languages = (inMenu = false) => (
    <div
      className={inMenu ? styles.mobileLanguages : styles.languages}
      aria-label={t.ui.language}
    >
      {(["sr", "en"] as const).map((lang) => (
        <Link
          key={lang}
          href={router.asPath}
          locale={lang}
          scroll={false}
          aria-current={locale === lang ? "true" : undefined}
          aria-label={lang === "sr" ? "Srpski" : "English"}
          onClick={() => {
            document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
            closeMenu();
          }}
        >
          {lang.toUpperCase()}
        </Link>
      ))}
    </div>
  );
  const toggleLabel = open ? t.ui.closeMenu : t.ui.openMenu;
  return (
    <>
      <header
        data-tone="dark"
        ref={header}
        className={`hub-ui ${styles.header}`}
        data-compact={mobile ? mobileCompact : compact && !menuVisible}
        data-open={menuVisible}
        onPointerDownCapture={() => setKeyboardFocus(false)}
        onKeyDownCapture={() => {
          if (!mobileCompact) setKeyboardFocus(true);
        }}
        onFocusCapture={(event) => {
          if (
            !mobileCompact &&
            event.target instanceof HTMLElement &&
            event.target.matches(":focus-visible")
          )
            setKeyboardFocus(true);
        }}
        onBlurCapture={(event) => {
          if (
            !(event.relatedTarget instanceof Node) ||
            !event.currentTarget.contains(event.relatedTarget)
          )
            setKeyboardFocus(false);
        }}
      >
        <a href="#page-content" className={styles.skip}>
          {t.ui.skipContent}
        </a>
        <div className={styles.inner}>
          {mobileCompact ? (
            <button
              type="button"
              className={`${brandWordmarkClass} ${styles.brand} ${styles.expandBrand}`}
              aria-label={t.ui.expandNavigation}
              aria-expanded="false"
              onClick={(event) => {
                const keyboard = event.detail === 0;
                expand();
                setKeyboardFocus(keyboard);
                if (!keyboard) return;
                focusFrame.current = requestAnimationFrame(() =>
                  toggle.current?.focus({ preventScroll: true }),
                );
              }}
            >
              <BrandWordmarkContent />
            </button>
          ) : (
            <BrandWordmark className={styles.brand} />
          )}
          <nav className={styles.nav} aria-label={t.ui.mainNavigation}>
            {nav()}
          </nav>
          <div className={styles.actions}>
            {languages()}
            <HubLink href="/contact" variant="accent" className={styles.cta}>
              {t.nav.cta}
            </HubLink>
            <button
              ref={toggle}
              className={styles.toggle}
              type="button"
              hidden={mobileCompact}
              onClick={(event) => {
                if (open) {
                  closeMenu();
                  return;
                }
                openedByKeyboard.current = event.detail === 0;
                expand();
                setMenuVisible(true);
                setOpen(true);
              }}
              aria-expanded={open}
              aria-controls="hub-mobile-menu"
              aria-label={toggleLabel}
            >
              <BurgerLines />
            </button>
          </div>
        </div>
      </header>
      <Modal
        isOpen={open}
        onClose={closeMenu}
        onCloseComplete={finishClose}
        initialFocusRef={modalToggle}
        finalFocusRef={toggle}
        returnFocusOnClose
        trapFocus
        useInert
        closeOnEsc
        closeOnOverlayClick={false}
        preserveScrollBarGap
        allowPinchZoom
        scrollBehavior="inside"
        size="full"
        motionPreset="none"
      >
        <ModalOverlay
          bg="var(--hub-forest-deep)"
          motionProps={{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: reducedMotion ? 0 : 0.22 },
          }}
        />
        <ModalContent
          id="hub-mobile-menu"
          aria-label={t.ui.mobileNavigation}
          aria-describedby={undefined}
          data-tone="dark"
          data-open={open}
          className={`hub-ui ${styles.fullscreen}`}
          containerProps={{ className: styles.menuContainer }}
          margin="0"
          borderRadius="0"
          maxWidth="none"
          bg="var(--hub-forest-deep)"
          color="var(--hub-text)"
          motionProps={{
            initial: { opacity: 0, y: reducedMotion ? 0 : -12 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: reducedMotion ? 0 : -8 },
            transition: { duration: reducedMotion ? 0 : 0.22 },
          }}
        >
          <div className={styles.menuTop}>
            <BrandWordmark className={styles.menuBrand} onClick={closeMenu} />
            <button
              ref={modalToggle}
              className={styles.toggle}
              type="button"
              onClick={closeMenu}
              aria-expanded="true"
              data-morph=""
              aria-controls="hub-mobile-menu"
              aria-label={t.ui.closeMenu}
            >
              <BurgerLines />
            </button>
          </div>
          <nav className={styles.mobileNav} aria-label={t.ui.mainNavigation}>
            {nav(true)}
          </nav>
          <div className={styles.menuBottom}>
            {languages(true)}
            <HubLink
              href="/contact"
              variant="accent"
              compact
              onClick={closeMenu}
              className={styles.menuCta}
            >
              {t.nav.cta}
            </HubLink>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};
