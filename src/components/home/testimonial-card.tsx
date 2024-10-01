import { useInView } from "react-intersection-observer";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { Box, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { GAP_5 } from "../../constants/layout.constants";
import { FaQuoteRight } from "react-icons/fa6";
import { motion } from "framer-motion";

export const TestimonialCard = ({
  fullName,
  title,
  description,
  imageSrc,
  left,
}: {
  fullName: string;
  title: string;
  description: string;
  imageSrc: string;
  left?: boolean;
}) => {
  const { isMobile } = useBreakpoints();
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger the animation only once
    threshold: 0.1, // Trigger when 10% of the card is visible
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }} // Start with the card hidden and 40px lower
      animate={inView ? { opacity: 1, y: 0 } : {}} // Animate to full opacity and 0px Y
      transition={{ duration: 0.5, ease: "easeOut" }} // Animation settings
    >
      <Stack
        gap={{ base: 0, md: 10 }}
        direction={isMobile ? "column" : left ? "row" : "row-reverse"}
        alignSelf={isMobile ? "center" : left ? "flex-start" : "flex-end"}
        align="center"
      >
        <Box
          pos="relative"
          w={{ base: 120, md: 100, lg: 120 }}
          h={{ base: 120, md: 100, lg: 120 }}
          overflow="hidden"
          borderRadius="full"
          mb={isMobile ? -10 : 0}
        >
          <Image
            src={imageSrc}
            alt={imageSrc}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
        <VStack
          align={{ base: "center", md: "flex-start" }}
          bg="#FFFFFF99"
          w={{ base: "100%", md: "75%", lg: "80%", xl: "70%", "2xl": "50%" }}
          borderRadius={{ base: 20, md: 5 }}
          py={{ base: 10, md: 4 }}
          px={{ base: 2, md: 10 }}
          gap={{ base: GAP_5, md: "auto" }}
          pt={{ base: 16, md: 4 }}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
        >
          <Icon ml={2} color="red.500" as={FaQuoteRight} fontSize={40} />
          <Text
            textAlign={{ base: "center", md: "left" }}
            opacity={0.5}
            w="80%"
          >
            {description}
          </Text>
          <VStack
            alignSelf={{ base: "center", md: "flex-end" }}
            align={{ base: "center", md: "flex-end" }}
            gap={0}
            textAlign="center"
          >
            <Text fontWeight={700} fontSize={20}>
              {fullName}
            </Text>
            <Text opacity={0.5}>{title}</Text>
          </VStack>
        </VStack>
      </Stack>
    </motion.div>
  );
};
