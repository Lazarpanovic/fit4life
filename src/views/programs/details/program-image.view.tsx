import { Badge, Box, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { ProgramCategoryKey, ProgramKey } from "../../../data/data";
import { useTranslation } from "../../../i18n/use-translation";

export const ProgramImageView = ({
  program,
}: {
  program: {
    id: number;
    key: ProgramKey;
    imageSrc: string;
    price: string;
    duration: string;
    categories: {
      id: number;
      key: string;
    }[];
  };
}) => {
  const { t } = useTranslation();
  const translatedProgram = t.programsPage.programs[program.key];

  return (
    <Box
      as="section"
      position="relative"
      minH={{ base: "680px", lg: "760px" }}
      bg="brand.black"
      color="white"
      overflow="hidden"
      className="premium-noise"
    >
      <Box position="absolute" inset={0}>
        <Image
          src={program.imageSrc}
          alt={translatedProgram.shortTitle}
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        <Box
          position="absolute"
          inset={0}
          bg={{
            base: "linear-gradient(180deg, rgba(6,6,6,0.62), rgba(6,6,6,0.98) 82%)",
            lg: "linear-gradient(90deg, rgba(6,6,6,0.96), rgba(6,6,6,0.72) 48%, rgba(6,6,6,0.28))",
          }}
        />

        <Box
          position="absolute"
          inset={0}
          bg="radial-gradient(circle at 28% 34%, rgba(255,42,42,0.24), transparent 34%)"
        />
      </Box>

      <VStack
        position="relative"
        zIndex={1}
        align="flex-start"
        justify="center"
        minH={{ base: "680px", lg: "760px" }}
        maxW="980px"
        px={{ base: 5, md: 10, xl: 16, "2xl": 24 }}
        py={{ base: 16, lg: 24 }}
        spacing={7}
      >
        <HStack wrap="wrap" spacing={2}>
          {program.categories.map((category) => (
            <Badge
              key={category.id}
              px={4}
              py={2}
              borderRadius="full"
              bg="rgba(255,42,42,0.12)"
              color="brand.red"
              border="1px solid rgba(255,42,42,0.3)"
              fontSize="11px"
              letterSpacing="0.14em"
              textTransform="uppercase"
            >
              {t.programsPage.categories[category.key as ProgramCategoryKey]}
            </Badge>
          ))}
        </HStack>

        <VStack align="flex-start" spacing={4}>
          <Text
            color="brand.red"
            fontSize={{ base: "14px", md: "15px" }}
            fontWeight={900}
            textTransform="uppercase"
            letterSpacing="0.16em"
          >
            {translatedProgram.shortTitle}
          </Text>

          <Text
            as="h1"
            fontSize={{ base: "46px", md: "72px", xl: "92px" }}
            lineHeight={0.92}
            fontWeight={900}
            letterSpacing="-0.08em"
            maxW="920px"
          >
            {translatedProgram.title}
          </Text>
        </VStack>

        <Text
          maxW="760px"
          color="whiteAlpha.720"
          fontSize={{ base: "16px", md: "19px" }}
          lineHeight={1.85}
          fontWeight={500}
        >
          {translatedProgram.longDescription}
        </Text>

        <HStack
          spacing={4}
          pt={3}
          flexDirection={{ base: "column", sm: "row" }}
          align={{ base: "stretch", sm: "center" }}
          w={{ base: "100%", sm: "auto" }}
        >
          <ProgramInfoCard
            label={t.programsPage.labels.from}
            value={`$${program.price}/${t.programDetailsPage.perMonth}`}
          />
          <ProgramInfoCard
            label={t.programDetailsPage.labels.program}
            value={translatedProgram.shortTitle}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

const ProgramInfoCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <VStack
      align="flex-start"
      minW={{ base: "100%", sm: "210px" }}
      p={5}
      borderRadius="24px"
      bg="rgba(255,255,255,0.09)"
      border="1px solid rgba(255,255,255,0.12)"
      spacing={1}
    >
      <Text color="whiteAlpha.520" fontSize="12px" fontWeight={900}>
        {label}
      </Text>
      <Text color="white" fontSize="20px" fontWeight={900}>
        {value}
      </Text>
    </VStack>
  );
};
