import { Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { RiFolderChartLine } from "react-icons/ri";
import { CheckIcon } from "@chakra-ui/icons";
import { GrPieChart } from "react-icons/gr";
import { GiProgression } from "react-icons/gi";
import { useRouter } from "next/router";
import { GAP_5 } from "../../constants/layout.constants";

export const PricingPlanCard = ({
  plan,
  program,
}: {
  plan: { id: number; type: string; price: string; items: string[] };
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
  const { push } = useRouter();
  const navigateToForm = () => {
    push(
      {
        pathname: `/programs/${program.id}`,
        query: { pricing_plan: plan.type },
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
      fontFamily="montserrat"
      px={10}
      py={10}
      borderRadius={5}
      boxShadow={{ base: "0px 4px 10px rgba(0, 0, 0, 0.3)" }}
      h="100%"
      justify="space-between"
    >
      <VStack gap={5}>
        <Icon
          color="red.400"
          fontSize={60}
          as={
            plan.id === 0
              ? GrPieChart
              : plan.id === 1
                ? RiFolderChartLine
                : GiProgression
          }
        />
        <Text
          fontSize={{ base: 20, lg: 20 }}
          fontWeight={700}
          textAlign="center"
          color="#1A202C"
          opacity={0.8}
        >
          {plan.type}
        </Text>
        <Text
          fontSize={{ base: 40, lg: 50 }}
          fontWeight={700}
          textAlign="center"
          color="#1A202C"
          opacity={0.9}
        >
          ${plan.price}
        </Text>
        {plan.items.map((item) => (
          <HStack
            key={plan.id}
            align="flex-start"
            w="100%"
            alignItems="center"
            gap={GAP_5}
          >
            <CheckIcon />
            <Text opacity={0.7} textAlign="left">
              {item}
            </Text>
          </HStack>
        ))}
      </VStack>
      <Button
        mt={10}
        colorScheme="red"
        fontSize={{ base: 14, lg: 16 }}
        borderRadius={25}
        border="1px solid #C73131"
        _hover={{
          bg: "white",
          color: "red.500",
          border: "1px solid #C73131",
        }}
        justifySelf="flex-end"
        onClick={navigateToForm}
      >
        GET STARTED
      </Button>
    </VStack>
  );
};
