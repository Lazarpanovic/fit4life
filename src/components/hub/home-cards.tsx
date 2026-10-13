import Image from "next/image";
import Link from "next/link";
import {
  newPrograms,
  newTrainers,
  resources,
  ProgramCategoryKey,
  ResourceCategoryKey,
} from "../../data/data";
import { useTranslation } from "../../i18n/use-translation";
import { useTrainerDialog } from "./trainer-dialog";
import { HubArrow, HubButton } from "./hub-action";
import styles from "./home-cards.module.css";

// Art direction stays in the UI, independent of unchanged business records.
const programPosition = {
  professionalSport: "center 60%",
  athletesDevelopment: "center 46%",
  healthyInBusiness: "center 52%",
  lifeWithNature: "center 58%",
};
const homeCardSizes =
  "(max-width: 479px) 82vw, (max-width: 767px) 380px, (max-width: 1199px) 50vw, 25vw";
const cardSizes = "(max-width: 639px) 100vw, (max-width: 1199px) 50vw, 25vw";

export const HubProgramCard = ({
  program,
  home = false,
  headingAs = "h3",
}: {
  program: (typeof newPrograms)[number];
  home?: boolean;
  headingAs?: "h2" | "h3";
}) => {
  const { t } = useTranslation();
  const copy = t.programsPage.programs[program.key];
  const Heading = headingAs;
  return (
    <article className={styles.program}>
      <Link href={`/programs/${program.id}`} className={styles.programLink}>
        <div className={styles.programImage}>
          <Image
            src={program.imageSrc}
            alt=""
            fill
            sizes={home ? homeCardSizes : cardSizes}
            className={styles.cover}
            style={{ objectPosition: programPosition[program.key] }}
          />
        </div>
        <div className={styles.programCopy}>
          <div className={styles.tags}>
            {program.categories.map((category) => (
              <span key={category.id}>
                {t.programsPage.categories[category.key as ProgramCategoryKey]}
              </span>
            ))}
          </div>
          <Heading>{copy.shortTitle}</Heading>
          <p className={styles.description}>{copy.title}</p>
          <div className={styles.programBottom}>
            <p className={styles.price}>
              <small>{t.programsPage.labels.from}</small>
              <strong>${program.price}</strong>
              <span>/{t.programsPage.labels.month}</span>
            </p>
            <span className={styles.linkLabel}>
              {t.programsPage.labels.viewProgram}
              <HubArrow circle />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export const HubTrainerCard = ({
  trainer,
  home = false,
  headingAs = "h3",
}: {
  trainer: (typeof newTrainers)[number];
  home?: boolean;
  headingAs?: "h2" | "h3";
}) => {
  const { t } = useTranslation();
  const { openTrainer } = useTrainerDialog();
  const copy = t.trainersPage.trainers[trainer.key];
  const Heading = headingAs;
  return (
    <article data-tone="dark" className={styles.trainer}>
      <div className={styles.trainerImage}>
        <Image
          src={trainer.imageSrc}
          alt={copy.name}
          fill
          sizes={home ? homeCardSizes : cardSizes}
        />
      </div>
      <div className={styles.trainerCopy}>
        <Heading>{copy.name}</Heading>
        <p className={styles.specialty}>{copy.specialty}</p>
        <p className={styles.description}>{copy.description}</p>
        <HubButton
          variant="outline"
          compact
          className={styles.trainerAction}
          aria-haspopup="dialog"
          onClick={(event) => openTrainer(trainer, event.currentTarget)}
        >
          {t.ui.moreAboutTrainer}
        </HubButton>
      </div>
    </article>
  );
};

export const HubResourceCard = ({
  resource,
  featured = false,
  listing = false,
  home = false,
  headingAs = "h3",
}: {
  resource: (typeof resources)[number];
  featured?: boolean;
  listing?: boolean;
  home?: boolean;
  headingAs?: "h2" | "h3";
}) => {
  const { t } = useTranslation();
  const copy = t.resourcesPage.resources[resource.key];
  const Heading = headingAs;
  return (
    <article
      data-tone={listing ? undefined : "dark"}
      className={`${styles.resource} ${featured ? styles.featuredResource : ""} ${listing ? styles.listingResource : ""} ${home ? styles.homeResource : ""}`}
    >
      <Link href={`/resources/${resource.id}`} className={styles.resourceLink}>
        <div className={styles.resourceImage}>
          <Image
            src={resource.image}
            alt=""
            fill
            sizes={
              listing
                ? "(max-width: 639px) 100vw, 380px"
                : "(max-width: 479px) 82vw, (max-width: 767px) 380px, 50vw"
            }
            className={styles.cover}
          />
        </div>
        <div className={styles.resourceCopy}>
          <div className={styles.tags}>
            {resource.categories.map((category) => (
              <span key={category.id}>
                {
                  t.resourcesPage.categories[
                    category.key as ResourceCategoryKey
                  ]
                }
              </span>
            ))}
          </div>
          <Heading>{copy.title}</Heading>
          {(featured || listing || home) && (
            <p className={styles.description}>{copy.description}</p>
          )}
          <span className={styles.cardLink}>
            {t.resourcesSection.readArticle}
            <HubArrow circle />
          </span>
        </div>
      </Link>
    </article>
  );
};

export const HubTestimonialCard = ({
  fullName,
  title,
  description,
  imageSrc,
}: {
  fullName: string;
  title: string;
  description: string;
  imageSrc: string;
}) => (
  <figure className={styles.testimonial}>
    <span className={styles.quote} aria-hidden="true">
      “
    </span>
    <blockquote>{description}</blockquote>
    <figcaption>
      <Image src={imageSrc} alt="" width={60} height={60} sizes="60px" />
      <div>
        <h3>{fullName}</h3>
        <p>{title}</p>
      </div>
    </figcaption>
  </figure>
);
