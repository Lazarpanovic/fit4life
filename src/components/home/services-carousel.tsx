import React from "react";
import Slider from "react-slick";
import GYM_IMAGE from "../../../public/gym.png";
import SAUNA_IMAGE from "../../../public/sauna.png";
import FITNESS_IMAGE from "../../../public/fitness.png";
import SPA_IMAGE from "../../../public/spa.png";
import PILATES_IMAGE from "../../../public/pilates.png";
import MASSAGE_IMAGE from "../../../public/massage.png";
import { Box, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "../../i18n/use-translation";

export const ServicesCarousel: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    { name: t.services.fitness, image: FITNESS_IMAGE, alt: "fitness" },
    { name: t.services.gym, image: GYM_IMAGE, alt: "gym" },
    { name: t.services.wellnessSpa, image: SPA_IMAGE, alt: "spa" },
    { name: t.services.pilates, image: PILATES_IMAGE, alt: "pilates" },
    { name: t.services.sauna, image: SAUNA_IMAGE, alt: "sauna" },
    { name: t.services.massage, image: MASSAGE_IMAGE, alt: "massage" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <Box
      w="100%"
      sx={{
        ".slick-dots li button:before": {
          color: "white",
          opacity: 0.4,
        },
        ".slick-dots li.slick-active button:before": {
          color: "#FF2A2A",
          opacity: 1,
        },
      }}
    >
      <Slider {...settings}>
        {services.map((service) => (
          <Box key={service.alt} px={2} pb={8}>
            <VStack
              minH="220px"
              justify="center"
              spacing={6}
              borderRadius="28px"
              bg="rgba(255,255,255,0.055)"
              border="1px solid rgba(255,255,255,0.12)"
              backdropFilter="blur(16px)"
            >
              <Box
                w="86px"
                h="86px"
                borderRadius="28px"
                display="grid"
                placeItems="center"
                bg="rgba(255,255,255,0.08)"
                border="1px solid rgba(255,255,255,0.12)"
              >
                <Image
                  src={service.image}
                  width={48}
                  height={48}
                  alt={service.alt}
                />
              </Box>

              <Text
                fontSize="18px"
                fontWeight={900}
                textTransform="uppercase"
                letterSpacing="0.12em"
                color="white"
              >
                {service.name}
              </Text>
            </VStack>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
