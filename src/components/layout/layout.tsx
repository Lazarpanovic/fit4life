import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      className="hub-ui"
      id="page-content"
      tabIndex={-1}
      pt="var(--hub-header-clearance)"
      w="100%"
      bg="brand.black"
      color="hub.text"
      fontFamily="body"
    >
      {children}
    </Box>
  );
};
