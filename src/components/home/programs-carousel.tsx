import React from "react";
import Slider from "react-slick";
import { Box } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProgramCard, programs } from "./program-card";

export const ProgramsCarousel: React.FC = () => {
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
    <Box w="100%">
      <Slider {...settings}>
        {programs.map((service, index) => (
          <ProgramCard
            key={index}
            title={service.title}
            price={service.price}
            imageSrc={service.imageSrc}
            imageWidth={service.imageWidth}
          />
        ))}
      </Slider>
    </Box>
  );
};
