import { extendTheme } from "@chakra-ui/react";
import { Montserrat, Roboto } from "@next/font/google";

const montserrat = Montserrat({ subsets: ["cyrillic"] });
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["cyrillic"],
});
export const theme = extendTheme({
  fonts: {
    montserrat: montserrat.style.fontFamily,
    roboto: roboto.style.fontFamily,
  },
});
