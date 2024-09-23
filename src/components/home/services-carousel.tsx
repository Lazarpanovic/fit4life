import React from "react";
import Slider from "react-slick";
import GYM_IMAGE from "../../../public/gym.png";
import SAUNA_IMAGE from "../../../public/sauna.png";
import FITNESS_IMAGE from "../../../public/fitness.png";
import SPA_IMAGE from "../../../public/spa.png";
import PILATES_IMAGE from "../../../public/pilates.png";
import MASSAGE_IMAGE from "../../../public/massage.png";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const services = [
  { name: "FITNESS", image: FITNESS_IMAGE, alt: "fitness" },
  { name: "GYM", image: GYM_IMAGE, alt: "gym" },
  { name: "WELLNESS & SPA", image: SPA_IMAGE, alt: "spa" },
  { name: "PILATES", image: PILATES_IMAGE, alt: "pilates" },
  { name: "SAUNA", image: SAUNA_IMAGE, alt: "sauna" },
  { name: "MASSAGE", image: MASSAGE_IMAGE, alt: "massage" },
];

export const ServicesCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <Box w="100%">
      <Slider {...settings}>
        {services.map((service, index) => (
          <Box key={index} mb={6}>
            <Text fontSize={24} fontWeight={500} textAlign="center" mb={4}>
              {service.name}
            </Text>
            <Image
              src={service.image}
              width={75}
              height={55}
              alt={service.alt}
              style={{
                marginInline: "auto",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
