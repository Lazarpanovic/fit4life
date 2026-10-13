import { extendTheme } from "@chakra-ui/react";
import { Plus_Jakarta_Sans, Source_Sans_3 } from "next/font/google";

// Variable font files are downloaded at build time and served by Next.js.
// latin-ext covers Serbian č, ć, š, ž and đ; no runtime Google Fonts request.
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--hub-font-heading",
});
export const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--hub-font-body",
});
const control = {
  bg: "var(--hub-field-bg)",
  color: "hub.text",
  border: "1px solid",
  borderColor: "hub.controlLine",
  borderRadius: "var(--hub-radius)",
  minH: "var(--hub-control-height)",
  _disabled: {
    bg: "var(--hub-disabled-bg)",
    color: "var(--hub-disabled-text)",
    opacity: 1,
    cursor: "not-allowed",
  },
  _invalid: { borderColor: "var(--hub-error)" },
  _hover: { borderColor: "var(--hub-link)" },
  _focusVisible: {
    borderColor: "var(--hub-link)",
    outline: "3px solid var(--hub-focus)",
    outlineOffset: "3px",
    boxShadow: "none",
  },
};
export const theme = extendTheme({
  fonts: {
    heading: plusJakarta.style.fontFamily,
    body: sourceSans.style.fontFamily,
    // Compatibility aliases for components outside the active route tree.
    montserrat: plusJakarta.style.fontFamily,
    roboto: sourceSans.style.fontFamily,
  },
  colors: {
    hub: {
      forest: "var(--hub-forest)",
      ink: "var(--hub-ink)",
      paper: "var(--hub-paper)",
      text: "var(--hub-text)",
      background: "var(--hub-background)",
      card: "var(--hub-card)",
      raised: "var(--hub-card-raised)",
      sage: "var(--hub-sage)",
      accent: "var(--hub-accent)",
      line: "var(--hub-line)",
      controlLine: "var(--hub-control-line)",
      muted: "var(--hub-muted)",
    },
    brand: {
      black: "var(--hub-background)",
      dark: "var(--hub-forest)",
      surface: "var(--hub-card)",
      surfaceLight: "var(--hub-card-raised)",
      red: "var(--hub-link)",
      redDark: "var(--hub-link-hover)",
      orange: "var(--hub-link)",
      cream: "var(--hub-text)",
      muted: "var(--hub-muted)",
    },
  },
  styles: {
    global: {
      html: { scrollBehavior: "smooth", bg: "hub.background" },
      body: { bg: "hub.background", color: "hub.text" },
      "::selection": {
        background: "var(--hub-accent)",
        color: "var(--hub-forest)",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 700,
        letterSpacing: "-.022em",
        lineHeight: 1.12,
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 600,
        borderRadius: "var(--hub-pill-radius)",
        minH: "var(--hub-control-height)",
        transition:
          "background var(--hub-transition), color var(--hub-transition), border-color var(--hub-transition), box-shadow var(--hub-transition)",
        _focusVisible: {
          outline: "3px solid var(--hub-focus)",
          outlineOffset: "4px",
          boxShadow: "none",
        },
      },
      defaultProps: { variant: "solid" },
      variants: {
        solid: {
          bg: "var(--hub-action-bg)",
          color: "var(--hub-action-text)",
          border: "1px solid transparent",
          "@media (hover: hover) and (pointer: fine)": {
            _hover: {
              bg: "var(--hub-sand)",
              color: "var(--hub-forest)",
              borderColor: "var(--hub-button-border-hover)",
              boxShadow: "var(--hub-shadow-sm)",
            },
          },
          _active: {
            bg: "var(--hub-action-active)",
            color: "var(--hub-action-text)",
          },
          _disabled: {
            bg: "var(--hub-disabled-bg)",
            color: "var(--hub-disabled-text)",
            cursor: "not-allowed",
            opacity: 1,
          },
        },
        outline: {
          bg: "var(--hub-button-secondary-bg)",
          color: "var(--hub-button-secondary-text)",
          border: "1px solid",
          borderColor: "var(--hub-button-border)",
          "@media (hover: hover) and (pointer: fine)": {
            _hover: {
              bg: "var(--hub-button-secondary-hover-bg)",
              color: "var(--hub-button-secondary-hover-text)",
              borderColor: "var(--hub-button-border-hover)",
              boxShadow: "var(--hub-shadow-sm)",
            },
          },
          _active: {
            bg: "var(--hub-button-secondary-hover-bg)",
            color: "var(--hub-button-secondary-hover-text)",
          },
          _disabled: {
            bg: "var(--hub-disabled-bg)",
            color: "var(--hub-disabled-text)",
            cursor: "not-allowed",
            opacity: 1,
          },
        },
      },
    },
    Input: { variants: { outline: { field: control } } },
    Textarea: { variants: { outline: control } },
    Select: { variants: { outline: { field: control } } },
    FormLabel: { baseStyle: { color: "hub.text", fontWeight: 500 } },
  },
});
