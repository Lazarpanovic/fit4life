import { Icon, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import {
  GAP_10,
  GAP_20,
  GAP_5,
  PADDING_20,
} from "../../constants/layout.constants";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { FaFacebook, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import {
  FaInstagramSquare,
  FaLinkedin,
  FaPhoneSquare,
  FaTwitterSquare,
} from "react-icons/fa";
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
        >
          CONTACT US
        </Text>
      )}
      <ContactInfoView />
    </VStack>
  );
};
