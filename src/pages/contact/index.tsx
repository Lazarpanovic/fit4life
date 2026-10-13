import {
  HubPage,
  HubPageMeta,
  pageStyles as styles,
} from "../../components/hub/page-ui";
import { ContactLayout } from "../../views/contact/contact-layout.view";
import { useTranslation } from "../../i18n/use-translation";

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <>
      <HubPageMeta
        title={t.contactSection.metaTitle}
        description={t.contactSection.metaDescription}
        path="/contact"
      />
      <HubPage>
        <div className={styles.container}>
          <ContactLayout />
        </div>
      </HubPage>
    </>
  );
}
