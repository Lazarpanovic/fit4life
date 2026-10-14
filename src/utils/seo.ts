import type { Locale } from "../i18n/use-translation";

export const SITE_URL = "https://www.fit4lifebelgrade.com";
export const SITE_NAME = "Fit4Life Hub";
export const locales: Locale[] = ["en", "sr"];
export const defaultLocale: Locale = "en";
export const ogLocales: Record<Locale, string> = { en: "en_US", sr: "sr_RS" };

// English is the default locale and lives without a prefix: /contact, /sr/contact.
export const localizedUrl = (locale: Locale, path: string) => {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  if (path === "/") return `${SITE_URL}${prefix || "/"}`;
  return `${SITE_URL}${prefix}${path}`;
};

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path}`;

// Social previews use the 1200x630 crops from scripts/generate-seo-images.cjs.
export const ogImage = (image: string) => `/og/${image.split("/").pop()}`;

export const business = {
  phone: "+381 66 200 300",
  email: "info@fit4lifebelgrade.com",
  streetAddress: "Bulevar kralja Aleksandra 200",
  locality: "Beograd",
  country: "RS",
  latitude: 44.80381551062193,
  longitude: 20.481508993675682,
};

const organizationId = `${SITE_URL}/#organization`;

export const organizationSchema = (locale: Locale, description: string) => ({
  "@context": "https://schema.org",
  "@type": "HealthClub",
  "@id": organizationId,
  name: SITE_NAME,
  alternateName: "Fit4Life Belgrade",
  slogan: "Longevity – Performance Concept",
  description,
  url: localizedUrl(locale, "/"),
  logo: absoluteUrl("/icon-512.png"),
  image: absoluteUrl(ogImage("/hero-section.jpg")),
  telephone: business.phone,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.streetAddress,
    addressLocality: business.locality,
    addressCountry: business.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.latitude,
    longitude: business.longitude,
  },
  hasMap: `https://www.openstreetmap.org/?mlat=${business.latitude}&mlon=${business.longitude}#map=17/${business.latitude}/${business.longitude}`,
  areaServed: { "@type": "City", name: "Belgrade" },
});

export const websiteSchema = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: localizedUrl(locale, "/"),
  inLanguage: locale,
  publisher: { "@id": organizationId },
});

export const breadcrumbSchema = (
  locale: Locale,
  items: { name: string; path: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: localizedUrl(locale, item.path),
  })),
});

export const serviceSchema = ({
  locale,
  path,
  name,
  description,
  image,
  price,
}: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  image: string;
  price: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: localizedUrl(locale, path),
  image: absoluteUrl(ogImage(image)),
  serviceType: name,
  provider: { "@id": organizationId },
  areaServed: { "@type": "City", name: "Belgrade" },
  offers: {
    "@type": "Offer",
    price,
    priceCurrency: "USD",
    url: localizedUrl(locale, path),
    availability: "https://schema.org/InStock",
  },
});

export const articleSchema = ({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  image: [absoluteUrl(ogImage(image)), absoluteUrl(image)],
  inLanguage: locale,
  mainEntityOfPage: localizedUrl(locale, path),
  author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: { "@type": "ImageObject", url: absoluteUrl("/icon-512.png") },
  },
});
