import {
  Box,
  Button,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { useTranslation } from "../../i18n/use-translation";
import { LanguageSwitcher } from "../language-switcher";
import { useRouter } from "next/router";

const navItems = [
  { href: "/", key: "home" },
  { href: "/programs", key: "programs" },
  { href: "/trainers", key: "trainers" },
  { href: "/resources", key: "resources" },
  { href: "/contact", key: "contact" },
] as const;

export const Footer = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Box
      as="footer"
      position="relative"
      overflow="hidden"
      bg="brand.black"
      color="white"
      px={{ base: 5, md: 10, xl: 16, "2xl": 24 }}
      py={{ base: 12, lg: 16 }}
      borderTop="1px solid rgba(255,255,255,0.08)"
    >
      <Box
        position="absolute"
        bottom="-180px"
        left="50%"
        transform="translateX(-50%)"
        w="520px"
        h="260px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(255,42,42,0.18) 0%, rgba(255,42,42,0.08) 35%, transparent 70%)"
        pointerEvents="none"
      />

      <VStack position="relative" zIndex={1} spacing={10}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          align={{ base: "flex-start", lg: "center" }}
          w="100%"
          spacing={8}
        >
          <VStack align="flex-start" spacing={4} maxW="460px">
            <Text
              fontSize={{ base: "34px", md: "46px" }}
              fontWeight={900}
              letterSpacing="-0.075em"
              lineHeight={0.9}
            >
              FIT
              <Text as="span" color="brand.red">
                4
              </Text>
              LIFE
            </Text>

            <Text color="whiteAlpha.620" lineHeight={1.7} fontWeight={500}>
              {t.footer.tagline}
            </Text>
          </VStack>

          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 5, md: 8 }}
            align={{ base: "flex-start", md: "center" }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                color="whiteAlpha.720"
                fontWeight={800}
                fontSize="14px"
                _hover={{ color: "white", textDecoration: "none" }}
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </Stack>

          <VStack align={{ base: "flex-start", lg: "flex-end" }} spacing={4}>
            <LanguageSwitcher />

            <HStack spacing={3}>
              <SocialIcon icon={FaFacebook} />
              <SocialIcon icon={FaInstagram} />
              <SocialIcon icon={FaLinkedinIn} />
              <SocialIcon icon={FaTwitter} />
            </HStack>
          </VStack>
        </Stack>

        <HStack
          w="100%"
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          flexDirection={{ base: "column", md: "row" }}
          pt={8}
          borderTop="1px solid rgba(255,255,255,0.08)"
          spacing={4}
        >
          <Text color="whiteAlpha.520" fontSize="14px" fontWeight={600}>
            © 2026 Fit4Life Belgrade. {t.footer.rights}.
          </Text>

          <Button
            size="sm"
            borderRadius="full"
            bg="rgba(255,255,255,0.07)"
            color="white"
            border="1px solid rgba(255,255,255,0.1)"
            _hover={{ bg: "brand.red", borderColor: "brand.red" }}
            onClick={() => router.push("/programs")}
          >
            {t.nav.cta}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

const SocialIcon = ({ icon }: { icon: React.ElementType }) => {
  return (
    <Box
      w="42px"
      h="42px"
      display="grid"
      placeItems="center"
      borderRadius="full"
      bg="rgba(255,255,255,0.07)"
      border="1px solid rgba(255,255,255,0.11)"
      color="white"
      cursor="pointer"
      _hover={{
        bg: "brand.red",
        borderColor: "brand.red",
        transform: "translateY(-2px)",
      }}
      transition="background 0.2s ease, border-color 0.2s ease, transform 0.2s ease"
    >
      <Icon as={icon} fontSize="17px" />
    </Box>
  );
};
