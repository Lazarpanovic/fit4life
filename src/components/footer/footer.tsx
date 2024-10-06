import { Stack, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { GAP_10, GAP_5, PADDING_20 } from "../../constants/layout.constants";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";

export const Footer = () => {
  return (
    <VStack
      w="100%"
      justify="center"
      bg="#000000DE"
      py={{ base: PADDING_20, lg: PADDING_20 }}
      gap={{ base: GAP_10, lg: GAP_10 }}
      fontFamily="montserrat"
    >
      <Text color="white" fontSize={36}>
        FIT4Life
      </Text>
      <Stack
        align="center"
        direction={{ base: "column", md: "row" }}
        gap={{ base: GAP_5, md: GAP_10 }}
      >
        <Link
          _hover={{
            color: "red.500",
          }}
          color="white"
          fontSize={18}
          fontWeight={500}
          href="/"
        >
          Home
        </Link>
        <Link
          _hover={{
            color: "red.500",
          }}
          color="white"
          fontSize={18}
          fontWeight={500}
          href="/programs"
        >
          Programs
        </Link>
        <Link
          _hover={{
            color: "red.500",
          }}
          color="white"
          fontSize={18}
          fontWeight={500}
          href="/trainers"
        >
          Trainers
        </Link>
        <Link
          _hover={{
            color: "red.500",
          }}
          color="white"
          fontSize={18}
          fontWeight={500}
          href="/resources"
        >
          Resources
        </Link>
        <Link
          _hover={{
            color: "red.500",
          }}
          color="white"
          fontSize={18}
          fontWeight={500}
          href="/contact"
        >
          Contact
        </Link>
      </Stack>
      <Stack
        direction={{ base: "row", md: "row" }}
        gap={{ base: GAP_5, md: GAP_10 }}
      >
        <Icon
          fontSize={36}
          color="white"
          _hover={{ color: "red.500" }}
          as={CiFacebook}
        />
        <Icon
          fontSize={36}
          color="white"
          _hover={{ color: "red.500" }}
          as={CiInstagram}
        />
        <Icon
          fontSize={36}
          color="white"
          _hover={{ color: "red.500" }}
          as={CiLinkedin}
        />
        <Icon
          fontSize={36}
          color="white"
          _hover={{ color: "red.500" }}
          as={CiTwitter}
        />
      </Stack>
      <Text color="white" w="70%" textAlign="center">
        © 2024 All rights reserved{" "}
        <Text as="span" color="red.500">
          Fit4Life Belgrade
        </Text>
      </Text>
    </VStack>
  );
};
