import { Box, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
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
import { useTranslation } from "../../i18n/use-translation";

export const ContactInfoView = () => {
  const { isMobile, isTablet } = useBreakpoints();
  const { t } = useTranslation();

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
      w="100%"
      maxW="1280px"
      border="1px solid rgba(255,255,255,0.11)"
      bg="rgba(255,255,255,0.075)"
      borderRadius={{ base: "30px", lg: "38px" }}
      overflow="hidden"
      boxShadow="0 30px 100px rgba(0,0,0,0.34)"
    >
      <Box
        w={{ base: "100%", lg: "48%" }}
        h={{ base: "320px", lg: "auto" }}
        overflow="hidden"
        sx={{
          ".leaflet-container": {
            filter: "saturate(1.08) contrast(1.02) brightness(0.96)",
          },
        }}
      >
        {isMobile || isTablet ? <MapMobile /> : <MapDesktop />}
      </Box>

      <VStack
        w={{ base: "100%", lg: "52%" }}
        p={{ base: 6, md: 10, lg: 14 }}
        align="flex-start"
        justify="center"
        spacing={7}
        textAlign="left"
      >
        <VStack align="flex-start" spacing={4}>
          <Text
            fontSize={{ base: "32px", lg: "48px" }}
            lineHeight={0.95}
            fontWeight={900}
            letterSpacing="-0.07em"
          >
            {t.contactSection.infoTitle}
          </Text>

          <Text
            color="whiteAlpha.680"
            lineHeight={1.8}
            fontSize={{ base: "15px", md: "17px" }}
            fontWeight={500}
          >
            {t.contactSection.infoDescription}
          </Text>
        </VStack>

        <VStack align="stretch" w="100%" spacing={4}>
          <ContactRow icon={FaLocationDot} label={t.contactSection.location} />

          <ContactRow
            icon={MdEmail}
            label={t.contactSection.email}
            onClick={() =>
              (window.location.href = `mailto:${t.contactSection.email}`)
            }
          />

          <ContactRow
            icon={FaPhoneSquare}
            label={t.contactSection.phone}
            onClick={() => (window.location.href = "tel:+38166200300")}
          />
        </VStack>

        <HStack spacing={3} pt={2} w="100%" justifyContent="center">
          <SocialIcon icon={FaFacebook} />
          <SocialIcon icon={FaInstagramSquare} />
          <SocialIcon icon={FaLinkedin} />
          <SocialIcon icon={FaTwitterSquare} />
        </HStack>
      </VStack>
    </Stack>
  );
};

const ContactRow = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}) => {
  return (
    <HStack
      spacing={4}
      p={4}
      borderRadius="20px"
      bg="rgba(255,255,255,0.055)"
      border="1px solid rgba(255,255,255,0.09)"
      cursor={onClick ? "pointer" : "default"}
      onClick={onClick}
      _hover={{
        bg: onClick ? "rgba(255,42,42,0.1)" : "rgba(255,255,255,0.055)",
        borderColor: onClick
          ? "rgba(255,42,42,0.38)"
          : "rgba(255,255,255,0.09)",
      }}
      transition="background 0.2s ease, border-color 0.2s ease"
    >
      <Box
        w="44px"
        h="44px"
        minW="44px"
        display="grid"
        placeItems="center"
        borderRadius="full"
        bg="rgba(255,42,42,0.12)"
        color="brand.red"
      >
        <Icon as={icon} fontSize="21px" />
      </Box>

      <Text color="whiteAlpha.820" fontWeight={700} fontSize="14px">
        {label}
      </Text>
    </HStack>
  );
};

const SocialIcon = ({ icon }: { icon: React.ElementType }) => {
  return (
    <Box
      w="44px"
      h="44px"
      display="grid"
      placeItems="center"
      borderRadius="full"
      bg="rgba(255,255,255,0.07)"
      border="1px solid rgba(255,255,255,0.11)"
      color="white"
      cursor="pointer"
      _hover={{
        bg: "brand.red",
        borderColor: "brand.red",
        transform: "translateY(-2px)",
      }}
      transition="background 0.2s ease, border-color 0.2s ease, transform 0.2s ease"
    >
      <Icon as={icon} fontSize="18px" />
    </Box>
  );
};
