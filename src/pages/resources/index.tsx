import {
  HubPage,
  HubPageMeta,
  HubPageHeading,
  HubFilters,
  pageStyles as styles,
} from "../../components/hub/page-ui";
import { HubResourceCard } from "../../components/hub/home-cards";
import { resources, categories } from "../../data/data";
import { useCatalog } from "../../hooks/use-catalog";
import { useTranslation } from "../../i18n/use-translation";
export default function ResourcesPage() {
  const { t } = useTranslation();
  const catalog = useCatalog(resources, categories);
  return (
    <>
      <HubPageMeta
        title={t.resourcesPage.metaTitle}
        description={t.resourcesPage.metaDescription}
        path="/resources"
      />
      <HubPage>
        <div className={styles.container}>
          <HubPageHeading
            label={t.resourcesPage.eyebrow}
            title={t.resourcesPage.title}
          >
            {t.resourcesPage.description}
          </HubPageHeading>
          <HubFilters
            categories={categories}
            labels={t.resourcesPage.categories}
            active={catalog.active}
            onChange={catalog.change}
            label={t.ui.filters}
          />
          <section
            id="catalog-results"
            className={styles.catalog}
            aria-label={t.nav.resources}
          >
            <p className={styles.resultsCount} role="status">
              {t.ui.results}: {catalog.count}
            </p>
            {catalog.items.length ? (
              <div className={styles.articleGrid}>
                {catalog.items.map((resource) => (
                  <HubResourceCard
                    key={resource.id}
                    resource={resource}
                    listing
                    headingAs="h2"
                  />
                ))}
              </div>
            ) : (
              <p className={styles.empty}>{t.resourcesPage.empty}</p>
            )}
            {catalog.hasMore && (
              <div className={styles.more}>
                <button
                  className={styles.secondaryButton}
                  onClick={catalog.showMore}
                >
                  {t.resourcesPage.discoverMore}
                </button>
              </div>
            )}
          </section>
        </div>
      </HubPage>
    </>
  );
}
