import { Badge, Box, Button, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { ProgramCard } from "../../components/home/program-card";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { ProgramsCarousel } from "../../components/home/programs-carousel";
import { useRouter } from "next/router";
import { useTranslation } from "../../i18n/use-translation";
import { newPrograms } from "../../data/data";

export const ProgramsView = () => {
  const { isMobile, isTablet, isLargeLaptop, isDesktop } = useBreakpoints();
  const { push } = useRouter();
  const { t } = useTranslation();

  const goToProgramsPage = () => {
    push("/programs");
  };

  const slicedPrograms =
    isMobile || isTablet || isDesktop
      ? newPrograms
      : isLargeLaptop
        ? newPrograms.slice(0, 3)
        : newPrograms.slice(0, 2);

  return (
    <VStack
      w="100%"
      spacing={{ base: 10, lg: 14 }}
      px={{ base: 5, md: 10, xl: 16, "2xl": 24 }}
    >
      <VStack spacing={5} textAlign="center" maxW="850px">
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
          {t.programsSection.eyebrow}
        </Badge>

        <Text
          as="h2"
          fontSize={{ base: "38px", md: "58px", xl: "76px" }}
          lineHeight={0.95}
          fontWeight={900}
          letterSpacing="-0.075em"
        >
          {t.programsSection.title}
        </Text>

        <Text
          fontSize={{ base: "16px", md: "18px" }}
          color="whiteAlpha.680"
          lineHeight={1.8}
          fontWeight={500}
        >
          {t.programsSection.description}
        </Text>
      </VStack>

      {isMobile || isTablet ? (
        <Box w="100%">
          <ProgramsCarousel />
        </Box>
      ) : (
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            xl: slicedPrograms.length >= 3 ? 3 : 2,
            "2xl": 4,
          }}
          spacing={6}
          w="100%"
        >
          {slicedPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              id={program.id}
              imageSrc={program.imageSrc}
              programKey={program.key}
              price={program.price}
              categories={program.categories}
            />
          ))}
        </SimpleGrid>
      )}

      <Button
        h="56px"
        px={8}
        borderRadius="full"
        rightIcon={<ArrowForwardIcon />}
        bg="white"
        color="black"
        _hover={{
          bg: "brand.red",
          color: "white",
          transform: "translateY(-2px)",
          boxShadow: "0 0 36px rgba(255,42,42,0.3)",
        }}
        transition="all 0.2s ease"
        onClick={goToProgramsPage}
      >
        {t.programsSection.cta}
      </Button>
    </VStack>
  );
};
