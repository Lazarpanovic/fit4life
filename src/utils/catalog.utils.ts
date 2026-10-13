export const resolveCategory = (
  param: string | string[] | undefined,
  categories: { key: string }[],
) => {
  const key = Array.isArray(param) ? param[0] : param;
  return categories.some((category) => category.key === key) ? key! : "all";
};
export const filterCatalog = <T extends { categories: { key: string }[] }>(
  items: T[],
  category: string,
) =>
  category === "all"
    ? items
    : items.filter((item) =>
        item.categories.some((value) => value.key === category),
      );
export const categoryQuery = (
  current: Record<string, string | string[] | undefined>,
  category: string,
) => {
  const query = { ...current };
  delete query.category;
  if (category !== "all") query.category = category;
  return query;
};
export const pricingPlanQuery = (
  current: Record<string, string | string[] | undefined>,
  plan: string,
) => {
  const query: Record<string, string | string[] | undefined> = {
    ...current,
    pricing_plan: plan,
  };
  delete query.id;
  return query;
};
