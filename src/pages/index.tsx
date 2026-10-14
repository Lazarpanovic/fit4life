import { HubPageMeta } from "../components/hub/page-ui";
import { HubHeader } from "../components/header/hub-header";
import { Footer } from "../components/footer/footer";
import { HubHomeView } from "../views/home/hub-home.view";
import { useTranslation } from "../i18n/use-translation";
import { organizationSchema, websiteSchema } from "../utils/seo";

export default function Home() {
  const { t, locale } = useTranslation();
  return (
    <>
      <HubPageMeta
        title={t.meta.homeTitle}
        description={t.meta.homeDescription}
        path="/"
        imageAlt={t.hubHome.groupTrainingAlt}
        jsonLd={[
          organizationSchema(locale, t.meta.homeDescription),
          websiteSchema(locale),
        ]}
      />
      <HubHeader />
      <HubHomeView />
      <Footer />
    </>
  );
}
