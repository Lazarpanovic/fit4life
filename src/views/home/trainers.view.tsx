import { Badge, Box, Button, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { TrainerCard } from "../../components/home/trainer-card";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { TrainersCarousel } from "../../components/home/trainers-carousel";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useTranslation } from "../../i18n/use-translation";
import { newTrainers } from "../../data/data";

export const TrainersView = () => {
  const { isMobile, isTablet, isLargeLaptop, isDesktop } = useBreakpoints();
  const { push } = useRouter();
  const { t } = useTranslation();

  const goToTrainersPage = () => {
    push("/trainers");
  };

  const slicedTrainers =
    isMobile || isTablet || isDesktop
      ? newTrainers
      : isLargeLaptop
        ? newTrainers.slice(0, 3)
        : newTrainers.slice(0, 2);

  return (
    <VStack
      id="trainers"
      w="100%"
      spacing={{ base: 10, lg: 14 }}
      px={{ base: 5, md: 10, xl: 16, "2xl": 24 }}
    >
      <VStack spacing={5} textAlign="center" maxW="860px">
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
          {t.trainersSection.eyebrow}
        </Badge>

        <Text
          as="h2"
          fontSize={{ base: "38px", md: "58px", xl: "76px" }}
          lineHeight={0.95}
          fontWeight={900}
          letterSpacing="-0.075em"
        >
          {t.trainersSection.title}
        </Text>

        <Text
          fontSize={{ base: "16px", md: "18px" }}
          color="whiteAlpha.680"
          lineHeight={1.8}
          fontWeight={500}
        >
          {t.trainersSection.description}
        </Text>
      </VStack>

      {isMobile || isTablet ? (
        <Box w="100%">
          <TrainersCarousel />
        </Box>
      ) : (
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            xl: slicedTrainers.length >= 3 ? 3 : 2,
            "2xl": 4,
          }}
          spacing={6}
          w="100%"
        >
          {slicedTrainers.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              imageSrc={trainer.imageSrc}
              trainerKey={trainer.key}
              categories={trainer.categories}
              accent={trainer.accent}
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
        onClick={goToTrainersPage}
      >
        {t.trainersSection.cta}
      </Button>
    </VStack>
  );
};
