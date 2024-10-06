import { Icon, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";
import { GAP_10, GAP_5 } from "../../constants/layout.constants";
import { FaFacebook, FaLinkedin, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import {
  FaInstagramSquare,
  FaPhoneSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { useMemo } from "react";
import dynamic from "next/dynamic";

export const ContactInfoView = () => {
  const { isMobile, isTablet } = useBreakpoints();
  const MapDesktop = useMemo(
    () =>
      dynamic(() => import("../../components/contact/map-desktop"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  const MapMobile = useMemo(
    () =>
      dynamic(() => import("../../components/contact/map-mobile"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );
  return (
    <Stack
      direction={{ base: "column-reverse", lg: "row" }}
      w={{ base: "100%", lg: "90%" }}
      border={{ base: "none", lg: "1px solid #ced4da" }}
      bg={{ base: "transparent", lg: "#FFFFFF40" }}
      boxShadow={{ base: "none", lg: "0px 2px 6px rgba(0, 0, 0, 0.3)" }}
      borderRadius={{ base: 0, lg: 5 }}
      gap={GAP_10}
      overflow="hidden"
    >
      {isMobile || isTablet ? <MapMobile /> : <MapDesktop />}
      <VStack
        w={{ base: "100%", lg: "55%" }}
        p={{ base: 5, lg: 20 }}
        align={{ base: "center", lg: "flex-start" }}
        gap={GAP_10}
        textAlign={{ base: "center", lg: "left" }}
      >
        <Text fontSize={{ base: 30, lg: 32 }} fontWeight={700}>
          GET IN TOUCH
        </Text>
        <Text opacity={0.8}>
          Have questions, suggestions, or need more information about our
          services? Whether you are looking to kickstart your fitness journey or
          just want to chat, we are here for you. Drop us a message, and we will
          get back to you as soon as possible!
        </Text>
        <StackDivider w="100%" h="1px" bg="#ced4da" />
        <Stack direction={{ base: "column", md: "row" }} align="center">
          <FaLocationDot fontSize={28} />
          <Text>Belgrade, Bulevar Kralja Aleksandra 200</Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          align="center"
          onClick={() =>
            (window.location.href = "mailto:info@fit4lifebelgrade.com")
          }
        >
          <MdEmail fontSize={28} />
          <Text>info@fit4lifebelgrade.com</Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          align="center"
          onClick={() => (window.location.href = "tel:+38166200300")}
        >
          <FaPhoneSquare fontSize={28} />
          <Text>066/200-300</Text>
        </Stack>
        <Stack
          alignSelf="center"
          direction={{ base: "row", md: "row" }}
          gap={{ base: GAP_5, md: GAP_10 }}
        >
          <Icon fontSize={36} cursor="pointer" as={FaFacebook} />
          <Icon fontSize={36} cursor="pointer" as={FaInstagramSquare} />
          <Icon fontSize={36} cursor="pointer" as={FaLinkedin} />
          <Icon fontSize={36} cursor="pointer" as={FaTwitterSquare} />
        </Stack>
      </VStack>
    </Stack>
  );
};
