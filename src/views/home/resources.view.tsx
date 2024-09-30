import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import {
  GAP_10,
  GAP_20,
  PADDING_10,
  PADDING_20,
} from "../../constants/layout.constants";
import { ResourceCard } from "../../components/home/resource-card";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { useRouter } from "next/router";
import { resources } from "../../data/data";

export const ResourcesView = () => {
  const { isMobile, isTablet } = useBreakpoints();
  const router = useRouter();
  const navigateToResourcesPage = () => {
    router.push("/resources");
  };
  return (
    <VStack
      w="100%"
      bg="#e9ecef"
      px={isMobile ? PADDING_10 : PADDING_20}
      pb={PADDING_20}
      justify="center"
      gap={GAP_20}
      fontFamily="montserrat"
    >
      <Text fontSize={{ base: 30, md: 48 }} fontWeight={700} textAlign="center">
        EXPLORE USEFUL RESOURCES
      </Text>
      {isMobile || isTablet ? (
        <VStack w="100%" gap={GAP_10}>
          {resources.map((resource) => (
            <Box key={resource.title} w="100%" h="400px">
              <ResourceCard
                id={resource.id}
                imageSrc={resource.image}
                title={resource.title}
                categories={resource.categories}
              />
            </Box>
          ))}
        </VStack>
      ) : (
        <HStack justify="center" w="90%" h="700px" gap={GAP_10}>
          {/* First row: One card, full height and 50% width */}
          <Box w="50%" h="100%">
            <ResourceCard
              id={resources[0].id}
              imageSrc={resources[0].image}
              title={resources[0].title}
              categories={resources[0].categories}
            />
          </Box>

          {/* Second row: Two cards, each with 50% width and 50% height */}
          <VStack align="flex-start" w="50%" h="700px" gap={GAP_10}>
            {resources.slice(1, 3).map((resource) => (
              <Box key={resource.title} w="100%" h="50%">
                <ResourceCard
                  id={resource.id}
                  imageSrc={resource.image}
                  title={resource.title}
                  categories={resource.categories}
                />
              </Box>
            ))}
          </VStack>
        </HStack>
      )}
      <Button
        colorScheme="red"
        fontSize={{ base: 16, lg: 20 }}
        borderRadius={25}
        w={{ base: 200, lg: 250 }}
        h={50}
        rightIcon={<ArrowForwardIcon />}
        border="1px solid #C73131"
        _hover={{
          bg: "white",
          color: "red.500",
          border: "1px solid #C73131",
        }}
        onClick={navigateToResourcesPage}
      >
        ALL RESOURCES
      </Button>
    </VStack>
  );
};
