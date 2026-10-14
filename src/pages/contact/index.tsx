import {
  HubPage,
  HubPageMeta,
  pageStyles as styles,
} from "../../components/hub/page-ui";
import { ContactLayout } from "../../views/contact/contact-layout.view";
import { useTranslation } from "../../i18n/use-translation";
import { breadcrumbSchema, organizationSchema } from "../../utils/seo";

export default function ContactPage() {
  const { t, locale } = useTranslation();
  return (
    <>
      <HubPageMeta
        title={t.contactSection.metaTitle}
        description={t.contactSection.metaDescription}
        path="/contact"
        jsonLd={[
          organizationSchema(locale, t.meta.homeDescription),
          breadcrumbSchema(locale, [
            { name: t.nav.home, path: "/" },
            { name: t.nav.contact, path: "/contact" },
          ]),
        ]}
      />
      <HubPage>
        <div className={styles.container}>
          <ContactLayout />
        </div>
      </HubPage>
    </>
  );
}
