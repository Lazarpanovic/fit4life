import { GetStaticPaths, GetStaticProps } from "next";
import { resources, ResourceCategoryKey } from "../../data/data";
import {
  HubPage,
  HubPageMeta,
  pageStyles as styles,
} from "../../components/hub/page-ui";
import { HubDetailHero, detailStyles } from "../../components/hub/detail-hero";
import { HubSectionHeading, HubLink } from "../../components/hub/hub-ui";
import { HubResourceCard } from "../../components/hub/home-cards";
import { useTranslation } from "../../i18n/use-translation";
import { articleSchema, breadcrumbSchema } from "../../utils/seo";
export default function ResourceDetailsPage({
  resourceId,
}: {
  resourceId: number;
}) {
  const { t, locale } = useTranslation();
  const resource = resources.find((item) => item.id === resourceId)!;
  const copy = t.resourcesPage.resources[resource.key];
  const path = `/resources/${resource.id}`;
  return (
    <>
      <HubPageMeta
        title={`${copy.title} | Fit4Life Hub`}
        description={copy.description}
        path={path}
        image={resource.image}
        article
        jsonLd={[
          articleSchema({
            locale,
            path,
            title: copy.title,
            description: copy.description,
            image: resource.image,
          }),
          breadcrumbSchema(locale, [
            { name: t.nav.home, path: "/" },
            { name: t.nav.resources, path: "/resources" },
            { name: copy.title, path },
          ]),
        ]}
      />
      <HubPage bleed>
        <HubDetailHero
          image={resource.image}
          label={t.resourcesPage.details.article}
          title={copy.title}
          description={copy.description}
          tags={resource.categories.map(
            (category) =>
              t.resourcesPage.categories[category.key as ResourceCategoryKey],
          )}
          backHref="/resources"
          backLabel={t.resourcesPage.details.backToResources}
        />
        <div className={styles.container}>
          <article className={detailStyles.reading}>
            {t.resourcesPage.content[resource.key].map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </article>
          <section className={styles.section}>
            <HubSectionHeading
              label={t.nav.resources}
              title={t.resourcesPage.details.relatedTitle}
            />
            <div className={styles.relatedGrid} data-stagger>
              {resources
                .filter((item) => item.id !== resource.id)
                .map((item) => (
                  <HubResourceCard key={item.id} resource={item} listing />
                ))}
            </div>
            <div className={styles.more}>
              <HubLink href="/resources" variant="outline">
                {t.resourcesPage.details.backToResources}
              </HubLink>
            </div>
          </section>
        </div>
      </HubPage>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async ({ locales }) => ({
  paths: (locales || ["en"]).flatMap((locale) =>
    resources.map((resource) => ({
      params: { id: String(resource.id) },
      locale,
    })),
  ),
  fallback: false,
});
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const resource = resources.find((item) => item.id === Number(params?.id));
  return resource ? { props: { resourceId: resource.id } } : { notFound: true };
};
