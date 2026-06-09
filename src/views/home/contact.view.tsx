import { Badge, Box, Text, VStack } from "@chakra-ui/react";
import { ContactInfoView } from "../contact/contact-info.view";
import { useTranslation } from "../../i18n/use-translation";

export const ContactView = () => {
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
        right="-160px"
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
            {t.contactSection.eyebrow}
          </Badge>

          <Text
            as="h2"
            fontSize={{ base: "38px", md: "58px", xl: "76px" }}
            lineHeight={0.95}
            fontWeight={900}
            letterSpacing="-0.075em"
          >
            {t.contactSection.title}
          </Text>

          <Text
            fontSize={{ base: "16px", md: "18px" }}
            color="whiteAlpha.680"
            lineHeight={1.8}
            fontWeight={500}
          >
            {t.contactSection.description}
          </Text>
        </VStack>

        <ContactInfoView />
      </VStack>
    </Box>
  );
};
