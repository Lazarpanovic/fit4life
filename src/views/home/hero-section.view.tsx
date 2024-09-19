import { Box, Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import {
  GAP_10,
  GAP_5,
  HEADER_HEIGHT,
  PADDING_10,
  PADDING_20,
} from "../../constants/layout.constants";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { BlackSquareIcon } from "../../components/icons/black-square.icon";
import Image from "next/image";
import HERO_SECTION_IMAGE from "../../../public/hero-section.jpg";

export const HeroSectionView = () => {
  const { isMobile, isTablet } = useBreakpoints();
  return (
    <Stack
      w="100%"
      minH={{ base: "auto", md: `calc(100dvh - ${HEADER_HEIGHT}px)` }}
      fontFamily="montserrat"
      overflow="hidden"
      pos="relative"
      align="flex-start"
      mt={{ base: 20, lg: 0 }}
      justify={{ base: "flex-start", lg: "center" }}
    >
      <VStack
        align="flex-start"
        w={{ base: "100%", lg: "50%" }}
        lineHeight={{ base: 1, md: 1.5 }}
        pl={{ base: PADDING_10, lg: PADDING_20 }}
        pr={{ base: PADDING_10, lg: 0 }}
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
          alignSelf={{ base: "center", lg: "auto" }}
        >
          PROGRAMS
        </Button>
      </VStack>
      <Box
        mt={{ base: 10, lg: 0 }}
        pos={{ base: "relative", lg: "absolute" }}
        right={0}
        w={{ base: "100%", lg: "48%" }}
        h={{ base: "300px", lg: "100%" }}
        style={{
          clipPath:
            isMobile || isTablet
              ? "none"
              : "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      >
        <Image
          src={HERO_SECTION_IMAGE}
          alt="hero-section"
          fill
          objectFit="cover"
        />
      </Box>
    </Stack>
  );
};
