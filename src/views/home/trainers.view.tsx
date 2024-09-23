import { GAP_20 } from "../../constants/layout.constants";
import { Button, HStack, Text } from "@chakra-ui/react";
import { TrainerCard, trainers } from "../../components/home/trainer-card";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { TrainersCarousel } from "../../components/home/trainers-carousel";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export const TrainersView = () => {
  const { isMobile, isTablet, isLargeLaptop, isDesktop } = useBreakpoints();
  const slicedTrainers =
    isMobile || isTablet || isDesktop
      ? trainers
      : isLargeLaptop
      ? trainers.slice(0, 3)
      : trainers.slice(0, 2);
  return (
    <>
      <Text
        mt={10}
        fontSize={{ base: 30, md: 50 }}
        fontWeight={700}
        color="white"
        opacity={0.7}
        id="trainers"
        textAlign="center"
      >
        MEET OUR TRAINERS
      </Text>
      {isMobile || isTablet ? (
        <TrainersCarousel />
      ) : (
        <HStack gap={GAP_20}>
          {slicedTrainers.map((trainer, index) => (
            <TrainerCard
              key={index}
              name={trainer.name}
              specialty={trainer.specialty}
              imageSrc={trainer.imageSrc}
              imageWidth={trainer.imageWidth}
              imageWidthMobile={trainer.imageWidthMobile}
              marginTop={trainer.marginTop}
            />
          ))}
        </HStack>
      )}
      <Button
        colorScheme="red"
        fontSize={20}
        borderRadius={25}
        w={250}
        h={50}
        rightIcon={<ArrowForwardIcon />}
      >
        ALL TRAINERS
      </Button>
    </>
  );
};
