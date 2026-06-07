import { CheckIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { GrPieChart } from "react-icons/gr";
import { RiFolderChartLine } from "react-icons/ri";
import { GiProgression } from "react-icons/gi";
import { useRouter } from "next/router";
import { PricingPlanKey, ProgramKey } from "../../data/data";
import { useTranslation } from "../../i18n/use-translation";

export const PricingPlanCard = ({
  plan,
  programKey,
  programId,
}: {
  plan: {
    id: number;
    key: PricingPlanKey;
    price: string;
  };
  programKey: ProgramKey;
  programId: number;
}) => {
  const { push } = useRouter();
  const { t } = useTranslation();

  const translatedPlan = t.programDetailsPage.plans[plan.key];
  const isFeatured = plan.id === 1;

  const navigateToForm = () => {
    push(
      {
        pathname: `/programs/${programId}`,
        query: { pricing_plan: plan.key },
      },
      undefined,
      { shallow: true },
    );

    const formElement = document.getElementById("form");

    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <VStack
      role="group"
      position="relative"
      overflow="hidden"
      align="stretch"
      justify="space-between"
      minH="560px"
      p={{ base: 6, lg: 8 }}
      borderRadius="34px"
      bg={isFeatured ? "rgba(255,42,42,0.075)" : "rgba(255,255,255,0.055)"}
      border={
        isFeatured
          ? "1px solid rgba(255,42,42,0.58)"
          : "1px solid rgba(255,255,255,0.11)"
      }
      backdropFilter="blur(18px)"
      boxShadow={isFeatured ? "0 26px 90px rgba(255,42,42,0.14)" : "none"}
      transform={isFeatured ? "translateY(-14px)" : "none"}
      _hover={{
        transform: isFeatured ? "translateY(-20px)" : "translateY(-8px)",
        borderColor: "rgba(255,42,42,0.58)",
        boxShadow: "0 26px 80px rgba(255,42,42,0.16)",
      }}
      transition="all 0.25s ease"
    >
      <Box
        position="absolute"
        top="-100px"
        right="-100px"
        w="260px"
        h="260px"
        borderRadius="full"
        bg="rgba(255,42,42,0.12)"
        filter="blur(56px)"
      />
      {isFeatured && (
        <Box
          position="absolute"
          top={6}
          right={6}
          zIndex={2}
          px={4}
          py={2}
          borderRadius="full"
          bg="rgba(255,42,42,0.16)"
          color="brand.red"
          border="1px solid rgba(255,42,42,0.38)"
          fontSize="11px"
          fontWeight={900}
          letterSpacing="0.14em"
          textTransform="uppercase"
        >
          {t.programDetailsPage.mostPopular}
        </Box>
      )}

      <VStack align="flex-start" spacing={7} position="relative" zIndex={1}>
        <Box
          w="72px"
          h="72px"
          display="grid"
          placeItems="center"
          borderRadius="24px"
          bg="rgba(255,42,42,0.12)"
          border="1px solid rgba(255,42,42,0.28)"
          color="brand.red"
        >
          <Icon
            fontSize="34px"
            as={
              plan.id === 0
                ? GrPieChart
                : plan.id === 1
                  ? RiFolderChartLine
                  : GiProgression
            }
          />
        </Box>

        <VStack align="flex-start" spacing={2}>
          <Text
            color="white"
            fontSize={{ base: "30px", lg: "36px" }}
            lineHeight={1}
            fontWeight={900}
            letterSpacing="-0.06em"
          >
            {translatedPlan.type}
          </Text>

          <Text color="whiteAlpha.560" fontWeight={700}>
            {t.programsPage.programs[programKey].shortTitle}
          </Text>
        </VStack>

        <HStack align="flex-end" spacing={2}>
          <Text
            color="white"
            fontSize={{ base: "50px", lg: "62px" }}
            lineHeight={0.9}
            fontWeight={900}
            letterSpacing="-0.075em"
          >
            ${plan.price}
          </Text>

          <Text
            color="whiteAlpha.620"
            fontSize={{ base: "14px", lg: "16px" }}
            lineHeight={1.2}
            fontWeight={900}
            mb={{ base: "8px", lg: "10px" }}
          >
            /{t.programDetailsPage.perMonth}
          </Text>
        </HStack>

        <VStack align="stretch" spacing={4} w="100%">
          {translatedPlan.items.map((item) => (
            <HStack key={item} align="flex-start" spacing={3}>
              <Box
                w="22px"
                h="22px"
                minW="22px"
                display="grid"
                placeItems="center"
                borderRadius="full"
                bg="rgba(255,42,42,0.14)"
                color="brand.red"
                mt="2px"
              >
                <CheckIcon fontSize="10px" />
              </Box>

              <Text color="whiteAlpha.720" lineHeight={1.6} fontWeight={500}>
                {item}
              </Text>
            </HStack>
          ))}
        </VStack>
      </VStack>

      <Button
        h="56px"
        mt={8}
        borderRadius="full"
        bg="white"
        color="black"
        boxShadow="none"
        _hover={{
          bg: "brand.red",
          color: "white",
          transform: "translateY(-2px)",
          boxShadow: "0 0 36px rgba(255,42,42,0.28)",
        }}
        transition="all 0.2s ease"
        onClick={navigateToForm}
      >
        {t.programDetailsPage.choosePlan}
      </Button>
    </VStack>
  );
};
