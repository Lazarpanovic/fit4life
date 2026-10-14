import Head from "next/head";
import { ReactNode } from "react";
import { HubHeader } from "../header/hub-header";
import { Footer } from "../footer/footer";
import { useTranslation } from "../../i18n/use-translation";
import {
  SITE_NAME,
  absoluteUrl,
  defaultLocale,
  localizedUrl,
  locales,
  ogImage,
  ogLocales,
} from "../../utils/seo";
import styles from "./page-ui.module.css";

export const HubPageMeta = ({
  title,
  description,
  path,
  image = "/hero-section.jpg",
  imageAlt,
  article = false,
  noindex = false,
  jsonLd = [],
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  article?: boolean;
  noindex?: boolean;
  jsonLd?: object[];
}) => {
  const { locale } = useTranslation();
  const url = localizedUrl(locale, path);
  const shareImage = absoluteUrl(ogImage(image));
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <>
          <link rel="canonical" href={url} />
          {locales.map((alternate) => (
            <link
              key={`hreflang-${alternate}`}
              rel="alternate"
              hrefLang={alternate}
              href={localizedUrl(alternate, path)}
            />
          ))}
          <link
            rel="alternate"
            hrefLang="x-default"
            href={localizedUrl(defaultLocale, path)}
          />
        </>
      )}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:locale" content={ogLocales[locale]} />
      {locales
        .filter((alternate) => alternate !== locale)
        .map((alternate) => (
          <meta
            key={`og-locale-${alternate}`}
            property="og:locale:alternate"
            content={ogLocales[alternate]}
          />
        ))}
      <meta property="og:image" content={shareImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt || title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />
      {jsonLd.map((schema, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </Head>
  );
};

export const HubPage = ({
  children,
  bleed = false,
}: {
  children: ReactNode;
  bleed?: boolean;
}) => (
  <>
    <HubHeader />
    <main
      id="page-content"
      tabIndex={-1}
      className={`hub-ui ${styles.page} ${bleed ? styles.bleed : ""}`}
    >
      {children}
    </main>
    <Footer />
  </>
);
export const HubPageHeading = ({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) => (
  <div className={styles.pageHeading} data-reveal>
    <p className={styles.eyebrow}>{label}</p>
    <h1>{title}</h1>
    {children && <p className={styles.intro}>{children}</p>}
  </div>
);
export const HubFilters = ({
  categories,
  labels,
  active,
  onChange,
  label,
}: {
  categories: { id: number; key: string }[];
  labels: Record<string, string>;
  active: string;
  onChange: (key: string) => void;
  label: string;
}) => (
  <div className={styles.filters} role="group" aria-label={label}>
    {categories.map((category) => (
      <button
        type="button"
        key={category.id}
        aria-pressed={active === category.key}
        aria-controls="catalog-results"
        data-filter-control
        onClick={() => onChange(category.key)}
      >
        {labels[category.key]}
      </button>
    ))}
  </div>
);
export { styles as pageStyles };
