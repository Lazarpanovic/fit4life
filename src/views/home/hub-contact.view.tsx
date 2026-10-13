import dynamic from "next/dynamic";
import { useTranslation } from "../../i18n/use-translation";
import { HubLink, HubSectionHeading } from "../../components/hub/hub-ui";
import styles from "./hub-home.module.css";

// Reuse the existing Leaflet map, coordinates and tile source. Both old viewport
// variants use the same map; this container provides the responsive dimensions.
const MapLoading = () => {
  const { t } = useTranslation();
  return (
    <p className={styles.mapLoading} role="status">
      {t.ui.mapLoading}
    </p>
  );
};

const HubMap = dynamic(() => import("../../components/contact/map-desktop"), {
  ssr: false,
  loading: MapLoading,
});

export const HubContactView = () => {
  const { t } = useTranslation();
  return (
    <section
      id="contact"
      className={`${styles.section} ${styles.contact}`}
      aria-label={t.nav.contact}
    >
      <div className={styles.container}>
        <HubSectionHeading
          label={t.contactSection.eyebrow}
          title={t.contactSection.title}
        >
          {t.contactSection.description}
        </HubSectionHeading>
        <HubContactPanel />
      </div>
    </section>
  );
};

export const HubContactPanel = ({
  ctaHref = "/contact",
  headingAs = "h3",
}: {
  ctaHref?: string;
  headingAs?: "h2" | "h3";
}) => {
  const { t } = useTranslation();
  const Heading = headingAs;
  return (
    <div className={styles.contactGrid} data-reveal>
      <div
        className={styles.map}
        role="region"
        aria-label={t.contactSection.location}
      >
        <HubMap />
      </div>
      <div data-tone="dark" className={styles.contactInfo}>
        <Heading>{t.contactSection.infoTitle}</Heading>
        <p className={styles.body}>{t.contactSection.infoDescription}</p>
        <address>
          <p>
            <span aria-hidden="true">⌖</span>
            {t.contactSection.location}
          </p>
          <a href={`mailto:${t.contactSection.email}`}>
            <span aria-hidden="true">@</span>
            {t.contactSection.email}
          </a>
          <a
            href={`tel:${t.contactSection.phone.replace(/[^+\d]/g, "").replace(/^0/, "+381")}`}
          >
            <span aria-hidden="true">↗</span>
            {t.contactSection.phone}
          </a>
        </address>
        <HubLink href={ctaHref} variant="accent">
          {t.contactSection.formTitle}
        </HubLink>
      </div>
    </div>
  );
};
