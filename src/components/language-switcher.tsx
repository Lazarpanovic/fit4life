import { Button, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const LanguageSwitcher = () => {
  const router = useRouter();
  const currentLocale = router.locale === "sr" ? "sr" : "en";

  const changeLanguage = (locale: "en" | "sr") => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;

    router.push(router.asPath, router.asPath, {
      locale,
      scroll: false,
    });
  };

  return (
    <HStack
      border="1px solid rgba(255,255,255,0.14)"
      borderRadius="full"
      p="4px"
      bg="rgba(255,255,255,0.06)"
      spacing={1}
    >
      <Button
        size="sm"
        h="32px"
        minW="42px"
        borderRadius="full"
        fontSize="12px"
        bg={currentLocale === "sr" ? "white" : "transparent"}
        color={currentLocale === "sr" ? "black" : "white"}
        _hover={{
          bg: currentLocale === "sr" ? "white" : "rgba(255,255,255,0.12)",
        }}
        onClick={() => changeLanguage("sr")}
      >
        SR
      </Button>

      <Button
        size="sm"
        h="32px"
        minW="42px"
        borderRadius="full"
        fontSize="12px"
        bg={currentLocale === "en" ? "white" : "transparent"}
        color={currentLocale === "en" ? "black" : "white"}
        _hover={{
          bg: currentLocale === "en" ? "white" : "rgba(255,255,255,0.12)",
        }}
        onClick={() => changeLanguage("en")}
      >
        EN
      </Button>
    </HStack>
  );
};
