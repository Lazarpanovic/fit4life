import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { GAP_10, GAP_5, HEADER_HEIGHT } from "../../constants/layout.constants";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { BlackSquareIcon } from "../../components/icons/black-square.icon";
import Image from "next/image";
import HERO_SECTION_IMAGE from "../../../public/hero-section.png";

export const HeroSectionView = () => {
  const { isMobile } = useBreakpoints();
  return (
    <Stack
      w="100%"
      h={{ base: "auto", md: `calc(100dvh - ${HEADER_HEIGHT}px)` }}
      fontFamily="montserrat"
      overflow="hidden"
      pos="relative"
      align="flex-start"
      justify={{ base: "flex-start", lg: "center" }}
    >
      <VStack
        mt={{ base: 20, lg: 0 }}
        align="flex-start"
        w={{ base: "100%", md: "50%" }}
        lineHeight={{ base: 1, md: 1.5 }}
      >
        <HStack spacing={isMobile ? GAP_5 : GAP_10}>
          <BlackSquareIcon
            color="black"
            width={isMobile ? 22 : 30}
            height={isMobile ? 22 : 30}
          />
          <BlackSquareIcon
            color="black"
            width={isMobile ? 22 : 30}
            height={isMobile ? 22 : 30}
          />
          <BlackSquareIcon
            color="black"
            width={isMobile ? 22 : 30}
            height={isMobile ? 22 : 30}
          />
        </HStack>
        <Text
          fontSize={{ base: 60, md: 100 }}
          fontWeight={900}
          ml={{ base: -0.5, md: -1 }}
          mt={{ base: 5, md: -2 }}
        >
          BE FIT
        </Text>
        <Text
          fontSize={{ base: 30, md: 40 }}
          fontWeight={700}
          mt={{ base: 5, md: -5 }}
        >
          EXPLORE ALL OUR FITNESS & SPORTS PROGRAMS TODAY
        </Text>
        <Text
          color="rgb(0, 0, 0, 0.6)"
          mt={5}
          lineHeight={1.5}
          fontSize={{ base: 16, md: 18 }}
        >
          Our programs focus on professional sports, the development of young
          athletes, and improving overall health for people of all ages. We
          promote a balanced, healthy lifestyle in both personal and business
          environments, cultivate a deep connection with nature, and strive to
          inspire well-being through regular physical activity, mindfulness, and
          holistic wellness practices.
        </Text>
        <Button
          colorScheme="red"
          fontSize={20}
          borderRadius={25}
          w={250}
          h={50}
          mt={10}
          alignSelf={{ base: "center", md: "auto" }}
        >
          PROGRAMS
        </Button>
      </VStack>
      <Image
        src={HERO_SECTION_IMAGE}
        alt="hero-section"
        width={700}
        style={{
          position: isMobile ? "relative" : "absolute",
          top: isMobile ? 40 : 50,
          right: 0,
        }}
      />
    </Stack>
  );
};
