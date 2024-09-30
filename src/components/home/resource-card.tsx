import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface Category {
  id: number;
  name: string;
}

export const ResourceCard = ({
  id,
  imageSrc,
  title,
  categories,
  description,
  showDescription,
  isResourcesPage,
}: {
  id: number;
  imageSrc: string;
  title: string;
  categories: Category[];
  description?: string;
  showDescription?: boolean;
  isResourcesPage?: boolean;
}) => {
  const router = useRouter();
  const navigateToResourceDetails = () => {
    router.push(`/resources/${id}`);
  };
  return (
    <VStack
      align="flex-start"
      w="100%"
      h="100%"
      borderRadius={20}
      overflow="hidden"
      border="1px solid #ced4da"
      bg="#FFFFFF40"
      boxShadow="0px 2px 6px rgba(0, 0, 0, 0.3)"
      pos="relative"
    >
      <Box
        pos="relative"
        h={
          !isResourcesPage
            ? "100%"
            : { base: "250px", lg: "200px", "2xl": "300px" }
        }
        w="100%"
        borderRadius={18}
        overflow="hidden"
      >
        <Image
          src={imageSrc}
          alt="resource-image"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </Box>
      <HStack align="flex-end" w="100%" padding={4}>
        <VStack align="flex-start" w="100%">
          <Text fontWeight={700} fontSize={{ base: 16, lg: 18 }} opacity={0.8}>
            {title}
          </Text>
          <HStack w={{ base: "90%", lg: "80%" }} wrap="wrap">
            {categories.map((category) => (
              <Tag
                key={category.id}
                fontSize={{ base: 12, lg: 14 }}
                borderRadius="full"
                bg="#dee2e6"
                px={3}
              >
                {category.name}
              </Tag>
            ))}
          </HStack>
          {showDescription && (
            <Text opacity={0.8} noOfLines={3} w="90%">
              {description}
            </Text>
          )}
        </VStack>
      </HStack>
      <ArrowForwardIcon
        bg="black"
        color="white"
        borderRadius="full"
        w={8}
        h={8}
        padding={2}
        opacity={0.8}
        pos="absolute"
        bottom={4}
        right={4}
        cursor="pointer"
        _hover={{
          color: "black",
          bg: "white",
          border: "1px solid black",
        }}
        onClick={navigateToResourceDetails}
      />
    </VStack>
  );
};
