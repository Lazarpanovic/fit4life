import { GetServerSideProps } from "next";
import { newPrograms, resources } from "../data/data";
import { defaultLocale, localizedUrl, locales } from "../utils/seo";
import type { Locale } from "../i18n/use-translation";

const pages = [
  { path: "/", priority: "1.0" },
  { path: "/programs", priority: "0.9" },
  ...newPrograms.map((program) => ({
    path: `/programs/${program.id}`,
    priority: "0.8",
  })),
  { path: "/trainers", priority: "0.8" },
  { path: "/resources", priority: "0.7" },
  ...resources.map((resource) => ({
    path: `/resources/${resource.id}`,
    priority: "0.6",
  })),
  { path: "/contact", priority: "0.8" },
];

// Every language version is listed with its full set of hreflang alternates.
const buildSitemap = () => {
  const urls = pages.flatMap(({ path, priority }) =>
    locales.map((locale: Locale) => {
      const alternates = [
        ...locales.map(
          (alternate) =>
            `    <xhtml:link rel="alternate" hreflang="${alternate}" href="${localizedUrl(alternate, path)}"/>`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl(defaultLocale, path)}"/>`,
      ].join("\n");
      return `  <url>
    <loc>${localizedUrl(locale, path)}</loc>
${alternates}
    <priority>${priority}</priority>
  </url>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  locale,
}) => {
  if (locale && locale !== defaultLocale) return { notFound: true };
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=604800",
  );
  res.write(buildSitemap());
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
