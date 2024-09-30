import Head from "next/head";
import { HeaderDesktop } from "../../components/header/header-desktop";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { HeaderMobile } from "../../components/header/header-mobile";
import { Layout } from "../../components/layout/layout";
import { useParams } from "next/navigation";
import { Box, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { resources } from "../../data/data";
import { PADDING_10, PADDING_20 } from "../../constants/layout.constants";

export default function Home() {
  const { isMobile, isTablet } = useBreakpoints();
  const params = useParams();
  const resource = resources.find(
    (resource) => params && resource.id === Number(params.id)
  );
  if (!resource) {
    return <Text>Resource not found</Text>;
  }
  return (
    <>
      <Head>
        <title>Fit4Life: Useful Resources - {resource.title}</title>
        <meta
          property="og:title"
          content="Fit4Life: Personal Training, Gym, Spa, Wellness & Sauna – Fitness Center"
        />
        <link rel="canonical" href="https://www.fit4lifebelgrade.com/" />
        <meta
          name="description"
          property="og:description"
          content="Experience a full range of fitness services, including sauna, wellness, spa, gym, and personal training, tailored to help you achieve your health and wellness goals!"
        />
        {/* Add Open Graph image for link preview */}
        <meta property="og:image" content="/hero-section.jpg" />
        <meta property="og:url" content="https://www.fit4lifebelgrade.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Twitter meta tags (optional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/hero-section.jpg" />
      </Head>
      {isMobile || isTablet ? <HeaderMobile /> : <HeaderDesktop />}
      <Layout>
        <Box pos="relative" w="100%" h={500}>
          <Image
            src={resource.image}
            alt={`resource-${resource.id}`}
            fill
            style={{
              objectFit: "cover",
            }}
          />
          <Box
            pos="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            bg="#00000066"
          />
          <Text
            fontSize={48}
            fontWeight={700}
            lineHeight={1}
            color="white"
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            textAlign="center"
          >
            {resource.title}
          </Text>
        </Box>
        <VStack px={{ base: PADDING_10, md: PADDING_20 }} mb={20}>
          <Box
            mt={20}
            id={`resource-${resource.id}__content`}
            w={{ base: "100%", md: "60%" }}
            dangerouslySetInnerHTML={{ __html: resource.content }}
          ></Box>
        </VStack>
      </Layout>
    </>
  );
}
