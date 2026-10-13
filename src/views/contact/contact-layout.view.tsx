import dynamic from "next/dynamic";
import { ContactFormView } from "./contact-form.view";
import { useTranslation } from "../../i18n/use-translation";
import styles from "./contact-page.module.css";

const MapLoading = () => {
  const { t } = useTranslation();
  return <p role="status">{t.ui.mapLoading}</p>;
};

const ContactMap = dynamic(
  () => import("../../components/contact/map-desktop"),
  {
    ssr: false,
    loading: MapLoading,
  },
);

const phoneHref = (phone: string) =>
  `tel:${phone.replace(/[^+\d]/g, "").replace(/^0/, "+381")}`;

export const ContactLayout = () => {
  const { t } = useTranslation();
  const contact = t.contactSection;
  return (
    <div className={styles.layout}>
      <div className={styles.columns}>
        <section
          className={styles.info}
          data-reveal
          aria-labelledby="contact-title"
        >
          <p className={styles.eyebrow}>{contact.pageEyebrow}</p>
          <h1 id="contact-title">{contact.pageTitle}</h1>
          <p className={styles.intro}>{contact.pageDescription}</p>
          <address className={styles.facts}>
            <div className={styles.fact}>
              <span className={styles.factIcon}>
                <PinIcon />
              </span>
              <span>
                <span className={styles.factLabel}>{contact.addressLabel}</span>
                <span className={styles.factValue}>{contact.location}</span>
              </span>
            </div>
            <a className={styles.fact} href={phoneHref(contact.phone)}>
              <span className={styles.factIcon}>
                <PhoneIcon />
              </span>
              <span>
                <span className={styles.factLabel}>{contact.phoneLabel}</span>
                <span className={styles.factValue}>{contact.phone}</span>
              </span>
            </a>
            <a className={styles.fact} href={`mailto:${contact.email}`}>
              <span className={styles.factIcon}>
                <MailIcon />
              </span>
              <span>
                <span className={styles.factLabel}>{contact.emailLabel}</span>
                <span className={styles.factValue}>{contact.email}</span>
              </span>
            </a>
          </address>
        </section>
        <ContactFormView />
      </div>
      <div
        className={styles.map}
        data-reveal
        role="region"
        aria-label={contact.location}
      >
        <ContactMap dragging={false} />
      </div>
    </div>
  );
};

const PinIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
  >
    <path
      d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
  >
    <path
      d="M8.5 4.5h-2A1.5 1.5 0 0 0 5 6v1.2c0 6.4 5.4 11.8 11.8 11.8H18a1.5 1.5 0 0 0 1.5-1.5v-2l-3.2-1.6-1.4 1.4a12.2 12.2 0 0 1-5-5l1.4-1.4L8.5 4.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
  >
    <rect
      x="3.5"
      y="5.5"
      width="17"
      height="13"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="m4.5 7 7.5 6L19.5 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);
