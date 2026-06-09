import Head from "next/head";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HeaderDesktop } from "../../components/header/header-desktop";
import { HeaderMobile } from "../../components/header/header-mobile";
import { Footer } from "../../components/footer/footer";
import { Layout } from "../../components/layout/layout";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { resources, ResourceCategoryKey, ResourceKey } from "../../data/data";
import { useTranslation } from "../../i18n/use-translation";
import { ResourceCard } from "../../components/resources/resource-card";

export default function ResourceDetailsPage() {
  const { isMobile, isTablet } = useBreakpoints();
  const params = useParams();
  const router = useRouter();
  const { t } = useTranslation();

  const resource = resources.find(
    (resource) => params && resource.id === Number(params.id),
  );

  if (!resource) {
    return (
      <Box minH="100vh" bg="brand.black" color="white">
        {isMobile || isTablet ? <HeaderMobile /> : <HeaderDesktop />}

        <VStack minH="60vh" justify="center" spacing={6} px={5}>
          <Text fontSize="32px" fontWeight={900}>
            {t.resourcesPage.details.notFound}
          </Text>

          <Button
            leftIcon={<ArrowBackIcon />}
            borderRadius="full"
            bg="white"
            color="black"
            onClick={() => router.push("/resources")}
          >
            {t.resourcesPage.details.backToResources}
          </Button>
        </VStack>
      </Box>
    );
  }

  const translatedResource = t.resourcesPage.resources[resource.key];
  const articleContent = t.resourcesPage.content[resource.key];

  const relatedResources = resources.filter((item) => item.id !== resource.id);

  return (
    <>
      <Head>
        <title>Fit4Life: {translatedResource.title}</title>
        <meta
          property="og:title"
          content={`Fit4Life: ${translatedResource.title}`}
        />
        <link
          rel="canonical"
          href={`https://www.fit4lifebelgrade.com/resources/${resource.id}`}
        />
        <meta
          name="description"
          property="og:description"
          content={translatedResource.description}
        />
        <meta property="og:image" content={resource.image} />
        <meta
          property="og:url"
          content={`https://www.fit4lifebelgrade.com/resources/${resource.id}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={resource.image} />
      </Head>

      {isMobile || isTablet ? <HeaderMobile /> : <HeaderDesktop />}

      <Layout>
        <Box as="main" bg="brand.black" color="white" overflow="hidden">
          <Box
            as="section"
            position="relative"
            minH={{ base: "680px", lg: "760px" }}
            overflow="hidden"
            className="premium-noise"
          >
            <Box position="absolute" inset={0}>
              <Image
                src={resource.image}
                alt={translatedResource.title}
                fill
                priority
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />

              <Box
                position="absolute"
                inset={0}
                bg={{
                  base: "linear-gradient(180deg, rgba(6,6,6,0.58), rgba(6,6,6,0.98) 82%)",
                  lg: "linear-gradient(90deg, rgba(6,6,6,0.96), rgba(6,6,6,0.72) 48%, rgba(6,6,6,0.28))",
                }}
              />

              <Box
                position="absolute"
                inset={0}
                bg="radial-gradient(circle at 28% 34%, rgba(255,42,42,0.24), transparent 34%)"
              />
            </Box>

            <VStack
              position="relative"
              zIndex={1}
              align="flex-start"
              justify="center"
              minH={{ base: "680px", lg: "760px" }}
              maxW="980px"
              px={{ base: 5, md: 10, xl: 16, "2xl": 24 }}
              py={{ base: 16, lg: 24 }}
              spacing={7}
            >
              <Button
                leftIcon={<ArrowBackIcon />}
                h="46px"
                px={5}
                borderRadius="full"
                bg="rgba(255,255,255,0.08)"
                color="white"
                border="1px solid rgba(255,255,255,0.12)"
                _hover={{
                  bg: "white",
                  color: "black",
                }}
                onClick={() => router.push("/resources")}
              >
                {t.resourcesPage.details.backToResources}
              </Button>

              <HStack wrap="wrap" spacing={2}>
                {resource.categories.map((category) => (
                  <Badge
                    key={category.id}
                    px={4}
                    py={2}
                    borderRadius="full"
                    bg="rgba(255,42,42,0.12)"
                    color="brand.red"
                    border="1px solid rgba(255,42,42,0.3)"
                    fontSize="11px"
                    letterSpacing="0.14em"
                    textTransform="uppercase"
                  >
                    {
                      t.resourcesPage.categories[
                        category.key as ResourceCategoryKey
                      ]
                    }
                  </Badge>
                ))}
              </HStack>

              <VStack align="flex-start" spacing={4}>
                <Text
                  color="brand.red"
                  fontSize={{ base: "14px", md: "15px" }}
                  fontWeight={900}
                  textTransform="uppercase"
                  letterSpacing="0.16em"
                >
                  {t.resourcesPage.details.article}
                </Text>

                <Text
                  as="h1"
                  fontSize={{ base: "46px", md: "72px", xl: "92px" }}
                  lineHeight={0.92}
                  fontWeight={900}
                  letterSpacing="-0.08em"
                  maxW="980px"
                >
                  {translatedResource.title}
                </Text>
              </VStack>

              <Text
                maxW="760px"
                color="whiteAlpha.720"
                fontSize={{ base: "16px", md: "19px" }}
                lineHeight={1.85}
                fontWeight={500}
              >
                {translatedResource.description}
              </Text>
            </VStack>
          </Box>

          <Box
            as="section"
            position="relative"
            px={{ base: 5, md: 10, xl: 16, "2xl": 24 }}
            py={{ base: 20, lg: 28 }}
          >
            <Box
              position="absolute"
              top="-160px"
              right="-160px"
              w="460px"
              h="460px"
              borderRadius="full"
              bg="radial-gradient(circle, rgba(255,42,42,0.16) 0%, rgba(255,42,42,0.07) 42%, transparent 72%)"
              pointerEvents="none"
            />

            <VStack
              position="relative"
              zIndex={1}
              align="stretch"
              maxW="980px"
              mx="auto"
              spacing={6}
            >
              {articleContent.map((section, index) => (
                <HStack
                  key={section.title}
                  align="flex-start"
                  spacing={{ base: 4, md: 8 }}
                  p={{ base: 5, md: 8 }}
                  borderRadius="32px"
                  bg="rgba(255,255,255,0.075)"
                  border="1px solid rgba(255,255,255,0.11)"
                  flexDirection={{ base: "column", md: "row" }}
                >
                  <Text
                    minW="64px"
                    color="brand.red"
                    fontSize={{ base: "22px", md: "28px" }}
                    fontWeight={900}
                    letterSpacing="-0.06em"
                  >
                    0{index + 1}
                  </Text>

                  <VStack align="flex-start" spacing={3}>
                    <Text
                      as="h2"
                      color="white"
                      fontSize={{ base: "28px", md: "38px" }}
                      lineHeight={1}
                      fontWeight={900}
                      letterSpacing="-0.065em"
                    >
                      {section.title}
                    </Text>

                    <Text
                      color="whiteAlpha.700"
                      fontSize={{ base: "16px", md: "18px" }}
                      lineHeight={1.85}
                      fontWeight={500}
                    >
                      {section.body}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </Box>

          <Box
            as="section"
            position="relative"
            px={{ base: 5, md: 10, xl: 16, "2xl": 24 }}
            pb={{ base: 20, lg: 28 }}
          >
            <VStack spacing={{ base: 10, lg: 14 }}>
              <Text
                as="h2"
                textAlign="center"
                fontSize={{ base: "38px", md: "58px", xl: "76px" }}
                lineHeight={0.95}
                fontWeight={900}
                letterSpacing="-0.075em"
              >
                {t.resourcesPage.details.relatedTitle}
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                {relatedResources.map((relatedResource) => (
                  <ResourceCard
                    key={relatedResource.id}
                    id={relatedResource.id}
                    imageSrc={relatedResource.image}
                    resourceKey={relatedResource.key as ResourceKey}
                    categories={relatedResource.categories}
                    isResourcesPage
                  />
                ))}
              </SimpleGrid>

              <Button
                leftIcon={<ArrowBackIcon />}
                h="46px"
                px={5}
                borderRadius="full"
                bg="rgba(255,255,255,0.08)"
                color="white"
                border="1px solid rgba(255,255,255,0.12)"
                _hover={{
                  bg: "white",
                  color: "black",
                }}
                transition="background 0.2s ease, color 0.2s ease"
                onClick={() => router.push("/resources")}
              >
                {t.resourcesPage.details.backToResources}
              </Button>
            </VStack>
          </Box>
        </Box>
      </Layout>

      <Footer />
    </>
  );
}
