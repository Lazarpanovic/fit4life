import { useRouter } from "next/router";
import { en } from "./en";
import { sr } from "./sr";

export type Locale = "en" | "sr";

const dictionaries = {
  en,
  sr,
};

export const useTranslation = () => {
  const { locale } = useRouter();

  const activeLocale: Locale = locale === "sr" ? "sr" : "en";

  return {
    t: dictionaries[activeLocale],
    locale: activeLocale,
  };
};
