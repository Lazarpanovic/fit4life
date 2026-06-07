import Head from "next/head";
import { HeaderDesktop } from "../../components/header/header-desktop";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { HeaderMobile } from "../../components/header/header-mobile";
import { Layout } from "../../components/layout/layout";
import { useParams } from "next/navigation";
import { Box, Text } from "@chakra-ui/react";
import { newPrograms, pricingPlans } from "../../data/data";
import { Footer } from "../../components/footer/footer";
import { ProgramSelectionView } from "../../views/programs/details/program-selection.view";
import { ProgramImageView } from "../../views/programs/details/program-image.view";
import { PricingPlanView } from "../../views/programs/details/pricing-plans.view";
import { useTranslation } from "../../i18n/use-translation";

export default function ProgramDetailsPage() {
  const { isMobile, isTablet } = useBreakpoints();
  const params = useParams();
  const { t } = useTranslation();

  const program = newPrograms.find(
    (program) => params && program.id === Number(params.id),
  );

  if (!program) {
    return (
      <Box minH="100vh" bg="brand.black" color="white">
        {isMobile || isTablet ? <HeaderMobile /> : <HeaderDesktop />}
        <Text p={10}>{t.programDetailsPage.notFound}</Text>
      </Box>
    );
  }

  const translatedProgram = t.programsPage.programs[program.key];

  return (
    <>
      <Head>
        <title>
          {t.programDetailsPage.metaTitlePrefix}: {translatedProgram.shortTitle}
        </title>
        <meta
          property="og:title"
          content={`${t.programDetailsPage.metaTitlePrefix}: ${translatedProgram.shortTitle}`}
        />
        <link
          rel="canonical"
          href={`https://www.fit4lifebelgrade.com/programs/${program.id}`}
        />
        <meta
          name="description"
          property="og:description"
          content={t.programDetailsPage.metaDescription}
        />
        <meta property="og:image" content={program.imageSrc} />
        <meta
          property="og:url"
          content={`https://www.fit4lifebelgrade.com/programs/${program.id}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={program.imageSrc} />
      </Head>

      {isMobile || isTablet ? <HeaderMobile /> : <HeaderDesktop />}

      <Layout>
        <ProgramImageView program={program} />
        <PricingPlanView program={program} pricingPlans={pricingPlans} />
        <ProgramSelectionView
          programKey={program.key}
          pricingPlans={pricingPlans}
        />
      </Layout>

      <Footer />
    </>
  );
}
