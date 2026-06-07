import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box w="100%" bg="brand.black" color="white" fontFamily="montserrat">
      {children}
    </Box>
  );
};
