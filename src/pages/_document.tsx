import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script"; // Import the Script component

export default function Document() {
  return (
    <Html lang="en" style={{ scrollBehavior: "smooth" }}>
      <Head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9FVWK5JBFZ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive" // Ensures the script runs after the page is interactive
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9FVWK5JBFZ');
          `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
