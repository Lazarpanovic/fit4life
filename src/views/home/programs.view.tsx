import { Button, HStack, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { ProgramCard, programs } from "../../components/home/program-card";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { ProgramsCarousel } from "../../components/home/programs-carousel";
import { GAP_20 } from "../../constants/layout.constants";

export const ProgramsView = () => {
  const { isMobile, isTablet, isLargeLaptop, isDesktop } = useBreakpoints();
  const slicedPrograms =
    isMobile || isTablet || isDesktop
      ? programs
      : isLargeLaptop
      ? programs.slice(0, 3)
      : programs.slice(0, 2);
  return (
    <>
      <Text
        mt={20}
        fontSize={{ base: 30, md: 50 }}
        fontWeight={700}
        color="white"
        opacity={0.7}
        textAlign="center"
      >
        EXPLORE OUR PROGRAMS
      </Text>
      {isMobile || isTablet ? (
        <ProgramsCarousel />
      ) : (
        <HStack w="100%" justify="center" gap={GAP_20}>
          {slicedPrograms.map((program, index) => (
            <ProgramCard
              key={index}
              title={program.title}
              price={program.price}
              imageSrc={program.imageSrc}
              imageWidth={program.imageWidth}
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
        ALL PROGRAMS
      </Button>
    </>
  );
};
