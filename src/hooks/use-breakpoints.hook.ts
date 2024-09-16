import { useBreakpoint, UseBreakpointOptions } from "@chakra-ui/react";

const DEFAULT_CONFIG: UseBreakpointOptions = {
  ssr: true,
  fallback: "base",
};

export const useBreakpoints = (
  config: string | UseBreakpointOptions | undefined = DEFAULT_CONFIG
) => {
  const breakpoint = useBreakpoint(config);

  return {
    isMobile: ["base", "sm"].includes(breakpoint),
    isTablet: ["md"].includes(breakpoint),
    isLaptop: ["lg"].includes(breakpoint),
    isLargeLaptop: ["xl"].includes(breakpoint),
    isDesktop: ["2xl"].includes(breakpoint),
  };
};
