import React from "react";
import Slider from "react-slick";
import { Box } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TrainerCard } from "./trainer-card";
import { newTrainers } from "../../data/data";

export const TrainersCarousel: React.FC = () => {
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
        {newTrainers.map((trainer) => (
          <Box key={trainer.id} px={2} pb={8}>
            <TrainerCard
              imageSrc={trainer.imageSrc}
              trainerKey={trainer.key}
              categories={trainer.categories}
              accent={trainer.accent}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
