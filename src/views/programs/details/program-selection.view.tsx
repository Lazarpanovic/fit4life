import {
  Badge,
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PricingPlanKey, ProgramKey } from "../../../data/data";
import { useTranslation } from "../../../i18n/use-translation";

export const ProgramSelectionView = ({
  programKey,
  pricingPlans,
}: {
  programKey: ProgramKey;
  pricingPlans: {
    id: number;
    key: PricingPlanKey;
    price: string;
  }[];
}) => {
  const { query } = useRouter();
  const { t } = useTranslation();

  const translatedProgram = t.programsPage.programs[programKey];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    program: translatedProgram.shortTitle,
    pricingPlan: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      program: translatedProgram.shortTitle,
    }));
  }, [translatedProgram.shortTitle]);

  useEffect(() => {
    if (query.pricing_plan) {
      setFormData((prevData) => ({
        ...prevData,
        pricingPlan: query.pricing_plan as string,
      }));
    }
  }, [query.pricing_plan]);

  return (
    <Box
      as="section"
      id="form"
      position="relative"
      bg="brand.black"
      color="white"
      px={{ base: 5, md: 10, xl: 16, "2xl": 24 }}
      pb={{ base: 20, lg: 28 }}
      overflow="hidden"
    >
      <Box
        position="absolute"
        bottom="-180px"
        right="-140px"
        w="460px"
        h="460px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(255,107,0,0.14) 0%, rgba(255,107,0,0.06) 42%, transparent 72%)"
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
            {t.programDetailsPage.formEyebrow}
          </Badge>

          <Text
            as="h2"
            fontSize={{ base: "38px", md: "58px", xl: "76px" }}
            lineHeight={0.95}
            fontWeight={900}
            letterSpacing="-0.075em"
          >
            {t.programDetailsPage.formTitle}
          </Text>

          <Text
            fontSize={{ base: "16px", md: "18px" }}
            color="whiteAlpha.680"
            lineHeight={1.8}
            fontWeight={500}
          >
            {t.programDetailsPage.formDescription}
          </Text>
        </VStack>

        <Box
          w="100%"
          maxW="980px"
          p={{ base: 5, md: 8, lg: 10 }}
          borderRadius="34px"
          bg="rgba(255,255,255,0.075)"
          border="1px solid rgba(255,255,255,0.11)"
        >
          <FormControl
            as="form"
            action={`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`}
            method="POST"
            display="flex"
            flexDirection="column"
            alignItems="center"
            w="100%"
          >
            <HStack w="100%" wrap="wrap" spacing={0} gap={5}>
              <PremiumInput
                isRequired
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder={t.programDetailsPage.fields.firstName}
              />

              <PremiumInput
                isRequired
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder={t.programDetailsPage.fields.lastName}
              />

              <PremiumInput
                isRequired
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                placeholder={t.programDetailsPage.fields.email}
              />

              <PremiumInput
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={t.programDetailsPage.fields.phone}
              />

              <Select
                isReadOnly
                name="program"
                value={formData.program}
                w={{ base: "100%", lg: "calc(50% - 10px)" }}
                h="58px"
                bg="rgba(255,255,255,0.055)"
                color="white"
                border="1px solid rgba(255,255,255,0.12)"
                borderRadius="full"
                _hover={{ borderColor: "rgba(255,255,255,0.22)" }}
                _focus={{
                  borderColor: "brand.red",
                  boxShadow: "0 0 0 1px rgba(255,42,42,0.5)",
                }}
              >
                <option value={translatedProgram.shortTitle}>
                  {translatedProgram.shortTitle}
                </option>
              </Select>

              <Select
                isRequired
                name="pricingPlan"
                value={formData.pricingPlan}
                onChange={handleInputChange}
                placeholder={t.programDetailsPage.labels.pricingPlan}
                w={{ base: "100%", lg: "calc(50% - 10px)" }}
                h="58px"
                bg="rgba(255,255,255,0.055)"
                color="white"
                border="1px solid rgba(255,255,255,0.12)"
                borderRadius="full"
                _placeholder={{ color: "whiteAlpha.460" }}
                _hover={{ borderColor: "rgba(255,255,255,0.22)" }}
                _focus={{
                  borderColor: "brand.red",
                  boxShadow: "0 0 0 1px rgba(255,42,42,0.5)",
                }}
                sx={{
                  option: {
                    bg: "#111111",
                    color: "white",
                  },
                }}
              >
                {pricingPlans.map((plan) => (
                  <option key={plan.id} value={plan.key}>
                    {t.programDetailsPage.plans[plan.key].type} - ${plan.price}
                  </option>
                ))}
              </Select>
            </HStack>

            <Button
              type="submit"
              h="56px"
              px={9}
              borderRadius="full"
              mt={8}
              bg="brand.red"
              color="white"
              boxShadow="0 0 36px rgba(255,42,42,0.28)"
              _hover={{
                bg: "white",
                color: "black",
                transform: "translateY(-2px)",
              }}
              transition="background 0.2s ease, color 0.2s ease, transform 0.2s ease"
            >
              {t.programDetailsPage.submit}
            </Button>
          </FormControl>
        </Box>
      </VStack>
    </Box>
  );
};

const PremiumInput = ({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  isRequired,
}: {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  isRequired?: boolean;
}) => {
  return (
    <Input
      isRequired={isRequired}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      w={{ base: "100%", lg: "calc(50% - 10px)" }}
      h="58px"
      bg="rgba(255,255,255,0.055)"
      color="white"
      border="1px solid rgba(255,255,255,0.12)"
      borderRadius="full"
      px={5}
      _placeholder={{ color: "whiteAlpha.460" }}
      _hover={{ borderColor: "rgba(255,255,255,0.22)" }}
      _focus={{
        borderColor: "brand.red",
        boxShadow: "0 0 0 1px rgba(255,42,42,0.5)",
      }}
    />
  );
};
