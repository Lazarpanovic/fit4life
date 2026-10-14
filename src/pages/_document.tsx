import { Html, Head, Main, NextScript, DocumentProps } from "next/document";

export default function Document({ __NEXT_DATA__ }: DocumentProps) {
  return (
    <Html
      lang={__NEXT_DATA__.locale || "en"}
      style={{ scrollBehavior: "smooth" }}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#121c18" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
