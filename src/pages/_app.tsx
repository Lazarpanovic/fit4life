import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Script from "next/script";
import { plusJakarta, sourceSans, theme } from "../theme/theme-config";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePageReveal } from "../hooks/use-page-reveal";
import { TrainerDialogProvider } from "../components/hub/trainer-dialog";
import "../theme/global.css";
import "../theme/hub-tokens.css";

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ACCOUNT_ID;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // Different article/program IDs are different pages; filter/hash updates are not.
  usePageReveal(router.asPath.split(/[?#]/)[0], router.locale);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== "undefined") {
        const gtag = (
          window as Window & { gtag?: (...args: unknown[]) => void }
        ).gtag;
        gtag?.("config", GA_ID, {
          page_path: url,
        });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <ChakraProvider theme={theme}>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      <div className={`${plusJakarta.variable} ${sourceSans.variable}`}>
        <TrainerDialogProvider>
          <Component {...pageProps} />
        </TrainerDialogProvider>
      </div>
    </ChakraProvider>
  );
}
