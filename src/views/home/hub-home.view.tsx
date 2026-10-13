import { useEffect, useRef } from "react";
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
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = pillarsRef.current;
    const motion = root?.querySelector<SVGPathElement>("#hub-hero-orbit");
    const comet = root?.querySelector<SVGPathElement>("#hub-hero-comet");
    const nodes = root
      ? Array.from(root.querySelectorAll<HTMLElement>("[data-i]"))
      : [];
    if (!root || !motion || !comet || nodes.length === 0) return;

    const media = window.matchMedia(
      "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
    );
    const length = motion.getTotalLength();
    const half = 0.22;
    const samples = 480;
    const stops = nodes.map((node) => {
      const style = getComputedStyle(node);
      const x = Number.parseFloat(style.getPropertyValue("--x"));
      const y = Number.parseFloat(style.getPropertyValue("--y"));
      let best = 0;
      let bestDistance = Number.POSITIVE_INFINITY;
      for (let step = 0; step <= samples; step += 1) {
        const point = motion.getPointAtLength((step / samples) * length);
        const distance = Math.hypot(point.x - x, point.y - y);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = (step / samples) * length;
        }
      }
      return best;
    });
    let nearestGap = length;
    stops.forEach((stop, index) => {
      stops.forEach((other, otherIndex) => {
        if (otherIndex === index) return;
        nearestGap = Math.min(nearestGap, Math.abs(stop - other));
      });
    });
    const reach = Math.min(11, nearestGap * 0.34);
    const cycle = length / 0.97;
    const lap = 11000;
    let frame = 0;

    const place = (now: number) => {
      if (!media.matches) {
        nodes.forEach((node) => node.removeAttribute("data-active"));
        frame = window.requestAnimationFrame(place);
        return;
      }
      const distance = ((now % lap) / lap) * cycle;
      if (distance > length) {
        comet.setAttribute("d", "");
        nodes.forEach((node) => node.removeAttribute("data-active"));
        frame = window.requestAnimationFrame(place);
        return;
      }
      let streak = "";
      let started = false;
      for (let step = 0; step <= 6; step += 1) {
        const sample = distance - half + (half * 2 * step) / 6;
        if (sample < 0 || sample > length) continue;
        const point = motion.getPointAtLength(sample);
        streak += `${started ? "L" : "M"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
        started = true;
      }
      comet.setAttribute("d", streak);
      let active = -1;
      let closest = reach;
      stops.forEach((stop, index) => {
        const delta = Math.abs(distance - stop);
        if (delta < closest) {
          closest = delta;
          active = index;
        }
      });
      nodes.forEach((node, index) => {
        if (index === active) node.setAttribute("data-active", "true");
        else node.removeAttribute("data-active");
      });
      frame = window.requestAnimationFrame(place);
    };

    frame = window.requestAnimationFrame(place);
    return () => window.cancelAnimationFrame(frame);
  }, []);

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
            <div
              className={styles.heroPillars}
              aria-label={copy.conceptNote}
              ref={pillarsRef}
            >
              <svg
                className={styles.heroOrbit}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  id="hub-hero-orbit"
                  className={styles.heroOrbitTrack}
                  pathLength="100"
                  strokeDasharray="0.55 0.7"
                  d="M -6 48 C 2 48, 6 48, 12 48 C 20 48, 22 70, 28 70 C 36 70, 38 38, 46 38 C 54 34, 66 40, 64 52 C 62 64, 52 66, 54 54 C 56 44, 60 46, 68 56 C 74 64, 74 70, 74 72 C 82 74, 84 46, 90 46 C 98 46, 106 46, 112 46"
                />
                <path id="hub-hero-comet" className={styles.heroOrbitComet} />
              </svg>
              {pillars.map((pillar, index) => (
                <div
                  key={pillar.name}
                  className={styles.heroPillar}
                  data-i={index}
                >
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
          <div className={styles.aboutGrid}>
            <div data-reveal>
              <p className={styles.eyebrow}>{t.about.eyebrow}</p>
              <h2 id="hub-about-title">{t.about.title}</h2>
              <p className={styles.body}>{t.about.description}</p>
              <HubLink href="/programs" variant="primary">
                {t.about.cta}
              </HubLink>
            </div>
            <div className={styles.aboutCards} data-reveal data-stagger>
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
          <ul className={styles.services} data-reveal data-stagger>
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
          <HubCarousel
            desktopClassName={styles.pillarGrid}
            label={copy.conceptLabel}
          >
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
          </HubCarousel>
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
          <div className={styles.sectionCta} data-reveal>
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
          <div className={styles.sectionCta} data-reveal>
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
          <div className={styles.sectionCta} data-reveal>
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
