import { Box, VStack } from "@chakra-ui/react";
import { ProgramsView } from "./programs.view";
import { TrainersView } from "./trainers.view";

export const ProgramsAndTrainersView = () => {
  return (
    <Box
      as="section"
      id="programs"
      position="relative"
      bg="brand.black"
      color="white"
      overflow="hidden"
      py={{ base: 20, lg: 28 }}
    >
      <Box
        position="absolute"
        inset={0}
        bg="linear-gradient(180deg, #060606 0%, #111111 42%, #060606 100%)"
      />

      <Box
        position="absolute"
        top="10%"
        left="-160px"
        w="380px"
        h="380px"
        borderRadius="full"
        bg="rgba(255,42,42,0.12)"
        filter="blur(80px)"
      />

      <Box
        position="absolute"
        bottom="8%"
        right="-160px"
        w="420px"
        h="420px"
        borderRadius="full"
        bg="rgba(255,107,0,0.09)"
        filter="blur(90px)"
      />

      <VStack
        position="relative"
        zIndex={1}
        w="100%"
        spacing={{ base: 20, lg: 28 }}
      >
        <ProgramsView />
        <TrainersView />
      </VStack>
    </Box>
  );
};
