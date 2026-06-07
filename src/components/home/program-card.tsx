import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Badge, Box, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ProgramCategoryKey, ProgramKey } from "../../data/data";
import { useTranslation } from "../../i18n/use-translation";

export const ProgramCard = ({
  id,
  imageSrc,
  programKey,
  price,
  categories,
}: {
  id: number;
  imageSrc: string;
  programKey: ProgramKey;
  price: string;
  categories: { id: number; key: string }[];
}) => {
  const { push } = useRouter();
  const { t } = useTranslation();

  const program = t.programsPage.programs[programKey];

  const navigateToProgramDetails = () => {
    push(`/programs/${id}`);
  };

  return (
    <VStack
      as="article"
      role="group"
      position="relative"
      align="flex-start"
      justify="space-between"
      w="100%"
      minH={{ base: "430px", lg: "470px" }}
      p={6}
      overflow="hidden"
      borderRadius="34px"
      bg="rgba(255,255,255,0.055)"
      border="1px solid rgba(255,255,255,0.11)"
      backdropFilter="blur(18px)"
      cursor="pointer"
      onClick={navigateToProgramDetails}
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
        bg="radial-gradient(circle at 72% 22%, rgba(255,42,42,0.24), transparent 36%)"
      />

      <Box position="absolute" inset={0} overflow="hidden">
        <Image
          src={imageSrc}
          alt={program.shortTitle}
          fill
          style={{
            objectFit: "cover",
            opacity: 0.34,
            transition: "transform 0.35s ease",
          }}
        />

        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(180deg, rgba(6,6,6,0.15), rgba(6,6,6,0.92))"
        />
      </Box>

      <VStack align="flex-start" spacing={4} position="relative" zIndex={1}>
        <HStack wrap="wrap" spacing={2}>
          {categories.map((category) => (
            <Badge
              key={category.id}
              px={3}
              py={1.5}
              borderRadius="full"
              bg="rgba(255,42,42,0.12)"
              color="brand.red"
              border="1px solid rgba(255,42,42,0.28)"
              fontSize="10px"
              letterSpacing="0.12em"
              textTransform="uppercase"
            >
              {t.programsPage.categories[category.key as ProgramCategoryKey]}
            </Badge>
          ))}
        </HStack>

        <Text
          color="brand.red"
          fontWeight={900}
          fontSize="13px"
          letterSpacing="0.12em"
          textTransform="uppercase"
        >
          {program.shortTitle}
        </Text>

        <Text
          fontSize={{ base: "26px", lg: "30px" }}
          lineHeight={1.08}
          fontWeight={800}
          letterSpacing="-0.045em"
          maxW="310px"
          color="white"
        >
          {program.title}
        </Text>
      </VStack>

      <HStack
        position="relative"
        zIndex={1}
        w="100%"
        justify="space-between"
        align="center"
        mt="auto"
      >
        <VStack align="flex-start" spacing={1}>
          <Text fontSize="12px" color="whiteAlpha.500" fontWeight={900}>
            {t.programsPage.labels.from}
          </Text>

          <Text fontSize="22px" color="white" fontWeight={900}>
            ${price}
            <Text as="span" color="whiteAlpha.560" fontSize="14px">
              /{t.programsPage.labels.month}
            </Text>
          </Text>
        </VStack>

        <Box
          w="48px"
          h="48px"
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
    </VStack>
  );
};
