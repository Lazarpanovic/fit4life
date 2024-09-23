import React from "react";
import Slider from "react-slick";
import { Box } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TrainerCard, trainers } from "./trainer-card";

export const TrainersCarousel: React.FC = () => {
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
        {trainers.map((trainer, index) => (
          <TrainerCard
            key={index}
            name={trainer.name}
            specialty={trainer.specialty}
            imageSrc={trainer.imageSrc}
            imageWidth={trainer.imageWidth}
            imageWidthMobile={trainer.imageWidthMobile}
            marginTop={trainer.marginTop}
          />
        ))}
      </Slider>
    </Box>
  );
};
