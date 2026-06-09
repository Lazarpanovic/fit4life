import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FaQuoteRight } from "react-icons/fa6";

export const TestimonialCard = ({
  fullName,
  title,
  description,
  imageSrc,
}: {
  fullName: string;
  title: string;
  description: string;
  imageSrc: string;
}) => {
  return (
    <VStack
      as="article"
      align="stretch"
      position="relative"
      overflow="hidden"
      minH="360px"
      borderRadius="34px"
      border="1px solid rgba(255,255,255,0.11)"
      bg="rgba(255,255,255,0.075)"
      p={{ base: 6, md: 7 }}
      _hover={{
        transform: "translateY(-6px)",
        borderColor: "rgba(255,42,42,0.45)",
        boxShadow: "0 22px 70px rgba(255,42,42,0.12)",
      }}
      transition="transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease"
    >
      <Box
        position="absolute"
        top="-80px"
        right="-80px"
        w="220px"
        h="220px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(255,42,42,0.18) 0%, rgba(255,42,42,0.08) 40%, transparent 72%)"
        pointerEvents="none"
      />

      <Icon
        as={FaQuoteRight}
        color="brand.red"
        fontSize="42px"
        position="relative"
        zIndex={1}
      />

      <Text
        position="relative"
        zIndex={1}
        color="whiteAlpha.760"
        fontSize={{ base: "16px", md: "17px" }}
        lineHeight={1.8}
        fontWeight={500}
        pt={4}
      >
        {description}
      </Text>

      <HStack position="relative" zIndex={1} spacing={4} mt="auto" pt={8}>
        <Box
          position="relative"
          w="62px"
          h="62px"
          borderRadius="full"
          overflow="hidden"
          border="2px solid rgba(255,42,42,0.7)"
        >
          <Image
            src={imageSrc}
            alt={fullName}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        <VStack align="flex-start" spacing={1}>
          <Text
            color="white"
            fontSize="18px"
            fontWeight={900}
            letterSpacing="-0.04em"
          >
            {fullName}
          </Text>

          <Text
            color="brand.red"
            fontSize="12px"
            fontWeight={900}
            textTransform="uppercase"
            letterSpacing="0.12em"
          >
            {title}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};
