import { Box, Button, Stack, Text, VStack } from "@chakra-ui/react";
import {
  GAP_10,
  GAP_20,
  GAP_5,
  PADDING_10,
  PADDING_20,
} from "../../constants/layout.constants";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { ServicesCarousel } from "../../components/home/services-carousel";
import { Services } from "../../components/home/services";
import { scrollToPrograms } from "../../utils/navigation.utils";

export const AboutUsView = () => {
  const { isMobile, isTablet } = useBreakpoints();
  return (
    <VStack
      w="100%"
      bg="#e9ecef"
      px={isMobile ? PADDING_10 : PADDING_20}
      py={PADDING_20}
      textAlign="center"
      justify="center"
      gap={{ base: GAP_10, lg: GAP_20 }}
      id="about-us"
    >
      <Text
        fontSize={{ base: 30, md: 50 }}
        fontWeight={700}
        color="black"
        opacity={0.8}
      >
        FIT4Life
      </Text>
      {isMobile || isTablet ? <ServicesCarousel /> : <Services />}
      <Stack
        direction={isMobile ? "column" : "row"}
        gap={{ base: GAP_20, lg: 0 }}
        mt={{ base: 10, lg: 0 }}
      >
        <VStack gap={{ base: 0, lg: GAP_5 }}>
          <VStack>
            <Box bg="red.500" width={50} height={1} borderRadius={2} />
          </VStack>
          <Text
            color="rgb(0, 0, 0, 0.6)"
            lineHeight={1.5}
            fontSize={{ base: 16, md: 18 }}
            w={{ base: "100%", lg: "80%" }}
            mt={{ base: 2, lg: 0 }}
          >
            We are a premier fitness organization located in the heart of
            Vračar, Belgrade, dedicated to enhancing physical and mental
            well-being. Our state-of-the-art facility is open daily, offering a
            wide range of services, from professional sports training to
            wellness programs for all ages. Visit us to experience a balanced
            approach to fitness, combining physical activity, mindfulness, and
            holistic health practices.
          </Text>
        </VStack>
        <VStack gap={{ base: 0, lg: GAP_5 }}>
          <Box bg="red.500" width={50} height={1} borderRadius={2} />
          <Text
            color="rgb(0, 0, 0, 0.6)"
            lineHeight={1.5}
            fontSize={{ base: 16, md: 18 }}
            w={{ base: "100%", lg: "80%" }}
            mt={{ base: 2, lg: 0 }}
          >
            Our fitness center offers a diverse range of programs tailored for
            people of all ages and fitness levels. We are committed to enhancing
            both physical and mental health while educating our members about
            the importance of exercise, nutrition, and overall well-being. Our
            goal is to empower individuals to lead healthier lives through
            informed choices and personalized support.
          </Text>
        </VStack>
        <VStack gap={{ base: 0, lg: GAP_5 }}>
          <Box bg="red.500" width={50} height={1} borderRadius={2} />
          <Text
            color="rgb(0, 0, 0, 0.6)"
            lineHeight={1.5}
            fontSize={{ base: 16, md: 18 }}
            w={{ base: "100%", lg: "80%" }}
            mt={{ base: 2, lg: 0 }}
          >
            Our team of highly qualified trainers and staff are leading experts
            in their fields, available daily to support our program
            participants. Over the years, we have helped countless individuals
            achieve remarkable success in their fitness and wellness journeys.
            Our dedication to excellence and personalized attention has earned
            us a strong reputation among satisfied clients.
          </Text>
        </VStack>
      </Stack>
      <Button
        colorScheme="red"
        fontSize={20}
        borderRadius={25}
        w={250}
        h={50}
        onClick={scrollToPrograms}
      >
        JOIN US
      </Button>
    </VStack>
  );
};
