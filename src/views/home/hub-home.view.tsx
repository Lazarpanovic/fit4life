import Image from "next/image";
import HERO_SECTION_IMAGE from "../../../public/hero-section.jpg";
import {
  newPrograms,
  newTrainers,
  resources,
  testimonials,
} from "../../data/data";
import { useTranslation } from "../../i18n/use-translation";
import { HubLink, HubSectionHeading } from "../../components/hub/hub-ui";
import {
  HubProgramCard,
  HubTrainerCard,
  HubResourceCard,
  HubTestimonialCard,
} from "../../components/hub/home-cards";
import { HubCarousel } from "../../components/hub/hub-carousel";
import { HubContactView } from "./hub-contact.view";
import styles from "./hub-home.module.css";

// Concept pillars stay independent of the services and the program catalog.
const pillars = [
  { icon: "health", name: "Health", message: "Better Today" },
  { icon: "performance", name: "Performance", message: "Higher Tomorrow" },
  { icon: "longevity", name: "Longevity", message: "More Years" },
  { icon: "balance", name: "Balance", message: "Fuller Life" },
  { icon: "testing", name: "Testing", message: "Clearer Answers" },
];
// These six services and their icons are the original Services component's catalog.
const services = [
  { key: "fitness", image: "/fitness.png" },
  { key: "gym", image: "/gym.png" },
  { key: "wellnessSpa", image: "/spa.png" },
  { key: "pilates", image: "/pilates.png" },
  { key: "sauna", image: "/sauna.png" },
  { key: "massage", image: "/massage.png" },
] as const;
const testimonialKeys = ["jessica", "michael", "emily", "john"] as const;

