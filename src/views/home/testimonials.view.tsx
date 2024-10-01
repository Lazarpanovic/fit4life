import { Text, VStack } from "@chakra-ui/react";
import {
  GAP_10,
  GAP_20,
  PADDING_10,
  PADDING_20,
} from "../../constants/layout.constants";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { TestimonialCard } from "../../components/home/testimonial-card";
import { testimonials } from "../../data/data";

export const TestimonialsView = () => {
  const { isMobile } = useBreakpoints();
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
      <Text
        fontSize={{ base: 30, md: 48 }}
        fontWeight={700}
        textAlign="center"
        opacity={0.8}
        color="black"
      >
        WHAT OUR CLIENTS SAY
      </Text>
      <VStack w={{ base: "100%", lg: "90%", "2xl": "80%" }} gap={GAP_10}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            fullName={testimonial.fullName}
            title={testimonial.title}
            description={testimonial.description}
            imageSrc={testimonial.imageSrc}
            left={[1, 3].includes(index)}
          />
        ))}
      </VStack>
    </VStack>
  );
};
