import GYM_IMAGE from "../../../public/gym.png";
import SAUNA_IMAGE from "../../../public/sauna.png";
import FITNESS_IMAGE from "../../../public/fitness.png";
import SPA_IMAGE from "../../../public/spa.png";
import PILATES_IMAGE from "../../../public/pilates.png";
import MASSAGE_IMAGE from "../../../public/massage.png";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useTranslation } from "../../i18n/use-translation";

export const Services = () => {
  const { t } = useTranslation();

  const services = [
    { name: t.services.fitness, image: FITNESS_IMAGE, alt: "fitness" },
    { name: t.services.gym, image: GYM_IMAGE, alt: "gym" },
    { name: t.services.wellnessSpa, image: SPA_IMAGE, alt: "spa" },
    { name: t.services.pilates, image: PILATES_IMAGE, alt: "pilates" },
    { name: t.services.sauna, image: SAUNA_IMAGE, alt: "sauna" },
    { name: t.services.massage, image: MASSAGE_IMAGE, alt: "massage" },
  ];

  return (
    <HStack
      w="100%"
      justify="center"
      spacing={0}
      border="1px solid rgba(255,255,255,0.1)"
      borderRadius="32px"
      overflow="hidden"
      bg="rgba(255,255,255,0.07)"
    >
      {services.map((service, index) => (
        <VStack
          key={service.alt}
          flex={1}
          minH="170px"
          justify="center"
          spacing={5}
          px={4}
          borderRight={
            index === services.length - 1
              ? "none"
              : "1px solid rgba(255,255,255,0.08)"
          }
          position="relative"
          _hover={{
            bg: "rgba(255,42,42,0.1)",
          }}
          transition="background 0.2s ease"
        >
          <Box
            w="68px"
            h="68px"
            borderRadius="22px"
            display="grid"
            placeItems="center"
            bg="rgba(255,255,255,0.08)"
            border="1px solid rgba(255,255,255,0.12)"
          >
            <Image
              src={service.image}
              width={38}
              height={38}
              alt={service.alt}
            />
          </Box>

          <Text
            fontSize="14px"
            fontWeight={900}
            textTransform="uppercase"
            letterSpacing="0.12em"
            color="white"
            textAlign="center"
          >
            {service.name}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
};
