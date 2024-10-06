import { Button, HStack, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { ProgramCard, programs } from "../../components/home/program-card";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { ProgramsCarousel } from "../../components/home/programs-carousel";
import { GAP_20 } from "../../constants/layout.constants";
import { useRouter } from "next/router";

export const ProgramsView = () => {
  const { isMobile, isTablet, isLargeLaptop, isDesktop } = useBreakpoints();
  const { push } = useRouter();
  const goToProgramsPage = () => {
    push("/programs");
  };
  const slicedPrograms =
    isMobile || isTablet || isDesktop
      ? programs
      : isLargeLaptop
      ? programs.slice(0, 3)
      : programs.slice(0, 2);
  return (
    <>
      <Text
        fontSize={{ base: 30, md: 48 }}
        fontWeight={700}
        color="white"
        opacity={0.7}
        textAlign="center"
      >
        CHOOSE YOUR PROGRAM
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
        fontSize={{ base: 16, lg: 20 }}
        borderRadius={25}
        w={{ base: 200, lg: 250 }}
        h={50}
        rightIcon={<ArrowForwardIcon />}
        border="1px solid #C73131"
        _hover={{
          bg: "white",
          color: "red.500",
          border: "1px solid #C73131",
        }}
        onClick={goToProgramsPage}
      >
        ALL PROGRAMS
      </Button>
    </>
  );
};
