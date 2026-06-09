import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { LanguageSwitcher } from "../language-switcher";
import { useTranslation } from "../../i18n/use-translation";

const navItems = [
  { href: "/", key: "home" },
  { href: "/programs", key: "programs" },
  { href: "/trainers", key: "trainers" },
  { href: "/resources", key: "resources" },
  { href: "/contact", key: "contact" },
] as const;

export const HeaderMobile = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const toggleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const goToPrograms = () => {
    setOpenMenu(false);
    router.push("/programs");
  };

  return (
    <>
      <HStack
        as="header"
        position="sticky"
        top={0}
        zIndex={30}
        px={5}
        h="72px"
        justifyContent="space-between"
        bg="rgba(6, 6, 6, 0.9)"
        backdropFilter="blur(6px)"
        borderBottom="1px solid rgba(255,255,255,0.08)"
        color="white"
        fontFamily="montserrat"
      >
        <Text
          fontSize="20px"
          fontWeight={900}
          letterSpacing="-0.04em"
          lineHeight={1}
        >
          FIT
          <Text as="span" color="brand.red">
            4
          </Text>
          LIFE
        </Text>

        <HStack spacing={3}>
          <LanguageSwitcher />

          <Box
            as="button"
            w="42px"
            h="42px"
            display="grid"
            placeItems="center"
            borderRadius="full"
            border="1px solid rgba(255,255,255,0.12)"
            bg="rgba(255,255,255,0.06)"
            onClick={toggleOpenMenu}
          >
            {openMenu ? (
              <CloseIcon fontSize={13} />
            ) : (
              <HamburgerIcon fontSize={22} />
            )}
          </Box>
        </HStack>
      </HStack>

      {openMenu && (
        <VStack
          position="fixed"
          inset={0}
          top="72px"
          zIndex={25}
          align="stretch"
          bg="rgba(6, 6, 6, 0.97)"
          color="white"
          px={6}
          py={10}
          spacing={8}
          className="premium-noise"
        >
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpenMenu(false)}
              fontSize="34px"
              fontWeight={900}
              lineHeight={1}
              letterSpacing="-0.05em"
              color="white"
              _hover={{ color: "brand.red", textDecoration: "none" }}
            >
              <Text as="span" color="brand.red" fontSize="15px" mr={3}>
                0{index + 1}
              </Text>
              {t.nav[item.key]}
            </Link>
          ))}

          <Button
            mt={4}
            h="56px"
            borderRadius="full"
            bg="brand.red"
            color="white"
            boxShadow="0 0 32px rgba(255, 42, 42, 0.34)"
            _hover={{ bg: "white", color: "black" }}
            onClick={goToPrograms}
          >
            {t.nav.cta}
          </Button>
        </VStack>
      )}
    </>
  );
};
