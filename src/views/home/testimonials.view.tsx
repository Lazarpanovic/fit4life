import { Badge, Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { TestimonialCard } from "../../components/home/testimonial-card";
import { testimonials } from "../../data/data";
import { useTranslation } from "../../i18n/use-translation";

const testimonialKeys = ["jessica", "michael", "emily", "john"] as const;

export const TestimonialsView = () => {
  const { t } = useTranslation();

  return (
    <Box
      as="section"
      position="relative"
      bg="brand.black"
      color="white"
      px={{ base: 5, md: 10, xl: 16, "2xl": 24 }}
      py={{ base: 20, lg: 28 }}
      overflow="hidden"
    >
      <Box
        position="absolute"
        bottom="-180px"
        right="-140px"
        w="460px"
        h="460px"
        borderRadius="full"
        bg="rgba(255,107,0,0.08)"
        filter="blur(90px)"
      />

      <VStack position="relative" zIndex={1} spacing={{ base: 10, lg: 14 }}>
        <VStack spacing={5} textAlign="center" maxW="860px">
          <Badge
            px={4}
            py={2}
            borderRadius="full"
            bg="rgba(255,42,42,0.12)"
            color="brand.red"
            border="1px solid rgba(255,42,42,0.26)"
            fontSize="12px"
            letterSpacing="0.16em"
            textTransform="uppercase"
          >
            {t.testimonialsSection.eyebrow}
          </Badge>

          <Text
            as="h2"
            fontSize={{ base: "38px", md: "58px", xl: "76px" }}
            lineHeight={0.95}
            fontWeight={900}
            letterSpacing="-0.075em"
          >
            {t.testimonialsSection.title}
          </Text>

          <Text
            fontSize={{ base: "16px", md: "18px" }}
            color="whiteAlpha.680"
            lineHeight={1.8}
            fontWeight={500}
          >
            {t.testimonialsSection.description}
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={6} w="100%">
          {testimonials.map((testimonial, index) => {
            const key = testimonialKeys[index];
            const translatedTestimonial =
              t.testimonialsSection.testimonials[key];

            return (
              <TestimonialCard
                key={testimonial.id}
                fullName={translatedTestimonial.fullName}
                title={translatedTestimonial.title}
                description={translatedTestimonial.description}
                imageSrc={testimonial.imageSrc}
              />
            );
          })}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};