export const HubHomeView = () => {
  const { t } = useTranslation();
  const copy = t.hubHome;
  return (
    <main id="page-content" tabIndex={-1} className={`hub-ui ${styles.home}`}>
      <section
        data-tone="dark"
        className={styles.hero}
        aria-labelledby="hub-hero-title"
      >
        <div className={styles.heroImage}>
          <Image
            src={HERO_SECTION_IMAGE}
            alt={copy.groupTrainingAlt}
            fill
            priority
            sizes="100vw"
            className={styles.cover}
          />
        </div>
        <div className={`${styles.container} ${styles.heroInner}`}>
          <div className={styles.heroCopy} data-reveal>
            <p className={styles.heroBrand}>Fit4Life Hub</p>
            <p className={styles.slogan}>Longevity – Performance Concept</p>
            <h1 id="hub-hero-title">
              {copy.heroTitle}
              <span>{copy.heroEmphasis}</span>
            </h1>
            <p className={styles.heroIntro}>{copy.heroIntro}</p>
            <div className={styles.heroActions}>
              <HubLink href="/contact" variant="accent">
                {copy.primaryCta}
              </HubLink>
              <HubLink href="/programs" variant="outline">
                {t.programsSection.cta}
              </HubLink>
            </div>
            <div className={styles.heroPillars} aria-label={copy.conceptNote}>
              {pillars.map((pillar) => (
                <div key={pillar.name} className={styles.heroPillar}>
                  <Image
                    className={styles.heroPillarIcon}
                    src={`/assets/fit4life/${pillar.icon}.svg`}
                    width={28}
                    height={28}
                    alt=""
                    aria-hidden="true"
                  />
                  <div>
                    <span>{pillar.name}</span>
                    <p>{pillar.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.about}`}
        aria-labelledby="hub-about-title"
      >
        <div className={styles.container}>
          <div className={styles.aboutGrid} data-reveal>
            <div>
              <p className={styles.eyebrow}>{t.about.eyebrow}</p>
              <h2 id="hub-about-title">{t.about.title}</h2>
              <p className={styles.body}>{t.about.description}</p>
              <HubLink href="/programs" variant="primary">
                {t.about.cta}
              </HubLink>
            </div>
            <div className={styles.aboutCards}>
              {t.about.cards.map((card) => (
                <article key={card.value}>
                  <span aria-hidden="true">{card.value}</span>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <ul className={styles.services}>
            {services.map((service) => (
              <li key={service.key}>
                <Image
                  src={service.image}
                  alt=""
                  width={44}
                  height={44}
                  sizes="44px"
                />
                <h3>{t.services[service.key]}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="concept"
        data-tone="dark"
        className={`${styles.section} ${styles.pillars}`}
        aria-labelledby="hub-pillars-title"
      >
        <div className={styles.container}>
          <HubSectionHeading
            id="hub-pillars-title"
            label={copy.conceptLabel}
            title={copy.conceptNote}
          >
            {copy.pillarsIntro}
          </HubSectionHeading>
          <div className={styles.pillarGrid} data-stagger>
            {pillars.map((pillar, index) => (
              <div key={pillar.name} className={styles.pillar}>
                <span className={styles.pillarNumber} aria-hidden="true">
                  0{index + 1}
                </span>
                <Image
                  src={`/assets/fit4life/${pillar.icon}.svg`}
                  width={64}
                  height={64}
                  alt=""
                  aria-hidden="true"
                />
                <h3>{pillar.name}</h3>
                <p>{pillar.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="programs"
        className={styles.section}
        aria-label={copy.programsLabel}
      >
        <div className={styles.container}>
          <HubSectionHeading
            label={t.programsSection.eyebrow}
            title={t.programsSection.title}
          >
            {t.programsSection.description}
          </HubSectionHeading>
          <HubCarousel
            desktopClassName={styles.fourGrid}
            label={copy.programsLabel}
          >
            {newPrograms.map((program) => (
              <HubProgramCard key={program.id} program={program} home />
            ))}
          </HubCarousel>
          <div className={styles.sectionCta}>
            <HubLink href="/programs" variant="outline">
              {t.programsSection.cta}
            </HubLink>
          </div>
        </div>
      </section>

      <section
        id="trainers"
        data-tone="dark"
        className={`${styles.section} ${styles.team}`}
        aria-label={copy.teamLabel}
      >
        <div className={styles.container}>
          <HubSectionHeading
            label={t.trainersSection.eyebrow}
            title={t.trainersSection.title}
          >
            {t.trainersSection.description}
          </HubSectionHeading>
          <HubCarousel
            desktopClassName={styles.fourGrid}
            label={copy.teamLabel}
          >
            {newTrainers.map((trainer) => (
              <HubTrainerCard key={trainer.id} trainer={trainer} home />
            ))}
          </HubCarousel>
          <div className={styles.sectionCta}>
            <HubLink href="/trainers" variant="outline">
              {t.trainersSection.cta}
            </HubLink>
          </div>
        </div>
      </section>

      <section
        id="resources"
        className={styles.section}
        aria-label={copy.resourcesLabel}
      >
        <div className={styles.container}>
          <HubSectionHeading
            label={t.resourcesSection.eyebrow}
            title={t.resourcesSection.title}
          >
            {t.resourcesSection.description}
          </HubSectionHeading>
          <HubCarousel
            desktopClassName={styles.resourceGrid}
            label={copy.resourcesLabel}
          >
            {resources.map((resource, index) => (
              <HubResourceCard
                key={resource.id}
                resource={resource}
                featured={index === 0}
                home
              />
            ))}
          </HubCarousel>
          <div className={styles.sectionCta}>
            <HubLink href="/resources" variant="outline">
              {t.resourcesSection.cta}
            </HubLink>
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className={`${styles.section} ${styles.testimonials}`}
        aria-label={t.testimonialsSection.eyebrow}
      >
        <div className={styles.container}>
          <HubSectionHeading
            label={t.testimonialsSection.eyebrow}
            title={t.testimonialsSection.title}
          >
            {t.testimonialsSection.description}
          </HubSectionHeading>
          <HubCarousel
            desktopClassName={styles.fourGrid}
            label={t.testimonialsSection.eyebrow}
          >
            {testimonials.map((testimonial, index) => {
              const translated =
                t.testimonialsSection.testimonials[testimonialKeys[index]];
              return (
                <HubTestimonialCard
                  key={testimonial.id}
                  {...translated}
                  imageSrc={testimonial.imageSrc}
                />
              );
            })}
          </HubCarousel>
        </div>
      </section>

      <HubContactView />
    </main>
  );
};
