import {
  Badge,
  Box,
  Button,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { ServicesCarousel } from "../../components/home/services-carousel";
import { Services } from "../../components/home/services";
import { useTranslation } from "../../i18n/use-translation";
import { useRouter } from "next/router";

export const AboutUsView = () => {
  const { isMobile, isTablet } = useBreakpoints();
  const { t } = useTranslation();
  const router = useRouter();

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
        top="-180px"
        right="-120px"
        w="420px"
        h="420px"
        borderRadius="full"
        bg="rgba(255,42,42,0.14)"
        filter="blur(80px)"
      />

      <Stack
        direction={{ base: "column", lg: "row" }}
        spacing={{ base: 12, lg: 16 }}
        align="flex-start"
        position="relative"
        zIndex={1}
      >
        <VStack align="flex-start" spacing={6} flex={1}>
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
            {t.about.eyebrow}
          </Badge>

          <Text
            as="h2"
            fontSize={{ base: "38px", md: "56px", xl: "72px" }}
            lineHeight={0.95}
            fontWeight={900}
            letterSpacing="-0.07em"
            maxW="760px"
          >
            {t.about.title}
          </Text>

          <Text
            fontSize={{ base: "16px", md: "18px" }}
            lineHeight={1.8}
            color="whiteAlpha.700"
            maxW="680px"
            fontWeight={500}
          >
            {t.about.description}
          </Text>

          <Button
            h="56px"
            px={8}
            borderRadius="full"
            bg="brand.red"
            color="white"
            boxShadow="0 0 36px rgba(255,42,42,0.28)"
            _hover={{
              bg: "white",
              color: "black",
              transform: "translateY(-2px)",
            }}
            transition="all 0.2s ease"
            onClick={() => router.push("/programs")}
          >
            {t.about.cta}
          </Button>
        </VStack>

        <VStack flex={1} spacing={4} w="100%">
          {t.about.cards.map((card) => (
            <HStack
              key={card.value}
              w="100%"
              align="flex-start"
              spacing={5}
              p={{ base: 5, md: 7 }}
              borderRadius="28px"
              bg="rgba(255,255,255,0.055)"
              border="1px solid rgba(255,255,255,0.1)"
              backdropFilter="blur(16px)"
              _hover={{
                borderColor: "rgba(255,42,42,0.5)",
                transform: "translateY(-3px)",
                bg: "rgba(255,42,42,0.08)",
              }}
              transition="all 0.2s ease"
            >
              <Text
                minW="52px"
                fontSize="20px"
                fontWeight={900}
                color="brand.red"
              >
                {card.value}
              </Text>

              <VStack align="flex-start" spacing={2}>
                <Text fontSize={{ base: "20px", md: "24px" }} fontWeight={900}>
                  {card.title}
                </Text>
                <Text color="whiteAlpha.680" lineHeight={1.7} fontWeight={500}>
                  {card.description}
                </Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </Stack>

      <Box mt={{ base: 14, lg: 20 }} position="relative" zIndex={1}>
        {isMobile || isTablet ? <ServicesCarousel /> : <Services />}
      </Box>
    </Box>
  );
};
