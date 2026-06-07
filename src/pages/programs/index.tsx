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
import {
  newPrograms,
  programCategories,
  ProgramCategoryKey,
} from "../../data/data";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Footer } from "../../components/footer/footer";
import { NewProgramCard } from "../../components/programs/new-program-card";
import { useTranslation } from "../../i18n/use-translation";

export default function ProgramsPage() {
  const { isMobile, isTablet } = useBreakpoints();
  const { query, push, pathname, isReady } = useRouter();
  const { t } = useTranslation();

  const [activeCategory, setActiveCategory] =
    useState<ProgramCategoryKey>("all");
  const [visiblePrograms, setVisiblePrograms] = useState(6);

  const categoryParam = query.category;

  const selectedCategory = useMemo(() => {
    if (!categoryParam) {
      return "all";
    }

    const value = Array.isArray(categoryParam)
      ? categoryParam[0]
      : categoryParam;

    const exists = programCategories.some((category) => category.key === value);

    return exists ? (value as ProgramCategoryKey) : "all";
  }, [categoryParam]);

  const setCategoryFilter = useCallback(
    (categoryKey: ProgramCategoryKey) => {
      setActiveCategory(categoryKey);
      setVisiblePrograms(6);

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

  const filteredPrograms =
    activeCategory !== "all"
      ? newPrograms.filter((program) =>
          program.categories.some(
            (category) => category.key === activeCategory,
          ),
        )
      : newPrograms;

  const displayedPrograms = filteredPrograms.slice(0, visiblePrograms);

  const handleShowMore = () => {
    setVisiblePrograms((prev) => prev + 3);
  };

  return (
    <>
      <Head>
        <title>{t.programsPage.metaTitle}</title>
        <meta property="og:title" content={t.programsPage.metaTitle} />
        <link
          rel="canonical"
          href="https://www.fit4lifebelgrade.com/programs"
        />
        <meta
          name="description"
          property="og:description"
          content={t.programsPage.metaDescription}
        />
        <meta property="og:image" content="/hero-section.jpg" />
        <meta
          property="og:url"
          content="https://www.fit4lifebelgrade.com/programs"
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
            bg="rgba(255,42,42,0.11)"
            filter="blur(90px)"
          />

          <Box
            position="absolute"
            bottom="-200px"
            left="-180px"
            w="520px"
            h="520px"
            borderRadius="full"
            bg="rgba(255,107,0,0.08)"
            filter="blur(100px)"
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
                {t.programsPage.eyebrow}
              </Badge>

              <Text
                as="h1"
                fontSize={{ base: "42px", md: "68px", xl: "88px" }}
                lineHeight={0.92}
                fontWeight={900}
                letterSpacing="-0.08em"
              >
                {t.programsPage.title}
              </Text>

              <Text
                fontSize={{ base: "16px", md: "18px" }}
                color="whiteAlpha.680"
                lineHeight={1.8}
                fontWeight={500}
              >
                {t.programsPage.description}
              </Text>
            </VStack>

            <HStack w="100%" maxW="1040px" wrap="wrap" justify="center" gap={3}>
              {programCategories.map((category) => {
                const categoryKey = category.key as ProgramCategoryKey;
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
                    {t.programsPage.categories[categoryKey]}
                  </Button>
                );
              })}
            </HStack>

            {displayedPrograms.length > 0 ? (
              <SimpleGrid
                columns={{ base: 1, md: 2, xl: 3 }}
                spacing={6}
                w="100%"
              >
                {displayedPrograms.map((program) => (
                  <NewProgramCard
                    key={program.id}
                    id={program.id}
                    imageSrc={program.imageSrc}
                    programKey={program.key}
                    price={program.price}
                    duration={program.duration}
                    categories={program.categories}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Text color="whiteAlpha.680" fontSize="18px" fontWeight={700}>
                {t.programsPage.empty}
              </Text>
            )}

            {filteredPrograms.length > visiblePrograms && (
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
                transition="all 0.2s ease"
                onClick={handleShowMore}
              >
                {t.programsPage.discoverMore}
              </Button>
            )}
          </VStack>
        </Box>
      </Layout>

      <Footer />
    </>
  );
}
