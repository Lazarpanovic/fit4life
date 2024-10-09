import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

export const ProgramImageView = ({
  program,
}: {
  program: {
    id: number;
    shortTitle: string;
    title: string;
    longDescription: string;
    imageSrc: string;
    price: string;
    duration: string;
    categories: {
      id: number;
      name: string;
    }[];
  };
}) => {
  return (
    <Box pos="relative" w="100%" h={500}>
      <Image
        src={program.imageSrc}
        alt={`program-${program.id}`}
        fill
        style={{
          objectFit: "cover",
        }}
      />
      <Box pos="absolute" top={0} left={0} w="100%" h="100%" bg="#00000066" />
      <Text
        fontSize={48}
        fontWeight={700}
        lineHeight={1}
        color="white"
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
      >
        {program.shortTitle}
      </Text>
    </Box>
  );
};
