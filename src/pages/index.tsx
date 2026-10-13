import Head from "next/head";
import { HubHeader } from "../components/header/hub-header";
import { Footer } from "../components/footer/footer";
import { HubHomeView } from "../views/home/hub-home.view";
import { useTranslation } from "../i18n/use-translation";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.meta.homeTitle}</title>
        <meta property="og:title" content={t.meta.homeTitle} />
        <link rel="canonical" href="https://www.fit4lifebelgrade.com/" />
        <meta name="description" content={t.meta.homeDescription} />
        <meta property="og:description" content={t.meta.homeDescription} />
        <meta property="og:site_name" content="Fit4Life Hub" />
        <meta property="og:image" content="/hero-section.jpg" />
        <meta property="og:url" content="https://www.fit4lifebelgrade.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/hero-section.jpg" />
      </Head>
      <HubHeader />
      <HubHomeView />
      <Footer />
    </>
  );
}
