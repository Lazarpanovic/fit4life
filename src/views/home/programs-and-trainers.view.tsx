import { VStack } from "@chakra-ui/react";
import { ProgramsView } from "./programs.view";
import { TrainersView } from "./trainers.view";
import { PADDING_20 } from "../../constants/layout.constants";

export const ProgramsAndTrainersView = () => {
  return (
    <VStack
      w="100%"
      bg="linear-gradient(-5deg, #E9ECEF 30%, #000000DE 0%)"
      gap={20}
      fontFamily="montserrat"
      id="programs"
      py={PADDING_20}
    >
      <ProgramsView />
      <TrainersView />
    </VStack>
  );
};
