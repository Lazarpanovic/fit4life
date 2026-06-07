import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Badge, Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { ProgramCategoryKey, TrainerKey } from "../../data/data";
import { useTranslation } from "../../i18n/use-translation";

export const NewTrainerCard = ({
  imageSrc,
  trainerKey,
  categories,
  accent,
}: {
  imageSrc: string;
  trainerKey: TrainerKey;
  categories: { id: number; key: string }[];
  accent: string;
}) => {
  const { t } = useTranslation();
  const trainer = t.trainersPage.trainers[trainerKey];

  return (
    <VStack
      as="article"
      role="group"
      position="relative"
      align="stretch"
      justify="space-between"
      w="100%"
      h="100%"
      minH={{ base: "590px", lg: "640px" }}
      borderRadius="34px"
      overflow="hidden"
      border="1px solid rgba(255,255,255,0.11)"
      bg="rgba(255,255,255,0.055)"
      backdropFilter="blur(18px)"
      cursor="pointer"
      _hover={{
        transform: "translateY(-8px)",
        borderColor: "rgba(255,42,42,0.58)",
        boxShadow: "0 26px 80px rgba(255,42,42,0.16)",
      }}
      transition="all 0.25s ease"
    >
      <Box
        position="absolute"
        inset={0}
        bg="radial-gradient(circle at 50% 18%, rgba(255,42,42,0.2), transparent 38%)"
      />

      <Box position="absolute" top={5} left={5} zIndex={3}>
        <Badge
          px={4}
          py={2}
          borderRadius="full"
          bg="rgba(255,42,42,0.12)"
          color="brand.red"
          border="1px solid rgba(255,42,42,0.28)"
          fontSize="11px"
          letterSpacing="0.14em"
          textTransform="uppercase"
        >
          {accent}
        </Badge>
      </Box>

      <Box
        position="relative"
        h={{ base: "345px", lg: "380px" }}
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
        overflow="hidden"
        bg="linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))"
      >
        <Box
          position="absolute"
          bottom="-80px"
          w="300px"
          h="300px"
          borderRadius="full"
          bg="rgba(255,42,42,0.17)"
          filter="blur(52px)"
        />

        <Box
          position="relative"
          zIndex={2}
          w="100%"
          h="100%"
          transition="all 0.35s ease"
          _groupHover={{
            transform: "scale(1.055) translateY(-8px)",
          }}
        >
          <Image
            src={imageSrc}
            alt={trainer.name}
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center bottom",
              filter: "drop-shadow(0 32px 44px rgba(0,0,0,0.48))",
            }}
          />
        </Box>
      </Box>

      <VStack
        position="relative"
        zIndex={2}
        align="flex-start"
        spacing={5}
        p={{ base: 6, lg: 7 }}
        flex={1}
      >
        <HStack wrap="wrap" spacing={2}>
          {categories.map((category) => (
            <Badge
              key={category.id}
              px={3}
              py={1.5}
              borderRadius="full"
              bg="rgba(255,255,255,0.1)"
              color="white"
              border="1px solid rgba(255,255,255,0.12)"
              fontSize="10px"
              letterSpacing="0.12em"
              textTransform="uppercase"
            >
              {t.programsPage.categories[category.key as ProgramCategoryKey]}
            </Badge>
          ))}
        </HStack>

        <VStack align="flex-start" spacing={2}>
          <Text
            color="white"
            fontSize={{ base: "29px", lg: "34px" }}
            lineHeight={1.05}
            fontWeight={900}
            letterSpacing="-0.055em"
          >
            {trainer.name}
          </Text>

          <Text
            color="brand.red"
            fontWeight={900}
            fontSize="13px"
            letterSpacing="0.12em"
            textTransform="uppercase"
          >
            {trainer.specialty}
          </Text>
        </VStack>

        <Text
          color="whiteAlpha.680"
          lineHeight={1.7}
          fontSize="15px"
          fontWeight={500}
          noOfLines={4}
        >
          {trainer.description}
        </Text>

        <HStack justify="space-between" w="100%" mt="auto" pt={4}>
          <HStack spacing={3}>
            <SocialIcon icon={FaFacebook} />
            <SocialIcon icon={FaInstagram} />
            <SocialIcon icon={FaLinkedinIn} />
          </HStack>

          <HStack
            color="brand.red"
            fontWeight={900}
            fontSize="14px"
            spacing={2}
          >
            <Text display={{ base: "none", md: "block" }}>
              {t.trainersPage.labels.viewProfile}
            </Text>

            <Box
              w="46px"
              h="46px"
              display="grid"
              placeItems="center"
              borderRadius="full"
              bg="white"
              color="black"
              transition="all 0.2s ease"
              _groupHover={{
                bg: "brand.red",
                color: "white",
                transform: "rotate(-35deg)",
              }}
            >
              <ArrowForwardIcon />
            </Box>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
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
      _hover={{
        bg: "brand.red",
        borderColor: "brand.red",
        transform: "translateY(-2px)",
      }}
      transition="all 0.2s ease"
    >
      <Icon as={icon} fontSize="17px" />
    </Box>
  );
};
