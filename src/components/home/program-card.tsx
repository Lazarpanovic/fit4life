import { Text, VStack } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import ATHLETE_IMAGE from "../../../public/athlete.png";
import YOUNG_ATHLETE_IMAGE from "../../../public/young-athlete.png";
import BUSINESS_PERSONS_IMAGE from "../../../public/business-person.png";
import HIKING_PERSONS_IMAGE from "../../../public/hiking-person.png";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";

// programs data
export const programs = [
  {
    title: "PROFESSIONAL SPORT",
    price: "$200/MONTH",
    imageSrc: ATHLETE_IMAGE,
    imageWidth: 200,
  },
  {
    title: "ATHLETES DEVELOPMENT",
    price: "$200/MONTH",
    imageSrc: YOUNG_ATHLETE_IMAGE,
    imageWidth: 200,
  },
  {
    title: "HEALTHY IN BUSINESS",
    price: "$200/MONTH",
    imageSrc: BUSINESS_PERSONS_IMAGE,
    imageWidth: 220,
  },
  {
    title: "LIFE WITH NATURE",
    price: "$200/MONTH",
    imageSrc: HIKING_PERSONS_IMAGE,
    imageWidth: 200,
  },
];

export const ProgramCard = ({
  title,
  price,
  imageSrc,
  imageWidth,
}: {
  title: string;
  price: string;
  imageSrc: StaticImageData;
  imageWidth: number;
}) => {
  const { isMobile, isTablet, isLaptop, isLargeLaptop } = useBreakpoints();
  return (
    <VStack
      w={{ base: "80%", lg: "30%", xl: "25%", "2xl": "20%" }}
      fontWeight={500}
      h="300px"
      bg="linear-gradient(110deg, #E9ECEF 60%, #E53E3E 10%)"
      borderRadius={10}
      opacity={0.8}
      _hover={{ opacity: 1 }}
      align="start"
      justify="center"
      pl={2}
      pos="relative"
      overflow="hidden"
      mx={{ base: "auto", lg: 0 }}
    >
      <Text
        fontWeight={700}
        fontSize={{ base: 18, lg: 24 }}
        w={{ base: "60%", lg: "65%" }}
      >
        {title}
      </Text>
      <Text fontSize={{ base: 14, lg: 16 }} opacity={0.8}>
        FROM: {price}
      </Text>
      <Image
        src={imageSrc}
        alt={title}
        width={imageWidth}
        style={{
          position: "absolute",
          top: 0,
          right:
            title === "HEALTHY IN BUSINESS"
              ? -90
              : isMobile || isTablet || isLaptop || isLargeLaptop
                ? -70
                : -50,
        }}
      />
    </VStack>
  );
};
