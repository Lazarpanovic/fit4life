import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button, HStack, Link, Text, VStack } from "@chakra-ui/react";
import {
  GAP_10,
  HEADER_HEIGHT,
  PADDING_10,
  PADDING_20,
} from "../../constants/layout.constants";
import { useState } from "react";

export const HeaderMobile = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleNav = (section: string) => {
    const programsSection = document.getElementById(section);
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: "smooth" });
    }
    setOpenMenu(false);
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
            _hover={{
              color: "red.500",
            }}
            onClick={() => handleNav("about-us")}
          >
            About Us
          </Link>
          <Link
            _hover={{
              color: "red.500",
            }}
            onClick={() => handleNav("trainers")}
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
          <Button
            colorScheme="red"
            borderRadius={20}
            onClick={() => handleNav("programs")}
          >
            Programs
          </Button>
        </VStack>
      )}
    </>
  );
};
