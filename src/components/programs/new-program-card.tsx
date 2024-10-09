import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { GAP_5 } from "../../constants/layout.constants";
import { GrMoney } from "react-icons/gr";
import { IoCalendarOutline } from "react-icons/io5";
import { useRouter } from "next/router";

export const NewProgramCard = ({
  id,
  imageSrc,
  shortTitle,
  title,
  price,
  duration,
}: {
  id: number;
  imageSrc: string;
  shortTitle: string;
  title: string;
  price: string;
  duration: string;
}) => {
  const { push } = useRouter();
  const goToProgramDetailsPage = () => {
    push(`/programs/${id}`);
  };
  return (
    <VStack
      align="flex-start"
      w="100%"
      h="100%"
      borderRadius={5}
      overflow="hidden"
      border="1px solid #ced4da"
      bg="#FFFFFF40"
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
      fontFamily="montserrat"
      pos="relative"
      onClick={goToProgramDetailsPage}
    >
      <Box
        pos="relative"
        h={{ base: "250px", lg: "200px", "2xl": "300px" }}
        w="100%"
        overflow="hidden"
      >
        <Image
          src={imageSrc}
          alt={imageSrc}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </Box>
      <VStack textAlign="left" gap={GAP_5} padding={4} align="flex-start">
        <Text color="black" opacity={0.7}>
          {shortTitle}
        </Text>
        <Text color="black" fontWeight={700} opacity={0.7}>
          {title}
        </Text>
        <HStack justify="space-between" w="100%" fontSize={20}>
          <HStack gap={2}>
            <Icon color="red.500" as={GrMoney} />
            <Text color="black" opacity={0.7}>
              {price}$
            </Text>
          </HStack>
          <HStack gap={2}>
            <Icon color="red.500" as={IoCalendarOutline} />
            <Text color="black" opacity={0.7}>
              {duration}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};
