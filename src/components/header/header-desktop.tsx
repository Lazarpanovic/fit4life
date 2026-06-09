import { Button, HStack, Link, Text } from "@chakra-ui/react";
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

export const HeaderDesktop = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const goToProgramsPage = () => {
    router.push("/programs");
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return router.pathname === "/";
    }

    return router.pathname.startsWith(href);
  };

  return (
    <HStack
      as="header"
      position="sticky"
      top={0}
      zIndex={20}
      h="82px"
      px={{ base: 10, xl: 16, "2xl": 24 }}
      justifyContent="space-between"
      bg="rgba(6, 6, 6, 0.88)"
      backdropFilter="blur(8px)"
      borderBottom="1px solid rgba(255,255,255,0.08)"
      color="white"
      fontFamily="montserrat"
    >
      <HStack spacing={3}>
        <Text
          fontSize="26px"
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

        <Text
          display={{ base: "none", xl: "block" }}
          fontSize="12px"
          color="whiteAlpha.600"
          fontWeight={700}
          textTransform="uppercase"
          letterSpacing="0.16em"
          borderLeft="1px solid rgba(255,255,255,0.14)"
          pl={4}
        >
          Belgrade performance club
        </Text>
      </HStack>

      <HStack spacing={8}>
        <HStack spacing={6}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              fontSize="14px"
              fontWeight={800}
              color={isActive(item.href) ? "white" : "whiteAlpha.700"}
              position="relative"
              _hover={{ color: "white", textDecoration: "none" }}
              _after={{
                content: '""',
                position: "absolute",
                left: 0,
                bottom: "-10px",
                w: isActive(item.href) ? "100%" : "0%",
                h: "2px",
                borderRadius: "full",
                bg: "brand.red",
                transition: "width 0.2s ease",
              }}
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </HStack>

        <LanguageSwitcher />

        <Button
          onClick={goToProgramsPage}
          h="46px"
          px={7}
          borderRadius="full"
          bg="brand.red"
          color="white"
          boxShadow="0 0 32px rgba(255, 42, 42, 0.34)"
          _hover={{
            bg: "white",
            color: "black",
            transform: "translateY(-1px)",
            boxShadow: "0 0 42px rgba(255, 255, 255, 0.22)",
          }}
          _active={{ transform: "translateY(0)" }}
          transition="background 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease"
        >
          {t.nav.cta}
        </Button>
      </HStack>
    </HStack>
  );
};
