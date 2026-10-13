import { HubButton } from "../hub/hub-action";
import { useRouter } from "next/router";
import { PricingPlanKey, ProgramKey } from "../../data/data";
import { useTranslation } from "../../i18n/use-translation";
import { detailStyles as styles } from "../hub/detail-hero";
import { pricingPlanQuery } from "../../utils/catalog.utils";
export const PricingPlanCard = ({
  plan,
  programKey,
  programId,
}: {
  plan: { id: number; key: PricingPlanKey; price: string };
  programKey: ProgramKey;
  programId: number;
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const copy = t.programDetailsPage.plans[plan.key];
  const choose = async () => {
    const query = pricingPlanQuery(router.query, plan.key);
    await router.push(
      {
        pathname: `/programs/${programId}`,
        query,
        hash: "form",
      },
      undefined,
      { shallow: true, scroll: false },
    );
    document.getElementById("form")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    document
      .getElementById("field-pricingPlan")
      ?.focus({ preventScroll: true });
  };
  return (
    <article
      data-tone={plan.id === 1 ? "dark" : undefined}
      className={`${styles.plan} ${plan.id === 1 ? styles.featuredPlan : ""}`}
    >
      <div className={styles.planTop}>
        <h3>{copy.type}</h3>
        {plan.id === 1 && (
          <p className={styles.planBadge}>{t.programDetailsPage.mostPopular}</p>
        )}
      </div>
      <p className={styles.planProgram}>
        {t.programsPage.programs[programKey].shortTitle}
      </p>
      <p className={styles.price}>
        <strong>${plan.price}</strong>
        <span>/{t.programDetailsPage.perMonth}</span>
      </p>
      <ul>
        {copy.items.map((item) => (
          <li key={item}>
            <span aria-hidden="true">✓</span>
            {item}
          </li>
        ))}
      </ul>
      <HubButton className={styles.planAction} onClick={choose}>
        {t.programDetailsPage.choosePlan}
      </HubButton>
    </article>
  );
};
