import { extendTheme } from "@chakra-ui/react";
import { Montserrat, Roboto } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin", "cyrillic"],
});

export const theme = extendTheme({
  fonts: {
    heading: montserrat.style.fontFamily,
    body: montserrat.style.fontFamily,
    montserrat: montserrat.style.fontFamily,
    roboto: roboto.style.fontFamily,
  },
  colors: {
    brand: {
      black: "#060606",
      dark: "#0B0B0B",
      surface: "#111111",
      surfaceLight: "#181818",
      red: "#FF2A2A",
      redDark: "#C41212",
      orange: "#FF6B00",
      cream: "#F6F0E8",
      muted: "#A6A6A6",
    },
  },
  styles: {
    global: {
      html: {
        scrollBehavior: "smooth",
        bg: "brand.black",
      },
      body: {
        bg: "brand.black",
        color: "white",
      },
      "::selection": {
        background: "#FF2A2A",
        color: "white",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 800,
        letterSpacing: "-0.01em",
      },
    },
  },
});
