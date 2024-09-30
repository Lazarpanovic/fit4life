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

export const ContactFormView = () => {
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
        display="flex"
        flexDirection="column"
        alignItems="center"
        w="100%"
      >
        <HStack w={{ base: "80%", lg: "60%" }} wrap="wrap" gap={GAP_5}>
          <Input
            bg="gray.50"
            placeholder="First name"
            w={{ base: "100%", lg: "49%" }}
            h="50px"
          />
          <Input
            bg="gray.50"
            placeholder="Last name"
            w={{ base: "100%", lg: "49%" }}
            h="50px"
          />
          <Input
            bg="gray.50"
            placeholder="Email"
            w={{ base: "100%", lg: "49%" }}
            h="50px"
          />
          <Input
            bg="gray.50"
            placeholder="Phone"
            w={{ base: "100%", lg: "49%" }}
            h="50px"
          />
          <Textarea
            bg="gray.50"
            placeholder="Write a message"
            w="100%"
            h="250"
          />
        </HStack>
        <Button
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
