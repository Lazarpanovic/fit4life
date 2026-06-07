import {
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "../../i18n/use-translation";

export const ContactFormView = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <VStack w="100%" spacing={8}>
      <Text
        fontSize={{ base: "34px", lg: "56px" }}
        lineHeight={0.95}
        fontWeight={900}
        letterSpacing="-0.075em"
        textAlign="center"
        color="white"
      >
        {t.contactSection.formTitle}
      </Text>

      <FormControl
        as="form"
        action={`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`}
        method="POST"
        display="flex"
        flexDirection="column"
        alignItems="center"
        w="100%"
      >
        <HStack
          w={{ base: "100%", lg: "90%", xl: "80%", "2xl": "65%" }}
          wrap="wrap"
          spacing={0}
          gap={5}
        >
          <PremiumInput
            isRequired
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder={t.contactSection.fields.firstName}
          />

          <PremiumInput
            isRequired
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder={t.contactSection.fields.lastName}
          />

          <PremiumInput
            isRequired
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            placeholder={t.contactSection.fields.email}
          />

          <PremiumInput
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder={t.contactSection.fields.phone}
          />

          <Textarea
            isRequired
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder={t.contactSection.fields.message}
            w="100%"
            minH="230px"
            resize="vertical"
            bg="rgba(255,255,255,0.055)"
            color="white"
            border="1px solid rgba(255,255,255,0.12)"
            borderRadius="22px"
            px={5}
            py={5}
            _placeholder={{ color: "whiteAlpha.460" }}
            _hover={{ borderColor: "rgba(255,255,255,0.22)" }}
            _focus={{
              borderColor: "brand.red",
              boxShadow: "0 0 0 1px rgba(255,42,42,0.5)",
            }}
          />
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
          transition="all 0.2s ease"
        >
          {t.contactSection.submit}
        </Button>
      </FormControl>
    </VStack>
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
