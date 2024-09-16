import { Box } from "@chakra-ui/react";
import { PADDING_10, PADDING_20 } from "../../constants/layout.constants";
import { useBreakpoints } from "../../hooks/use-breakpoints.hook";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { isMobile } = useBreakpoints();
  return (
    <Box w="100%" bg="white" px={isMobile ? PADDING_10 : PADDING_20}>
      {children}
    </Box>
  );
};
