import { newPrograms, ProgramCategoryKey } from "../../../data/data";
import { useTranslation } from "../../../i18n/use-translation";
import {
  HubDetailHero,
  detailStyles as styles,
} from "../../../components/hub/detail-hero";
export const ProgramImageView = ({
  program,
}: {
  program: (typeof newPrograms)[number];
}) => {
  const { t } = useTranslation();
  const copy = t.programsPage.programs[program.key];
  return (
    <HubDetailHero
      image={program.imageSrc}
      label={copy.shortTitle}
      title={copy.title}
      description={copy.longDescription}
      tags={program.categories.map(
        (category) =>
          t.programsPage.categories[category.key as ProgramCategoryKey],
      )}
      backHref="/programs"
      backLabel={t.nav.programs}
    >
      <div className={styles.heroFacts}>
        <p>
          <small>{t.programsPage.labels.from}</small>
          <strong>
            ${program.price}/{t.programDetailsPage.perMonth}
          </strong>
        </p>
        <p>
          <small>{t.programDetailsPage.labels.program}</small>
          <strong>{copy.shortTitle}</strong>
        </p>
      </div>
    </HubDetailHero>
  );
};
