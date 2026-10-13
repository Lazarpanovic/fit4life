import { newPrograms, pricingPlans as allPlans } from "../../../data/data";
import { useTranslation } from "../../../i18n/use-translation";
import { HubSectionHeading } from "../../../components/hub/hub-ui";
import { PricingPlanCard } from "../../../components/programs/pricing-plan-card";
import { pageStyles } from "../../../components/hub/page-ui";
import { detailStyles } from "../../../components/hub/detail-hero";
export const PricingPlanView = ({
  program,
  pricingPlans,
}: {
  program: (typeof newPrograms)[number];
  pricingPlans: typeof allPlans;
}) => {
  const { t } = useTranslation();
  return (
    <section className={pageStyles.section}>
      <div className={pageStyles.container}>
        <HubSectionHeading
          label={t.programDetailsPage.pricingEyebrow}
          title={t.programDetailsPage.pricingTitle}
        >
          {t.programDetailsPage.pricingDescription}
        </HubSectionHeading>
        <div className={detailStyles.plans} data-stagger>
          {pricingPlans.map((plan) => (
            <PricingPlanCard
              key={plan.id}
              plan={plan}
              programKey={program.key}
              programId={program.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
