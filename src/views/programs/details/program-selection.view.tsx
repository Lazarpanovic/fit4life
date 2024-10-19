import {
  Button,
  FormControl,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GAP_10 } from "../../../constants/layout.constants";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const ProgramSelectionView = ({
  programTitle,
  pricingPlans,
}: {
  programTitle: string;
  pricingPlans: {
    id: number;
    type: string;
    price: string;
    items: string[];
  }[];
}) => {
  const { query } = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    program: programTitle,
    pricingPlan: query.pricing_plan ?? "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (query.pricing_plan) {
      setFormData((prevData) => ({
        ...prevData,
        pricingPlan: query.pricing_plan as string,
      }));
    }
  }, [query.pricing_plan]);

  return (
    <VStack w="100%" gap={GAP_10} mb={20} px={{ base: 5, lg: 0 }}>
      <Text
        fontSize={{ base: 30, lg: 48 }}
        fontWeight={700}
        textAlign="center"
        color="#1A202C"
        mt={10}
        opacity={0.9}
      >
        GET STARTED TODAY
      </Text>
      <Text
        fontSize={{ base: 16, lg: 20 }}
        fontWeight={500}
        opacity={0.6}
        w={{ base: "100%", lg: "60%" }}
        textAlign="center"
      >
        You are one step away from transforming your fitness journey! Simply
        fill out the form below with your details, and we will take care of the
        rest. Your selected program and pricing plan are already set just hit
        submit, and we will reach out to confirm everything. Let us get started
        on your path to a healthier and fitter you!
      </Text>
      <FormControl
        as="form"
        action="https://formspree.io/f/mnnqqegr"
        method="POST"
        display="flex"
        flexDirection="column"
        alignItems="center"
        w="100%"
        id="form"
      >
        <HStack
          w={{ base: "80%", lg: "90%", xl: "80%", "2xl": "65%" }}
          wrap="wrap"
          gap={GAP_10}
        >
          <Input
            isRequired
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            bg="gray.50"
            placeholder="First name *"
            w={{ base: "100%", lg: "47%", xl: "48%" }}
            h="50px"
          />
          <Input
            isRequired
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            bg="gray.50"
            placeholder="Last name *"
            w={{ base: "100%", lg: "47%", xl: "48%" }}
            h="50px"
          />
          <Input
            isRequired
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            bg="gray.50"
            placeholder="Email *"
            w={{ base: "100%", lg: "47%", xl: "48%" }}
            h="50px"
          />
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            bg="gray.50"
            placeholder="Phone"
            w={{ base: "100%", lg: "47%", xl: "48%" }}
            h="50px"
          />
          <Select
            isReadOnly
            name="program"
            bg="gray.50"
            placeholder={programTitle}
            w={{ base: "100%", lg: "47%", xl: "48%" }}
            h="50px"
            value={programTitle}
          >
            <option value={programTitle}>{programTitle}</option>
          </Select>
          <Select
            isRequired
            name="pricingPlan"
            bg="gray.50"
            placeholder="Pricing plan *"
            w={{ base: "100%", lg: "47%", xl: "48%" }}
            h="50px"
            value={formData.pricingPlan}
            onChange={handleInputChange}
          >
            {pricingPlans.map((plan) => (
              <option key={plan.id} value={plan.type}>
                {plan.type}
              </option>
            ))}
          </Select>
        </HStack>
        <Button
          type="submit"
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
        >
          SUBMIT
        </Button>
      </FormControl>
    </VStack>
  );
};
