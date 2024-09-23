import GYM_IMAGE from "../../../public/gym.png";
import SAUNA_IMAGE from "../../../public/sauna.png";
import FITNESS_IMAGE from "../../../public/fitness.png";
import SPA_IMAGE from "../../../public/spa.png";
import PILATES_IMAGE from "../../../public/pilates.png";
import MASSAGE_IMAGE from "../../../public/massage.png";
import { HStack, StackDivider, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { GAP_5 } from "../../constants/layout.constants";

export const services = [
  { name: "FITNESS", image: FITNESS_IMAGE, alt: "fitness" },
  { name: "GYM", image: GYM_IMAGE, alt: "gym" },
  { name: "WELLNESS & SPA", image: SPA_IMAGE, alt: "spa" },
  { name: "PILATES", image: PILATES_IMAGE, alt: "pilates" },
  { name: "SAUNA", image: SAUNA_IMAGE, alt: "sauna" },
  { name: "MASSAGE", image: MASSAGE_IMAGE, alt: "massage" },
];

export const Services = () => {
  return (
    <HStack gap={GAP_5} divider={<StackDivider borderColor="gray.400" />}>
      {services.map((service, index) => (
        <VStack key={index}>
          <Text fontSize={20} fontWeight={500} w={200}>
            {service.name}
          </Text>
          <Image src={service.image} width={50} height={50} alt={service.alt} />
        </VStack>
      ))}
    </HStack>
  );
};
