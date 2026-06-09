import { Badge, Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { PricingPlanCard } from "../../../components/programs/pricing-plan-card";
import { PricingPlanKey, ProgramKey } from "../../../data/data";
import { useTranslation } from "../../../i18n/use-translation";

export const PricingPlanView = ({
  program,
  pricingPlans,
}: {
  program: {
    id: number;
    key: ProgramKey;
    imageSrc: string;
    price: string;
    duration: string;
    categories: {
      id: number;
      key: string;
    }[];
  };
  pricingPlans: {
    id: number;
    key: PricingPlanKey;
    price: string;
  }[];
}) => {
  const { t } = useTranslation();

  return (
    <Box
      as="section"
      position="relative"
      bg="brand.black"
      color="white"
      px={{ base: 5, md: 10, xl: 16, "2xl": 24 }}
      py={{ base: 20, lg: 28 }}
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-160px"
        left="-140px"
        w="440px"
        h="440px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(255,42,42,0.17) 0%, rgba(255,42,42,0.07) 42%, transparent 72%)"
        pointerEvents="none"
      />

      <VStack position="relative" zIndex={1} spacing={{ base: 10, lg: 14 }}>
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
            {t.programDetailsPage.pricingEyebrow}
          </Badge>

          <Text
            as="h2"
            fontSize={{ base: "38px", md: "58px", xl: "76px" }}
            lineHeight={0.95}
            fontWeight={900}
            letterSpacing="-0.075em"
          >
            {t.programDetailsPage.pricingTitle}
          </Text>

          <Text
            fontSize={{ base: "16px", md: "18px" }}
            color="whiteAlpha.680"
            lineHeight={1.8}
            fontWeight={500}
          >
            {t.programDetailsPage.pricingDescription}
          </Text>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 3 }}
          spacing={6}
          w="100%"
          pt={{ base: 0, xl: 6 }}
        >
          {pricingPlans.map((plan) => (
            <PricingPlanCard
              key={plan.id}
              plan={plan}
              programKey={program.key}
              programId={program.id}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};
