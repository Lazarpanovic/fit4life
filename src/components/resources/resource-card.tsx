import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Badge, Box, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ResourceCategoryKey, ResourceKey } from "../../data/data";
import { useTranslation } from "../../i18n/use-translation";

export const ResourceCard = ({
  id,
  imageSrc,
  resourceKey,
  categories,
  showDescription = true,
  isResourcesPage,
}: {
  id: number;
  imageSrc: string;
  resourceKey: ResourceKey;
  categories: { id: number; key: string }[];
  showDescription?: boolean;
  isResourcesPage?: boolean;
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const resource = t.resourcesPage.resources[resourceKey];

  const navigateToResourceDetails = () => {
    router.push(`/resources/${id}`);
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
      minH={isResourcesPage ? { base: "520px", lg: "560px" } : "100%"}
      overflow="hidden"
      borderRadius="34px"
      cursor="pointer"
      onClick={navigateToResourceDetails}
      _hover={{
        transform: "translateY(-8px)",
        borderColor: "rgba(255,42,42,0.58)",
        boxShadow: "0 26px 80px rgba(255,42,42,0.16)",
      }}
      bg="rgba(255,255,255,0.075)"
      border="1px solid rgba(255,255,255,0.11)"
      transition="transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease"
    >
      <Box
        position="relative"
        h={isResourcesPage ? { base: "260px", lg: "280px" } : "100%"}
        minH={!isResourcesPage ? "260px" : undefined}
        overflow="hidden"
      >
        <Image
          src={imageSrc}
          alt={resource.title}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.35s ease",
          }}
        />

        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(180deg, rgba(6,6,6,0.06) 0%, rgba(6,6,6,0.88) 100%)"
        />

        <Box
          position="absolute"
          inset={0}
          transition="background 0.3s ease"
          _groupHover={{
            bg: "rgba(255,42,42,0.12)",
          }}
        />
      </Box>

      <VStack
        align="flex-start"
        spacing={4}
        p={{ base: 6, lg: 7 }}
        position={isResourcesPage ? "relative" : "absolute"}
        bottom={!isResourcesPage ? 0 : undefined}
        left={!isResourcesPage ? 0 : undefined}
        right={!isResourcesPage ? 0 : undefined}
        zIndex={2}
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
              {t.resourcesPage.categories[category.key as ResourceCategoryKey]}
            </Badge>
          ))}
        </HStack>

        <Text
          fontSize={{ base: "24px", lg: isResourcesPage ? "28px" : "32px" }}
          lineHeight={1.08}
          fontWeight={800}
          letterSpacing="-0.045em"
          color="white"
        >
          {resource.title}
        </Text>

        {showDescription && (
          <Text
            color="whiteAlpha.680"
            lineHeight={1.7}
            fontSize="15px"
            fontWeight={500}
            noOfLines={4}
          >
            {resource.description}
          </Text>
        )}

        <HStack
          pt={2}
          color="brand.red"
          fontWeight={900}
          fontSize="14px"
          letterSpacing="0.04em"
        >
          <Text>{t.resourcesPage.labels.readArticle}</Text>
          <ArrowForwardIcon
            transition="transform 0.2s ease"
            _groupHover={{
              transform: "translateX(4px)",
            }}
          />
        </HStack>
      </VStack>

      <Box
        position="absolute"
        top={5}
        right={5}
        w="48px"
        h="48px"
        display="grid"
        placeItems="center"
        borderRadius="full"
        bg="white"
        color="black"
        zIndex={3}
        transition="background 0.2s ease, color 0.2s ease, transform 0.2s ease"
        _groupHover={{
          bg: "brand.red",
          color: "white",
          transform: "rotate(-35deg)",
        }}
      >
        <ArrowForwardIcon />
      </Box>
    </VStack>
  );
};
