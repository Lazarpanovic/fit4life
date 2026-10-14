import {
  HubPage,
  HubPageMeta,
  HubPageHeading,
  HubFilters,
  pageStyles as styles,
} from "../../components/hub/page-ui";
import { HubProgramCard } from "../../components/hub/home-cards";
import { newPrograms, programCategories } from "../../data/data";
import { useCatalog } from "../../hooks/use-catalog";
import { useTranslation } from "../../i18n/use-translation";
import { breadcrumbSchema } from "../../utils/seo";
export default function ProgramsPage() {
  const { t, locale } = useTranslation();
  const catalog = useCatalog(newPrograms, programCategories);
  return (
    <>
      <HubPageMeta
        title={t.programsPage.metaTitle}
        description={t.programsPage.metaDescription}
        path="/programs"
        jsonLd={[
          breadcrumbSchema(locale, [
            { name: t.nav.home, path: "/" },
            { name: t.nav.programs, path: "/programs" },
          ]),
        ]}
      />
      <HubPage>
        <div className={styles.container}>
          <HubPageHeading
            label={t.programsPage.eyebrow}
            title={t.programsPage.title}
          >
            {t.programsPage.description}
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
            aria-label={t.nav.programs}
          >
            <p className={styles.resultsCount} role="status">
              {t.ui.results}: {catalog.count}
            </p>
            {catalog.items.length ? (
              <div className={styles.grid}>
                {catalog.items.map((program) => (
                  <HubProgramCard
                    key={program.id}
                    program={program}
                    headingAs="h2"
                  />
                ))}
              </div>
            ) : (
              <p className={styles.empty}>{t.programsPage.empty}</p>
            )}
            {catalog.hasMore && (
              <div className={styles.more}>
                <button
                  className={styles.secondaryButton}
                  onClick={catalog.showMore}
                >
                  {t.programsPage.discoverMore}
                </button>
              </div>
            )}
          </section>
        </div>
      </HubPage>
    </>
  );
}
