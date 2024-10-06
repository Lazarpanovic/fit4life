import Head from "next/head";
import { HeaderDesktop } from "../../components/header/header-desktop";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { HeaderMobile } from "../../components/header/header-mobile";
import { Layout } from "../../components/layout/layout";
import {
  Box,
  Button,
  HStack,
  Stack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  GAP_10,
  GAP_5,
  PADDING_10,
  PADDING_20,
} from "../../constants/layout.constants";
import { newPrograms, programCategories } from "../../data/data";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Footer } from "../../components/footer/footer";
import { NewProgramCard } from "../../components/programs/new-program-card";

export default function Home() {
  const { isMobile, isTablet } = useBreakpoints();
  const { query, push, pathname, isReady } = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visiblePrograms, setVisiblePrograms] = useState(3);

  const categoryNamesParam = query.category_names;

  const categoryNames = useMemo(() => {
    return categoryNamesParam
      ? Array.isArray(categoryNamesParam)
        ? categoryNamesParam
        : Array(categoryNamesParam)
      : [];
  }, [categoryNamesParam]);

  const setCategoryFilter = useCallback(
    (categoryName?: string) => {
      setActiveCategory(categoryName || "All"); // Update active category state
      push(
        {
          pathname: pathname,
          query: categoryName ? { category_names: categoryName } : undefined,
        },
        undefined,
        { shallow: true }
      );
    },
    [pathname, push]
  );

  useEffect(() => {
    if (isReady) {
      setActiveCategory(categoryNames.length > 0 ? categoryNames[0] : "All");
    }
  }, [isReady, categoryNames]);

  const filteredPrograms =
    activeCategory && activeCategory !== "All"
      ? newPrograms.filter((program) =>
          program.categories
            .map((category) => category.name)
            .includes(activeCategory)
        )
      : newPrograms;

  const displayedPrograms = filteredPrograms.slice(0, visiblePrograms); // Show visible programs

  const handleShowMore = () => {
    setVisiblePrograms((prev) => prev + 3); // Increase the number of visible programs by 3
  };

  return (
    <>
      <Head>
        <title>
          Fit4Life: Programs - Fitness & Sport Classes, Personal Training, Group
          Workouts
        </title>
        <meta
          property="og:title"
          content="Fit4Life: Programs - Fitness & Sport Classes, Personal Training, Group Workouts"
        />
        <link
          rel="canonical"
          href="https://www.fit4lifebelgrade.com/programs"
        />
        <meta
          name="description"
          property="og:description"
          content="Explore Fit4Life's range of fitness and sport programs, including personal training, group classes, and specialized workouts. Join us to achieve your fitness goals with expert guidance in a supportive environment."
        />
        {/* Add Open Graph image for link preview */}
        <meta property="og:image" content="/hero-section.jpg" />
        <meta
          property="og:url"
          content="https://www.fit4lifebelgrade.com/programs"
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
          px={{ base: PADDING_10, lg: PADDING_20 }}
          gap={GAP_10}
          py={{ base: 20, lg: 32 }}
        >
          <Text
            fontSize={{ base: 30, lg: 48 }}
            fontWeight={700}
            textAlign="center"
            color="#1A202C"
          >
            Welcome to FIT4Life Programs
          </Text>
          <Text
            fontSize={{ base: 16, lg: 20 }}
            fontWeight={500}
            opacity={0.6}
            w={{ base: "100%", lg: "60%" }}
            textAlign="center"
          >
            Explore our wide range of fitness and sport programs, including
            personal training, group classes, and specialized workouts designed
            to help you reach your fitness goals. Join us at Fit4Life to train
            smarter, stay motivated, and live a healthier lifestyle!
          </Text>
          <HStack
            w={{ base: "100%", lg: "60%" }}
            wrap="wrap"
            justify="center"
            gap={{ base: GAP_5, lg: GAP_10 }}
          >
            {programCategories.map((category) => (
              <Tag
                key={category.id}
                bg={activeCategory === category.name ? "red.500" : "#EDF2F7"}
                color={activeCategory === category.name ? "white" : "#1A202C"}
                cursor="pointer"
                _hover={{ bg: "red.500", color: "white" }}
                size="lg"
                px={8}
                py={2}
                onClick={() => setCategoryFilter(category.name)}
              >
                {category.name}
              </Tag>
            ))}
          </HStack>
          <Stack
            direction={{ base: "column", md: "row" }}
            w="100%"
            gap={GAP_10}
            mt={20}
            wrap="wrap"
            justify="center"
          >
            {displayedPrograms.map((program) => (
              <Box
                key={program.id}
                w={{ base: "100%", md: "300px", lg: "350px", "2xl": "400px" }}
                transition="transform 0.1s ease-in-out"
                _hover={{
                  transform: "scale(1.1)",
                }}
              >
                <NewProgramCard
                  imageSrc={program.imageSrc}
                  title={program.title}
                  shortTitle={program.shortTitle}
                  price={program.price}
                  duration={program.duration}
                />
              </Box>
            ))}
          </Stack>
          {filteredPrograms.length > 3 && (
            <Button
              colorScheme="red"
              fontSize={16}
              borderRadius={5}
              mt={10}
              px={8}
              _hover={{
                bg: "white",
                color: "red.500",
                border: "1px solid red",
              }}
              onClick={handleShowMore}
            >
              Discover More
            </Button>
          )}
        </VStack>
      </Layout>
      <Footer />
    </>
  );
}
