import Head from "next/head";
import { HeaderDesktop } from "../../components/header/header-desktop";
import { HeaderMobile } from "../../components/header/header-mobile";
import { Layout } from "../../components/layout/layout";
import { Footer } from "../../components/footer/footer";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { Text, VStack } from "@chakra-ui/react";
import { GAP_10, PADDING_10 } from "../../constants/layout.constants";
import { ContactInfoView } from "../../views/contact/contact-info.view";
import { ContactFormView } from "../../views/contact/contact-form.view";

export default function Home() {
  const { isMobile, isTablet } = useBreakpoints();
  return (
    <>
      <Head>
        <title>
          Fit4Life: Get in Touch – Contact Us for Fitness Support, Wellness
          Advice, and More
        </title>
        <meta
          property="og:title"
          content="Fit4Life: Get in Touch – Contact Us for Fitness Support, Wellness Advice, and More"
        />
        <link rel="canonical" href="https://www.fit4lifebelgrade.com/contact" />
        <meta
          name="description"
          property="og:description"
          content="Get in touch with Fit4Life for personalized fitness support, wellness advice, and answers to all your health and training questions. We're here to help you reach your goals!"
        />
        {/* Add Open Graph image for link preview */}
        <meta property="og:image" content="/hero-section.jpg" />
        <meta
          property="og:url"
          content="https://www.fit4lifebelgrade.com/contact"
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
        <VStack
          px={{ base: 0, lg: PADDING_10 }}
          gap={GAP_10}
          py={{ base: 20, lg: 32 }}
        >
          {!(isMobile || isTablet) && (
            <>
              <Text
                fontSize={{ base: 30, lg: 48 }}
                fontWeight={700}
                textAlign="center"
                color="#1A202C"
              >
                Contact us
              </Text>
              <Text
                fontSize={{ base: 16, lg: 20 }}
                fontWeight={500}
                opacity={0.6}
                w={{ base: "100%", lg: "60%" }}
                textAlign="center"
              >
                Ready to take the next step toward your fitness goals? We are
                here to support you every step of the way. Reach out with any
                inquiries, feedback, or just to say hello. Our team is excited
                to assist you and will respond promptly!
              </Text>
            </>
          )}
          <ContactInfoView />
          <ContactFormView />
        </VStack>
      </Layout>
      <Footer />
    </>
  );
}
