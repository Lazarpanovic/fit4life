import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  categoryQuery,
  filterCatalog,
  resolveCategory,
} from "../utils/catalog.utils";

export const useCatalog = <T extends { categories: { key: string }[] }>(
  items: T[],
  categories: { key: string }[],
) => {
  const router = useRouter();
  const [active, setActive] = useState("all");
  const [visible, setVisible] = useState(6);
  const selected = resolveCategory(router.query.category, categories);
  useEffect(() => {
    if (router.isReady) {
      setActive(selected);
      setVisible(6);
    }
  }, [router.isReady, selected]);
  const change = (category: string) => {
    const next = categories.some((item) => item.key === category)
      ? category
      : "all";
    setActive(next);
    setVisible(6);
    const query = categoryQuery(router.query, next);
    void router.push({ pathname: router.pathname, query }, undefined, {
      shallow: true,
      scroll: false,
    });
  };
  const filtered = filterCatalog(items, active);
  return {
    active,
    change,
    items: filtered.slice(0, visible),
    count: filtered.length,
    hasMore: filtered.length > visible,
    showMore: () => setVisible((value) => value + 3),
  };
};
