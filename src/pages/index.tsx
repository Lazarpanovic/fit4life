import Head from "next/head";
import { HeaderDesktop } from "../components/header/header-desktop";
import { useBreakpoints } from "../hooks/use-breakpoints.hook";
import { HeaderMobile } from "../components/header/header-mobile";
import { Layout } from "../components/layout/layout";
import { HeroSectionView } from "../views/home/hero-section.view";
import { AboutUsView } from "../views/home/about-us.view";
import { ProgramsAndTrainersView } from "../views/home/programs-and-trainers.view";
import { ResourcesView } from "../views/home/resources.view";
import { Footer } from "../components/footer/footer";
import { ContactView } from "../views/home/contact.view";
import { TestimonialsView } from "../views/home/testimonials.view";
import { useTranslation } from "../i18n/use-translation";

export default function Home() {
  const { isMobile, isTablet } = useBreakpoints();
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t.meta.homeTitle}</title>
        <meta property="og:title" content={t.meta.homeTitle} />
        <link rel="canonical" href="https://www.fit4lifebelgrade.com/" />
        <meta
          name="description"
          property="og:description"
          content={t.meta.homeDescription}
        />
        <meta property="og:image" content="/hero-section.jpg" />
        <meta property="og:url" content="https://www.fit4lifebelgrade.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/hero-section.jpg" />
      </Head>

      {isMobile || isTablet ? <HeaderMobile /> : <HeaderDesktop />}

      <Layout>
        <HeroSectionView />
        <AboutUsView />
        <ProgramsAndTrainersView />
        <ResourcesView />
        <TestimonialsView />
        <ContactView />
      </Layout>

      <Footer />
    </>
  );
}
