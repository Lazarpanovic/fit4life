import Head from "next/head";
import { HeaderDesktop } from "../../components/header/header-desktop";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { HeaderMobile } from "../../components/header/header-mobile";
import { Layout } from "../../components/layout/layout";
import {
  Badge,
  Box,
  Button,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { categories, resources, ResourceCategoryKey } from "../../data/data";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Footer } from "../../components/footer/footer";
import { ResourceCard } from "../../components/resources/resource-card";
import { useTranslation } from "../../i18n/use-translation";

export default function ResourcesPage() {
  const { isMobile, isTablet } = useBreakpoints();
  const { query, push, pathname, isReady } = useRouter();
  const { t } = useTranslation();

  const [activeCategory, setActiveCategory] =
    useState<ResourceCategoryKey>("all");
  const [visibleResources, setVisibleResources] = useState(6);

  const categoryParam = query.category;

  const selectedCategory = useMemo(() => {
    if (!categoryParam) {
      return "all";
    }

    const value = Array.isArray(categoryParam)
      ? categoryParam[0]
      : categoryParam;

    const exists = categories.some((category) => category.key === value);

    return exists ? (value as ResourceCategoryKey) : "all";
  }, [categoryParam]);

  const setCategoryFilter = useCallback(
    (categoryKey: ResourceCategoryKey) => {
      setActiveCategory(categoryKey);
      setVisibleResources(6);

      push(
        {
          pathname,
          query: categoryKey !== "all" ? { category: categoryKey } : undefined,
        },
        undefined,
        { shallow: true },
      );
    },
    [pathname, push],
  );

  useEffect(() => {
    if (isReady) {
      setActiveCategory(selectedCategory);
    }
  }, [isReady, selectedCategory]);

  const filteredResources =
    activeCategory !== "all"
      ? resources.filter((resource) =>
          resource.categories.some(
            (category) => category.key === activeCategory,
          ),
        )
      : resources;

  const displayedResources = filteredResources.slice(0, visibleResources);

  const handleShowMore = () => {
    setVisibleResources((prev) => prev + 3);
  };

  return (
    <>
      <Head>
        <title>{t.resourcesPage.metaTitle}</title>
        <meta property="og:title" content={t.resourcesPage.metaTitle} />
        <link
          rel="canonical"
          href="https://www.fit4lifebelgrade.com/resources"
        />
        <meta
          name="description"
          property="og:description"
          content={t.resourcesPage.metaDescription}
        />
        <meta property="og:image" content="/hero-section.jpg" />
        <meta
          property="og:url"
          content="https://www.fit4lifebelgrade.com/resources"
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
          px={{ base: 5, md: 10, xl: 16, "2xl": 24 }}
          py={{ base: 16, lg: 24 }}
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="-180px"
            right="-160px"
            w="480px"
            h="480px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(255,42,42,0.18) 0%, rgba(255,42,42,0.08) 42%, transparent 72%)"
            pointerEvents="none"
          />

          <Box
            position="absolute"
            bottom="-200px"
            left="-180px"
            w="520px"
            h="520px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(255,107,0,0.14) 0%, rgba(255,107,0,0.06) 42%, transparent 72%)"
            pointerEvents="none"
          />

          <VStack position="relative" zIndex={1} spacing={{ base: 10, lg: 14 }}>
            <VStack spacing={5} textAlign="center" maxW="920px">
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
                {t.resourcesPage.eyebrow}
              </Badge>

              <Text
                as="h1"
                fontSize={{ base: "42px", md: "68px", xl: "88px" }}
                lineHeight={0.92}
                fontWeight={900}
                letterSpacing="-0.08em"
              >
                {t.resourcesPage.title}
              </Text>

              <Text
                fontSize={{ base: "16px", md: "18px" }}
                color="whiteAlpha.680"
                lineHeight={1.8}
                fontWeight={500}
              >
                {t.resourcesPage.description}
              </Text>
            </VStack>

            <HStack w="100%" maxW="1040px" wrap="wrap" justify="center" gap={3}>
              {categories.map((category) => {
                const categoryKey = category.key as ResourceCategoryKey;
                const isActive = activeCategory === categoryKey;

                return (
                  <Button
                    key={category.id}
                    h="44px"
                    px={5}
                    borderRadius="full"
                    bg={isActive ? "brand.red" : "rgba(255,255,255,0.07)"}
                    color="white"
                    border={
                      isActive
                        ? "1px solid rgba(255,42,42,0.7)"
                        : "1px solid rgba(255,255,255,0.11)"
                    }
                    fontSize="13px"
                    _hover={{
                      bg: isActive ? "brand.red" : "rgba(255,42,42,0.12)",
                      borderColor: "rgba(255,42,42,0.5)",
                    }}
                    onClick={() => setCategoryFilter(categoryKey)}
                  >
                    {t.resourcesPage.categories[categoryKey]}
                  </Button>
                );
              })}
            </HStack>

            {displayedResources.length > 0 ? (
              <SimpleGrid
                columns={{ base: 1, md: 2, xl: 3 }}
                spacing={6}
                w="100%"
              >
                {displayedResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    id={resource.id}
                    imageSrc={resource.image}
                    resourceKey={resource.key}
                    categories={resource.categories}
                    isResourcesPage
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Text color="whiteAlpha.680" fontSize="18px" fontWeight={700}>
                {t.resourcesPage.empty}
              </Text>
            )}

            {filteredResources.length > visibleResources && (
              <Button
                h="56px"
                px={9}
                borderRadius="full"
                bg="brand.red"
                color="white"
                boxShadow="0 0 36px rgba(255,42,42,0.28)"
                _hover={{
                  bg: "white",
                  color: "black",
                  transform: "translateY(-2px)",
                }}
                transition="background 0.2s ease, color 0.2s ease, transform 0.2s ease"
                onClick={handleShowMore}
              >
                {t.resourcesPage.discoverMore}
              </Button>
            )}
          </VStack>
        </Box>
      </Layout>

      <Footer />
    </>
  );
}
