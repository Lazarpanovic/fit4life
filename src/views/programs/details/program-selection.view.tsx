import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PricingPlanKey, ProgramKey } from "../../../data/data";
import { HubField, HubForm } from "../../../components/hub/hub-form";
import { useTranslation } from "../../../i18n/use-translation";

export const ProgramSelectionView = ({
  programKey,
  pricingPlans,
}: {
  programKey: ProgramKey;
  pricingPlans: { id: number; key: PricingPlanKey; price: string }[];
}) => {
  const { query } = useRouter();
  const { t } = useTranslation();
  const program = t.programsPage.programs[programKey];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    program: program.shortTitle,
    pricingPlan: "",
  });
  const change = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) =>
    setFormData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  useEffect(() => {
    setFormData((value) => ({ ...value, program: program.shortTitle }));
  }, [program.shortTitle]);
  useEffect(() => {
    const selected = Array.isArray(query.pricing_plan)
      ? query.pricing_plan[0]
      : query.pricing_plan;
    if (selected && pricingPlans.some((plan) => plan.key === selected))
      setFormData((value) => ({ ...value, pricingPlan: selected }));
  }, [query.pricing_plan, pricingPlans]);
  return (
    <HubForm
      title={t.programDetailsPage.formTitle}
      description={t.programDetailsPage.formDescription}
      submit={t.programDetailsPage.submit}
    >
      <HubField
        name="firstName"
        label={t.programDetailsPage.fields.firstName}
        value={formData.firstName}
        onChange={change}
        required
      />
      <HubField
        name="lastName"
        label={t.programDetailsPage.fields.lastName}
        value={formData.lastName}
        onChange={change}
        required
      />
      <HubField
        name="email"
        label={t.programDetailsPage.fields.email}
        value={formData.email}
        onChange={change}
        type="email"
        required
      />
      <HubField
        name="phone"
        label={t.programDetailsPage.fields.phone}
        value={formData.phone}
        onChange={change}
        type="tel"
      />
      <HubField
        name="program"
        label={t.programDetailsPage.labels.program}
        value={formData.program}
        readOnly
      />
      <HubField
        name="pricingPlan"
        label={t.programDetailsPage.labels.pricingPlan}
        value={formData.pricingPlan}
        onChange={change}
        type="select"
        required
      >
        <option value="">{t.ui.selectPlan}</option>
        {pricingPlans.map((plan) => (
          <option key={plan.id} value={plan.key}>
            {t.programDetailsPage.plans[plan.key].type} - ${plan.price}
          </option>
        ))}
      </HubField>
    </HubForm>
  );
};
