import {
  Badge,
  Box,
  Button,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ResourceCard } from "../../components/resources/resource-card";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { useRouter } from "next/router";
import { resources } from "../../data/data";
import { useTranslation } from "../../i18n/use-translation";

export const ResourcesView = () => {
  const { isMobile, isTablet } = useBreakpoints();
  const router = useRouter();
  const { t } = useTranslation();

  const navigateToResourcesPage = () => {
    router.push("/resources");
  };

  return (
    <Box
      as="section"
      position="relative"
      bg="brand.black"
      color="white"
      px={{ base: 5, md: 10, xl: 16, "2xl": 24 }}
      py={{ base: 20, lg: 28 }}
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-140px"
        left="-160px"
        w="420px"
        h="420px"
        borderRadius="full"
        bg="rgba(255,42,42,0.1)"
        filter="blur(90px)"
      />

      <VStack position="relative" zIndex={1} spacing={{ base: 10, lg: 14 }}>
        <VStack spacing={5} textAlign="center" maxW="860px">
          <Badge
            px={4}
            py={2}
            borderRadius="full"
            bg="rgba(255,42,42,0.12)"
            color="brand.red"
            border="1px solid rgba(255,42,42,0.26)"
            fontSize="12px"
            letterSpacing="0.16em"
            textTransform="uppercase"
          >
            {t.resourcesSection.eyebrow}
          </Badge>

          <Text
            as="h2"
            fontSize={{ base: "38px", md: "58px", xl: "76px" }}
            lineHeight={0.95}
            fontWeight={900}
            letterSpacing="-0.075em"
          >
            {t.resourcesSection.title}
          </Text>

          <Text
            fontSize={{ base: "16px", md: "18px" }}
            color="whiteAlpha.680"
            lineHeight={1.8}
            fontWeight={500}
          >
            {t.resourcesSection.description}
          </Text>
        </VStack>

        {isMobile || isTablet ? (
          <VStack w="100%" spacing={5}>
            {resources.map((resource) => (
              <Box key={resource.id} w="100%" h="500px">
                <ResourceCard
                  id={resource.id}
                  imageSrc={resource.image}
                  resourceKey={resource.key}
                  categories={resource.categories}
                  showDescription={false}
                />
              </Box>
            ))}
          </VStack>
        ) : (
          <HStack w="100%" h={{ lg: "720px", "2xl": "760px" }} spacing={6}>
            <Box w="50%" h="100%">
              <ResourceCard
                id={resources[0].id}
                imageSrc={resources[0].image}
                resourceKey={resources[0].key}
                categories={resources[0].categories}
                showDescription={false}
              />
            </Box>

            <SimpleGrid columns={1} spacing={6} w="50%" h="100%">
              {resources.slice(1, 3).map((resource) => (
                <Box key={resource.id} w="100%" h="100%">
                  <ResourceCard
                    id={resource.id}
                    imageSrc={resource.image}
                    resourceKey={resource.key}
                    categories={resource.categories}
                    showDescription={false}
                  />
                </Box>
              ))}
            </SimpleGrid>
          </HStack>
        )}

        <Button
          h="56px"
          px={8}
          borderRadius="full"
          rightIcon={<ArrowForwardIcon />}
          bg="white"
          color="black"
          _hover={{
            bg: "brand.red",
            color: "white",
            transform: "translateY(-2px)",
            boxShadow: "0 0 36px rgba(255,42,42,0.3)",
          }}
          transition="all 0.2s ease"
          onClick={navigateToResourcesPage}
        >
          {t.resourcesSection.cta}
        </Button>
      </VStack>
    </Box>
  );
};
