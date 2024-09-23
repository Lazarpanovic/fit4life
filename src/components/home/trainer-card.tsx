import { Text, VStack } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import TRAINER_1_IMAGE from "../../../public/trainer.png";
import TRAINER_2_IMAGE from "../../../public/trainer-2.png";
import TRAINER_3_IMAGE from "../../../public/trainer-3.png";
import TRAINER_4_IMAGE from "../../../public/trainer-4.png";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";

// trainers data
export const trainers = [
  {
    name: "JOHN ANDERSON",
    specialty: "STRENGTH & CONDITION",
    imageSrc: TRAINER_1_IMAGE,
    imageWidth: 300,
    imageWidthMobile: 240,
    marginTop: -0.5,
  },
  {
    name: "RACHEL ADAMS",
    specialty: "FITNESS",
    imageSrc: TRAINER_4_IMAGE,
    imageWidth: 213,
    imageWidthMobile: 170,
    marginTop: -0.5,
  },
  {
    name: "CHRISTOPHER PARKER",
    specialty: "ATHLETIC",
    imageSrc: TRAINER_3_IMAGE,
    imageWidth: 195,
    imageWidthMobile: 150,
    marginTop: -0.5,
  },
  {
    name: "DAVID MITCHELL",
    specialty: "BODYBUILDING",
    imageSrc: TRAINER_2_IMAGE,
    imageWidth: 256,
    imageWidthMobile: 200,
    marginTop: -0.5,
  },
];

export const TrainerCard = ({
  name,
  specialty,
  imageSrc,
  imageWidth,
  imageWidthMobile,
  marginTop,
}: {
  name: string;
  specialty: string;
  imageSrc: StaticImageData;
  imageWidth?: number;
  imageWidthMobile?: number;
  marginTop?: number;
}) => {
  const { isMobile, isTablet } = useBreakpoints();
  return (
    <VStack gap={0} justify="center">
      <Image
        src={imageSrc}
        alt={name}
        width={isMobile || isTablet ? imageWidthMobile : imageWidth}
      />
      <VStack
        w={{ base: "70%", lg: 300 }}
        h={150}
        bg="#000000DE"
        mt={marginTop ?? -0.5}
        justify="center"
        fontWeight={700}
        fontSize={18}
      >
        <Text color="white" opacity={0.7}>
          {name}
        </Text>
        <Text color="red.500" opacity={0.7}>
          {specialty}
        </Text>
      </VStack>
    </VStack>
  );
};
