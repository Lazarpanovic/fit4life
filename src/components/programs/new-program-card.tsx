import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Badge, Box, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ProgramCategoryKey, ProgramKey } from "../../data/data";
import { useTranslation } from "../../i18n/use-translation";

export const NewProgramCard = ({
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
  duration: string;
  categories: { id: number; key: string }[];
}) => {
  const { push } = useRouter();
  const { t } = useTranslation();

  const program = t.programsPage.programs[programKey];

  const goToProgramDetailsPage = () => {
    push(`/programs/${id}`);
  };

  return (
    <VStack
      as="article"
      role="group"
      position="relative"
      align="stretch"
      justify="space-between"
      w="100%"
      h="100%"
      minH={{ base: "560px", lg: "600px" }}
      borderRadius="34px"
      overflow="hidden"
      border="1px solid rgba(255,255,255,0.11)"
      bg="rgba(255,255,255,0.055)"
      backdropFilter="blur(18px)"
      cursor="pointer"
      onClick={goToProgramDetailsPage}
      _hover={{
        transform: "translateY(-8px)",
        borderColor: "rgba(255,42,42,0.58)",
        boxShadow: "0 26px 80px rgba(255,42,42,0.16)",
      }}
      transition="all 0.25s ease"
    >
      <Box
        position="relative"
        h={{ base: "280px", lg: "310px" }}
        overflow="hidden"
      >
        <Image
          src={imageSrc}
          alt={program.shortTitle}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.35s ease",
          }}
        />

        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(180deg, rgba(6,6,6,0.06) 0%, rgba(6,6,6,0.9) 100%)"
        />

        <HStack
          position="absolute"
          left={5}
          bottom={5}
          zIndex={2}
          wrap="wrap"
          spacing={2}
        >
          {categories.map((category) => (
            <Badge
              key={category.id}
              px={3}
              py={1.5}
              borderRadius="full"
              bg="rgba(255,255,255,0.12)"
              color="white"
              border="1px solid rgba(255,255,255,0.14)"
              fontSize="10px"
              letterSpacing="0.12em"
              textTransform="uppercase"
            >
              {t.programsPage.categories[category.key as ProgramCategoryKey]}
            </Badge>
          ))}
        </HStack>
      </Box>

      <VStack align="flex-start" spacing={5} p={{ base: 6, lg: 7 }} flex={1}>
        <VStack align="flex-start" spacing={2}>
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
            color="white"
            fontSize={{ base: "26px", lg: "30px" }}
            lineHeight={1.08}
            fontWeight={800}
            letterSpacing="-0.045em"
          >
            {program.title}
          </Text>
        </VStack>

        <Text
          color="whiteAlpha.680"
          lineHeight={1.7}
          fontSize="15px"
          fontWeight={500}
          noOfLines={4}
        >
          {program.longDescription}
        </Text>

        <HStack justify="space-between" w="100%" mt="auto" pt={5}>
          <VStack align="flex-start" spacing={1}>
            <Text color="whiteAlpha.500" fontSize="12px" fontWeight={900}>
              {t.programsPage.labels.from}
            </Text>

            <Text color="white" fontSize="22px" fontWeight={900}>
              ${price}
              <Text as="span" color="whiteAlpha.560" fontSize="14px">
                /{t.programsPage.labels.month}
              </Text>
            </Text>
          </VStack>

          <HStack
            color="brand.red"
            fontWeight={900}
            fontSize="14px"
            spacing={2}
          >
            <Text display={{ base: "none", md: "block" }}>
              {t.programsPage.labels.viewProgram}
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
