import Head from "next/head";
import { HeaderDesktop } from "../../components/header/header-desktop";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { HeaderMobile } from "../../components/header/header-mobile";
import { Layout } from "../../components/layout/layout";
import { useParams } from "next/navigation";
import { Text } from "@chakra-ui/react";
import { newPrograms, pricingPlans } from "../../data/data";
import { Footer } from "../../components/footer/footer";
import { ProgramSelectionView } from "../../views/programs/details/program-selection.view";
import { ProgramImageView } from "../../views/programs/details/program-image.view";
import { PricingPlanView } from "../../views/programs/details/pricing-plans.view";

export default function Home() {
  const { isMobile, isTablet } = useBreakpoints();
  const params = useParams();
  const program = newPrograms.find(
    (program) => params && program.id === Number(params.id),
  );
  if (!program) {
    return <Text>Resource not found</Text>;
  }
  return (
    <>
      <Head>
        <title>Fit4Life: Program - {program.title}</title>
        <meta
          property="og:title"
          content="Fit4Life: Personal Training, Gym, Spa, Wellness & Sauna – Fitness Center"
        />
        <link
          rel="canonical"
          href={`https://www.fit4lifebelgrade.com/resources/${program.id}`}
        />
        <meta
          name="description"
          property="og:description"
          content="Experience a full range of fitness services, including sauna, wellness, spa, gym, and personal training, tailored to help you achieve your health and wellness goals!"
        />
        {/* Add Open Graph image for link preview */}
        <meta property="og:image" content="/hero-section.jpg" />
        <meta
          property="og:url"
          content={`https://www.fit4lifebelgrade.com/resources/${program.id}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Twitter meta tags (optional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/hero-section.jpg" />
      </Head>
      {isMobile || isTablet ? <HeaderMobile /> : <HeaderDesktop />}
      <Layout>
        <ProgramImageView program={program} />
        <PricingPlanView program={program} />
        <ProgramSelectionView
          programTitle={program.shortTitle}
          pricingPlans={pricingPlans}
        />
      </Layout>
      <Footer />
    </>
  );
}
