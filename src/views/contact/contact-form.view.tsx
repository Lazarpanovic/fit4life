import {
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { GAP_10, GAP_5 } from "../../constants/layout.constants";
import { ChangeEvent, useState } from "react";

export const ContactFormView = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <VStack w="100%" gap={GAP_10}>
      <Text
        fontSize={{ base: 30, lg: 48 }}
        fontWeight={700}
        textAlign="center"
        color="#1A202C"
      >
        Write a message
      </Text>
      <FormControl
        as="form"
        action="https://formspree.io/f/myyokele"
        method="POST"
        display="flex"
        flexDirection="column"
        alignItems="center"
        w="100%"
      >
        <HStack w={{ base: "80%", lg: "60%" }} wrap="wrap" gap={GAP_5}>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            bg="gray.50"
            placeholder="First name"
            w={{ base: "100%", lg: "49%" }}
            h="50px"
          />
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            bg="gray.50"
            placeholder="Last name"
            w={{ base: "100%", lg: "49%" }}
            h="50px"
          />
          <Input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            bg="gray.50"
            placeholder="Email"
            w={{ base: "100%", lg: "49%" }}
            h="50px"
          />
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            bg="gray.50"
            placeholder="Phone"
            w={{ base: "100%", lg: "49%" }}
            h="50px"
          />
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            bg="gray.50"
            placeholder="Write a message"
            w="100%"
            h="250"
          />
        </HStack>
        <Button
          type="submit"
          colorScheme="red"
          fontSize={16}
          borderRadius={5}
          mt={10}
          px={8}
          _hover={{
            bg: "white",
            color: "red.500",
            border: "1px solid red",
          }}
        >
          Send a message
        </Button>
      </FormControl>
    </VStack>
  );
};
