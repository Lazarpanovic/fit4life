import { HStack, Button, Link, Text } from "@chakra-ui/react";
import {
  GAP_10,
  HEADER_HEIGHT,
  PADDING_20,
} from "../../constants/layout.constants";

export const HeaderDesktop = () => {
  return (
    <HStack
      px={PADDING_20}
      h={HEADER_HEIGHT}
      justifyContent="space-between"
      bg="rgba(255, 255, 255, 0.85)"
      filter="drop-shadow(0px 5px 32px rgba(51, 51, 51, 0.35))"
      fontFamily="montserrat"
      fontWeight={500}
    >
      <Text fontSize={20} fontWeight={600}>
        Fit4Life
      </Text>
      <HStack gap={GAP_10}>
        <HStack gap={GAP_10}>
          <Link
            _hover={{
              color: "red.500",
            }}
          >
            About Us
          </Link>
          <Link
            _hover={{
              color: "red.500",
            }}
          >
            Trainers
          </Link>
          <Link
            _hover={{
              color: "red.500",
            }}
          >
            Resources
          </Link>
          <Link
            _hover={{
              color: "red.500",
            }}
          >
            Contact
          </Link>
        </HStack>
        <Button colorScheme="red" borderRadius={20}>
          Programs
        </Button>
      </HStack>
    </HStack>
  );
};
