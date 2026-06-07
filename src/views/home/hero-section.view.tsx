import {
  Badge,
  Box,
  Button,
  Grid,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { motion, type Transition } from "framer-motion";
import { useRouter } from "next/router";
import HERO_SECTION_IMAGE from "../../../public/hero-section.jpg";
import { useTranslation } from "../../i18n/use-translation";

const MotionBox = motion.div;

const badgeTransition: Transition = { duration: 0.45 };
const titleTransition: Transition = { duration: 0.55, delay: 0.08 };
const descriptionTransition: Transition = { duration: 0.55, delay: 0.16 };
const buttonsTransition: Transition = { duration: 0.55, delay: 0.24 };

export const HeroSectionView = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const goToPrograms = () => {
    router.push("/programs");
  };

  const goToContact = () => {
    router.push("/contact");
  };

  return (
    <Box
      as="section"
      position="relative"
      minH={{ base: "calc(100dvh - 72px)", lg: "calc(100dvh - 82px)" }}
      overflow="hidden"
      bg="brand.black"
      color="white"
      className="premium-noise"
    >
      <Box position="absolute" inset={0}>
        <Image
          src={HERO_SECTION_IMAGE}
          alt="Fit4Life premium fitness club"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        <Box
          position="absolute"
          inset={0}
          bg={{
            base: "linear-gradient(180deg, rgba(6,6,6,0.76), rgba(6,6,6,0.96) 78%)",
            lg: "linear-gradient(90deg, rgba(6,6,6,0.98) 0%, rgba(6,6,6,0.82) 42%, rgba(6,6,6,0.36) 100%)",
          }}
        />

        <Box
          position="absolute"
          inset={0}
          bg="radial-gradient(circle at 28% 28%, rgba(255,42,42,0.22), transparent 34%)"
        />
      </Box>

      <Stack
        position="relative"
        zIndex={1}
        minH={{ base: "calc(100dvh - 72px)", lg: "calc(100dvh - 82px)" }}
        justify="center"
        px={{ base: 5, md: 10, xl: 16, "2xl": 24 }}
        py={{ base: 14, lg: 20 }}
      >
        <VStack
          align="flex-start"
          maxW={{ base: "100%", lg: "760px", "2xl": "860px" }}
          spacing={{ base: 7, lg: 8 }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={badgeTransition}
          >
            <Badge
              px={4}
              py={2}
              borderRadius="full"
              bg="rgba(255,255,255,0.08)"
              color="white"
              border="1px solid rgba(255,255,255,0.14)"
              fontSize={{ base: "11px", md: "12px" }}
              letterSpacing="0.18em"
              textTransform="uppercase"
            >
              {t.hero.eyebrow}
            </Badge>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={titleTransition}
          >
            <Text
              as="h1"
              fontSize={{
                base: "44px",
                sm: "54px",
                md: "82px",
                lg: "92px",
                xl: "102px",
                "2xl": "112px",
              }}
              lineHeight={{ base: 1.02, md: 0.98, xl: 0.94 }}
              fontWeight={900}
              letterSpacing={{
                base: "-0.045em",
                md: "-0.065em",
                xl: "-0.075em",
              }}
              maxW={{ base: "100%", lg: "820px", xl: "900px" }}
              py={2}
            >
              {t.hero.titleLine1}
              <br />
              <Text
                as="span"
                display="inline-block"
                bgGradient="linear(to-r, white, brand.red)"
                bgClip="text"
                pr="0.08em"
                pb="0.04em"
              >
                {t.hero.titleLine2}
              </Text>
              <br />
              {t.hero.titleLine3}
            </Text>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={descriptionTransition}
          >
            <Text
              maxW="660px"
              fontSize={{ base: "16px", md: "19px" }}
              lineHeight={1.8}
              color="whiteAlpha.700"
              fontWeight={500}
            >
              {t.hero.description}
            </Text>
          </MotionBox>

          <Box w={{ base: "100%", sm: "auto" }}>
            <MotionBox
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={buttonsTransition}
            >
              <HStack
                spacing={4}
                flexDirection={{ base: "column", sm: "row" }}
                align={{ base: "stretch", sm: "center" }}
                w={{ base: "100%", sm: "auto" }}
              >
                <Button
                  h="58px"
                  px={9}
                  borderRadius="full"
                  bg="brand.red"
                  color="white"
                  boxShadow="0 0 44px rgba(255,42,42,0.36)"
                  _hover={{
                    bg: "white",
                    color: "black",
                    transform: "translateY(-2px)",
                    boxShadow: "0 0 52px rgba(255,255,255,0.22)",
                  }}
                  transition="all 0.2s ease"
                  onClick={goToPrograms}
                >
                  {t.hero.primaryCta}
                </Button>

                <Button
                  h="58px"
                  px={9}
                  borderRadius="full"
                  variant="outline"
                  borderColor="rgba(255,255,255,0.22)"
                  color="white"
                  bg="rgba(255,255,255,0.04)"
                  _hover={{
                    bg: "rgba(255,255,255,0.12)",
                    borderColor: "rgba(255,255,255,0.42)",
                  }}
                  onClick={goToContact}
                >
                  {t.hero.secondaryCta}
                </Button>
              </HStack>
            </MotionBox>
          </Box>

          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
            gap={3}
            w={{ base: "100%", lg: "760px" }}
            pt={{ base: 3, lg: 6 }}
          >
            <HeroStat value="4+" label={t.hero.stats.programs} />
            <HeroStat value="6" label={t.hero.stats.services} />
            <HeroStat value="1:1" label={t.hero.stats.coaching} />
            <HeroStat value="BG" label={t.hero.stats.location} />
          </Grid>
        </VStack>
      </Stack>

      <Box
        display={{ base: "none", lg: "block" }}
        position="absolute"
        right="6%"
        bottom="7%"
        zIndex={2}
        w="220px"
        h="220px"
        borderRadius="full"
        border="1px solid rgba(255,255,255,0.14)"
        bg="rgba(255,255,255,0.05)"
        backdropFilter="blur(18px)"
        boxShadow="0 0 80px rgba(255,42,42,0.18)"
      >
        <VStack h="100%" justify="center" spacing={1}>
          <Text fontSize="54px" fontWeight={900} letterSpacing="-0.08em">
            FIT
          </Text>
          <Text color="brand.red" fontSize="13px" fontWeight={900}>
            PERFORMANCE CLUB
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

const HeroStat = ({ value, label }: { value: string; label: string }) => {
  return (
    <VStack
      align="flex-start"
      justify="space-between"
      minH="108px"
      p={{ base: 4, md: 5 }}
      borderRadius="24px"
      border="1px solid rgba(255,255,255,0.12)"
      bg="rgba(255,255,255,0.055)"
      backdropFilter="blur(14px)"
    >
      <Text
        fontSize={{ base: "24px", md: "32px" }}
        fontWeight={900}
        letterSpacing="-0.06em"
      >
        {value}
      </Text>
      <Text color="whiteAlpha.700" fontSize="13px" fontWeight={700}>
        {label}
      </Text>
    </VStack>
  );
};
