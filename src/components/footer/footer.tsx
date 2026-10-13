import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "../../i18n/use-translation";
import { hubNavItems } from "../header/hub-header";
import styles from "./footer.module.css";

export const Footer = () => {
  const { t, locale } = useTranslation();
  return (
    <footer data-tone="dark" className={`hub-ui ${styles.footer}`}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" aria-label="Fit4Life Hub">
              <Image
                src="/assets/fit4life/logo-dark.svg"
                alt="Fit4Life Hub"
                width={480}
                height={470}
                className={styles.logo}
              />
            </Link>
            <p>Longevity – Performance Concept</p>
          </div>
          <nav
            aria-label={
              locale === "sr" ? "Navigacija u podnožju" : "Footer navigation"
            }
            className={styles.nav}
          >
            {hubNavItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {t.nav[item.key]}
              </Link>
            ))}
          </nav>
          <div className={styles.contact}>
            <p className={styles.label}>{t.nav.contact}</p>
            <a href={`mailto:${t.contactSection.email}`}>
              {t.contactSection.email}
            </a>
            <a
              href={`tel:${t.contactSection.phone.replace(/[^+\d]/g, "").replace(/^0/, "+381")}`}
            >
              {t.contactSection.phone}
            </a>
            <p>{t.contactSection.location}</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} Fit4Life Hub. {t.footer.rights}.
          </p>
          <p>Health · Performance · Longevity · Balance · Testing</p>
        </div>
      </div>
    </footer>
  );
};
