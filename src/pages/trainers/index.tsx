import {
  HubPage,
  HubPageMeta,
  HubPageHeading,
  HubFilters,
  pageStyles as styles,
} from "../../components/hub/page-ui";
import { HubTrainerCard } from "../../components/hub/home-cards";
import { newTrainers, programCategories } from "../../data/data";
import { useCatalog } from "../../hooks/use-catalog";
import { useTranslation } from "../../i18n/use-translation";
export default function TrainersPage() {
  const { t } = useTranslation();
  const catalog = useCatalog(newTrainers, programCategories);
  return (
    <>
      <HubPageMeta
        title={t.trainersPage.metaTitle}
        description={t.trainersPage.metaDescription}
        path="/trainers"
      />
      <HubPage>
        <div className={styles.container}>
          <HubPageHeading
            label={t.trainersPage.eyebrow}
            title={t.trainersPage.title}
          >
            {t.trainersPage.description}
          </HubPageHeading>
          <HubFilters
            categories={programCategories}
            labels={t.programsPage.categories}
            active={catalog.active}
            onChange={catalog.change}
            label={t.ui.filters}
          />
          <section
            id="catalog-results"
            className={styles.catalog}
            aria-label={t.nav.trainers}
          >
            <p className={styles.resultsCount} role="status">
              {t.ui.results}: {catalog.count}
            </p>
            {catalog.items.length ? (
              <div className={styles.grid}>
                {catalog.items.map((trainer) => (
                  <HubTrainerCard
                    key={trainer.id}
                    trainer={trainer}
                    headingAs="h2"
                  />
                ))}
              </div>
            ) : (
              <p className={styles.empty}>{t.trainersPage.empty}</p>
            )}
            {catalog.hasMore && (
              <div className={styles.more}>
                <button
                  className={styles.secondaryButton}
                  onClick={catalog.showMore}
                >
                  {t.trainersPage.discoverMore}
                </button>
              </div>
            )}
          </section>
        </div>
      </HubPage>
    </>
  );
}
