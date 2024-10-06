import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button, HStack, Link, Text, VStack } from "@chakra-ui/react";
import {
  GAP_10,
  HEADER_HEIGHT,
  PADDING_10,
  PADDING_20,
} from "../../constants/layout.constants";
import { useState } from "react";
import { useRouter } from "next/router";

export const HeaderMobile = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { push } = useRouter();
  const toggleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleNav = () => {
    push("/programs");
  };
  return (
    <>
      <HStack
        px={PADDING_10}
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
        {openMenu ? (
          <CloseIcon fontSize={16} onClick={toggleOpenMenu} />
        ) : (
          <HamburgerIcon fontSize={24} onClick={toggleOpenMenu} />
        )}
      </HStack>
      {openMenu && (
        <VStack
          gap={GAP_10}
          w="100%"
          bg="white"
          py={PADDING_20}
          boxShadow="0px 4px 10px 0px rgba(51, 51, 51, 0.2)"
          zIndex={1}
          pos="absolute"
        >
          <Link
            fontSize={20}
            _hover={{
              color: "red.500",
            }}
            href="/"
          >
            Home
          </Link>
          <Link
            fontSize={20}
            _hover={{
              color: "red.500",
            }}
            href="/trainers"
          >
            Trainers
          </Link>
          <Link
            fontSize={20}
            _hover={{
              color: "red.500",
            }}
            href="/resources"
          >
            Resources
          </Link>
          <Link
            fontSize={20}
            _hover={{
              color: "red.500",
            }}
            href="/contact"
          >
            Contact
          </Link>
          <Button
            colorScheme="red"
            borderRadius={20}
            onClick={() => handleNav()}
            border="1px solid #C73131"
            fontSize={20}
            _hover={{
              bg: "white",
              color: "red.500",
              border: "1px solid #C73131",
            }}
          >
            Programs
          </Button>
        </VStack>
      )}
    </>
  );
};
