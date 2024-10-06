import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FaLinkedin, FaFacebook, FaInstagramSquare } from "react-icons/fa";

export const NewTrainerCard = ({
  imageSrc,
  name,
  specialty,
  description,
}: {
  imageSrc: string;
  name: string;
  specialty: string;
  description: string;
}) => {
  return (
    <VStack
      align="flex-start"
      w="100%"
      h="100%"
      borderRadius={5}
      overflow="hidden"
      border="1px solid #ced4da"
      bg="#FFFFFF40"
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
      pos="relative"
      fontFamily="montserrat"
    >
      <Box
        pos="relative"
        h={{ base: "250px", lg: "200px", "2xl": "300px" }}
        w="100%"
        overflow="hidden"
        bg="#e9ecef"
      >
        <Image
          src={imageSrc}
          alt={imageSrc}
          fill
          style={{
            objectFit: "contain",
          }}
        />
      </Box>
      <VStack textAlign="left" gap={4} padding={6} align="flex-start">
        <Text color="black" opacity={0.7} fontWeight={500}>
          {name}
        </Text>
        <Text color="black" fontWeight={700} opacity={0.7}>
          {specialty}
        </Text>
        <HStack gap={4}>
          <Icon
            fontSize={30}
            color="red.500"
            _hover={{ color: "red.500" }}
            opacity={0.9}
            as={FaFacebook}
          />
          <Icon
            fontSize={30}
            color="red.500"
            _hover={{ color: "red.500" }}
            opacity={0.9}
            as={FaInstagramSquare}
          />
          <Icon
            fontSize={30}
            color="red.500"
            _hover={{ color: "red.500" }}
            opacity={0.9}
            as={FaLinkedin}
          />
        </HStack>
        <Text color="black" opacity={0.7}>
          {description}
        </Text>
      </VStack>
    </VStack>
  );
};
