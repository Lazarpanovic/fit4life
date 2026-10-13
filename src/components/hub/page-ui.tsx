import Head from "next/head";
import { ReactNode } from "react";
import { HubHeader } from "../header/hub-header";
import { Footer } from "../footer/footer";
import styles from "./page-ui.module.css";

export const HubPageMeta = ({
  title,
  description,
  path,
  image = "/hero-section.jpg",
  article = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  article?: boolean;
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content="Fit4Life Hub" />
    <link rel="canonical" href={`https://www.fit4lifebelgrade.com${path}`} />
    <meta
      property="og:url"
      content={`https://www.fit4lifebelgrade.com${path}`}
    />
    <meta property="og:type" content={article ? "article" : "website"} />
    <meta property="og:image" content={image} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={image} />
  </Head>
);

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
