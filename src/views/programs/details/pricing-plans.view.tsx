import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import {
  GAP_10,
  GAP_20,
  PADDING_20,
} from "../../../constants/layout.constants";
import { pricingPlans } from "../../../data/data";
import { PricingPlanCard } from "../../../components/programs/pricing-plan-card";
import { useBreakpoints } from "../../../hooks/use-breakpoints.hook";

export const PricingPlanView = ({
  program,
}: {
  program: {
    id: number;
    shortTitle: string;
    title: string;
    longDescription: string;
    imageSrc: string;
    price: string;
    duration: string;
    categories: {
      id: number;
      name: string;
    }[];
  };
}) => {
  const { isMobile } = useBreakpoints();
  return (
    <VStack mt={10} padding={isMobile ? 10 : PADDING_20} gap={GAP_10}>
      <Text
        fontSize={{ base: 16, lg: 20 }}
        fontWeight={500}
        opacity={0.6}
        w={{ base: "100%", lg: "60%" }}
        textAlign="center"
      >
        {program.longDescription}
      </Text>
      <Text
        fontSize={{ base: 30, lg: 48 }}
        fontWeight={700}
        textAlign="center"
        color="#1A202C"
        mt={10}
        opacity={0.9}
      >
        PRICING
      </Text>
      <HStack
        direction={{ base: "column", md: "row" }}
        w="100%"
        gap={GAP_20}
        mt={10}
        wrap="wrap"
        justify="center"
        alignItems="stretch"
      >
        {pricingPlans.map((plan) => (
          <Box
            key={plan.id}
            w={{ base: "100%", md: "300px", lg: "350px", "2xl": "360px" }}
            transition="transform 0.1s ease-in-out"
            _hover={{
              transform: "scale(1.1)",
            }}
          >
            <PricingPlanCard plan={plan} program={program} />
          </Box>
        ))}
      </HStack>
    </VStack>
  );
};
