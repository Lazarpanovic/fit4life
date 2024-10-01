import { Text, VStack } from "@chakra-ui/react";
import { GAP_20, PADDING_20 } from "../../constants/layout.constants";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { ContactInfoView } from "../contact/contact-info.view";

export const ContactView = () => {
  const { isMobile, isTablet } = useBreakpoints();

  return (
    <VStack
      bg="#e9ecef"
      align="center"
      w="100%"
      pb={{ base: 0, lg: PADDING_20 }}
      justify="center"
      gap={GAP_20}
      fontFamily="montserrat"
    >
      {!(isMobile || isTablet) && (
        <Text
          fontSize={{ base: 30, md: 48 }}
          fontWeight={700}
          textAlign="center"
          color="black"
          opacity={0.8}
        >
          CONTACT US
        </Text>
      )}
      <ContactInfoView />
    </VStack>
  );
};
