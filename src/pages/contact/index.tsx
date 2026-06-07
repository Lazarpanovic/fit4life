import Head from "next/head";
import { HeaderDesktop } from "../../components/header/header-desktop";
import { HeaderMobile } from "../../components/header/header-mobile";
import { Layout } from "../../components/layout/layout";
import { Footer } from "../../components/footer/footer";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { Badge, Box, Text, VStack } from "@chakra-ui/react";
import { ContactInfoView } from "../../views/contact/contact-info.view";
import { ContactFormView } from "../../views/contact/contact-form.view";
import { useTranslation } from "../../i18n/use-translation";

export default function ContactPage() {
  const { isMobile, isTablet } = useBreakpoints();
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t.contactSection.metaTitle}</title>
        <meta property="og:title" content={t.contactSection.metaTitle} />
        <link rel="canonical" href="https://www.fit4lifebelgrade.com/contact" />
        <meta
          name="description"
          property="og:description"
          content={t.contactSection.metaDescription}
        />
        <meta property="og:image" content="/hero-section.jpg" />
        <meta
          property="og:url"
          content="https://www.fit4lifebelgrade.com/contact"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/hero-section.jpg" />
      </Head>

      {isMobile || isTablet ? <HeaderMobile /> : <HeaderDesktop />}

      <Layout>
        <Box
          as="main"
          position="relative"
          bg="brand.black"
          color="white"
          minH="100vh"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="-180px"
            right="-160px"
            w="480px"
            h="480px"
            borderRadius="full"
            bg="rgba(255,42,42,0.11)"
            filter="blur(90px)"
          />

          <Box
            position="absolute"
            bottom="20%"
            left="-180px"
            w="520px"
            h="520px"
            borderRadius="full"
            bg="rgba(255,107,0,0.08)"
            filter="blur(100px)"
          />

          <VStack
            position="relative"
            zIndex={1}
            px={{ base: 5, md: 10, xl: 16, "2xl": 24 }}
            py={{ base: 16, lg: 24 }}
            spacing={{ base: 12, lg: 16 }}
          >
            <VStack spacing={5} textAlign="center" maxW="940px">
              <Badge
                px={4}
                py={2}
                borderRadius="full"
                bg="rgba(255,42,42,0.12)"
                color="brand.red"
                border="1px solid rgba(255,42,42,0.26)"
                fontSize="12px"
                letterSpacing="0.16em"
                textTransform="uppercase"
              >
                {t.contactSection.pageEyebrow}
              </Badge>

              <Text
                as="h1"
                fontSize={{ base: "42px", md: "68px", xl: "88px" }}
                lineHeight={0.92}
                fontWeight={900}
                letterSpacing="-0.08em"
              >
                {t.contactSection.pageTitle}
              </Text>

              <Text
                fontSize={{ base: "16px", md: "18px" }}
                color="whiteAlpha.680"
                lineHeight={1.8}
                fontWeight={500}
              >
                {t.contactSection.pageDescription}
              </Text>
            </VStack>

            <ContactInfoView />

            <Box
              w="100%"
              maxW="1180px"
              p={{ base: 5, md: 8, lg: 10 }}
              borderRadius="38px"
              bg="rgba(255,255,255,0.055)"
              border="1px solid rgba(255,255,255,0.11)"
              backdropFilter="blur(18px)"
              boxShadow="0 30px 100px rgba(0,0,0,0.28)"
            >
              <ContactFormView />
            </Box>
          </VStack>
        </Box>
      </Layout>

      <Footer />
    </>
  );
}
