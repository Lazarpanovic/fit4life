const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const ts = require("typescript");
const load = (file) => {
  const context = { exports: {} };
  const code = ts.transpileModule(
    fs.readFileSync(path.join(__dirname, "..", file), "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } },
  ).outputText;
  vm.runInNewContext(code, context);
  return context.exports;
};
const { nextHeaderCompact, releaseHeaderExpansion } = load(
  "src/utils/header-state.ts",
);
const { resolveCategory, filterCatalog, categoryQuery, pricingPlanQuery } =
  load("src/utils/catalog.utils.ts");
const { newPrograms, newTrainers, resources, programCategories, categories } =
  load("src/data/data.ts");
const plain = (value) => JSON.parse(JSON.stringify(value));
test("header contracts at 64px, stays stable near the threshold and expands near the top", () => {
  let compact = false;
  for (const y of [0, 20, 63]) {
    compact = nextHeaderCompact(y, compact);
    assert.equal(compact, false);
  }
  compact = nextHeaderCompact(64, compact);
  assert.equal(compact, true);
  for (const y of [65, 63, 50, 63, 33]) {
    compact = nextHeaderCompact(y, compact);
    assert.equal(compact, true);
  }
  compact = nextHeaderCompact(32, compact);
  assert.equal(compact, false);
  for (const y of [33, 50, 63]) {
    compact = nextHeaderCompact(y, compact);
    assert.equal(compact, false);
  }
});
test("manual header expansion holds through small scrolls and keyboard focus", () => {
  assert.equal(releaseHeaderExpansion(180, 180, false), false);
  assert.equal(releaseHeaderExpansion(220, 180, false), false);
  assert.equal(releaseHeaderExpansion(228, 180, false), true);
  assert.equal(releaseHeaderExpansion(228, 180, true), false);
  assert.equal(releaseHeaderExpansion(32, 400, false), true);
  assert.equal(releaseHeaderExpansion(20, 400, true), false);
});
test("unknown and repeated category parameters resolve safely", () => {
  assert.equal(resolveCategory(undefined, programCategories), "all");
  assert.equal(resolveCategory("not-a-category", programCategories), "all");
  assert.equal(
    resolveCategory(["business", "fitness"], programCategories),
    "business",
  );
  assert.equal(resolveCategory("supplements", categories), "supplements");
});
test("real catalogs match any existing category without changing source items", () => {
  assert.deepEqual(
    plain(filterCatalog(newPrograms, "youngAthletes").map((item) => item.id)),
    [2],
  );
  assert.deepEqual(
    plain(filterCatalog(newPrograms, "nature").map((item) => item.id)),
    [4],
  );
  assert.deepEqual(
    plain(filterCatalog(newTrainers, "business").map((item) => item.id)),
    [3],
  );
  assert.deepEqual(
    plain(filterCatalog(resources, "training").map((item) => item.id)),
    [1, 3],
  );
  assert.equal(filterCatalog(newPrograms, "all"), newPrograms);
  assert.equal(filterCatalog(newPrograms, "pilates").length, 0);
});
test("category links preserve other parameters and remove only the all-category parameter", () => {
  const original = { category: "fitness", source: "campaign", tag: ["a", "b"] };
  assert.deepEqual(plain(categoryQuery(original, "nature")), {
    category: "nature",
    source: "campaign",
    tag: ["a", "b"],
  });
  assert.deepEqual(plain(categoryQuery(original, "all")), {
    source: "campaign",
    tag: ["a", "b"],
  });
  assert.equal(original.category, "fitness");
});
test("plan selection keeps the POST plan key and other query values without duplicating route id", () => {
  const original = { id: "4", pricing_plan: "basic", source: "home" };
  assert.deepEqual(plain(pricingPlanQuery(original, "premium")), {
    pricing_plan: "premium",
    source: "home",
  });
  assert.equal(original.id, "4");
  assert.equal(original.pricing_plan, "basic");
});

const {
  carouselIndex,
  carouselTarget,
  carouselLoopIndex,
  carouselLoopDistance,
  carouselSlideScale,
} = load("src/utils/carousel.utils.ts");
test("carousel targets clamp to real scroll limits, including the partially aligned last slide", () => {
  const offsets = [0, 288, 576, 864];
  assert.equal(carouselTarget(-1, offsets, 820), 0);
  assert.equal(carouselTarget(1, offsets, 820), 288);
  assert.equal(carouselTarget(3, offsets, 820), 820);
  assert.equal(carouselTarget(99, offsets, 820), 820);
  assert.equal(carouselTarget(1, [], 0), 0);
});
test("carousel progress follows swipes and viewport changes without losing edge states", () => {
  const offsets = [0, 288, 576, 864];
  assert.equal(carouselIndex(-15, offsets, 820), 0);
  assert.equal(carouselIndex(310, offsets, 820), 1);
  assert.equal(carouselIndex(550, offsets, 820), 2);
  assert.equal(carouselIndex(810, offsets, 820), 3);
  assert.equal(carouselIndex(840, offsets, 820), 3);
  assert.equal(carouselIndex(310, offsets, 0), 0);
  assert.equal(carouselIndex(100, [], 200), 0);
});
test("carousel loop indexes and neighbor scale wrap without a visible jump", () => {
  const near = (actual, expected) =>
    assert.ok(
      Math.abs(actual - expected) < 1e-9,
      `${actual} ~= ${expected}`,
    );
  assert.equal(carouselLoopIndex(0, 4), 0);
  assert.equal(carouselLoopIndex(4, 4), 0);
  assert.equal(carouselLoopIndex(-1, 4), 3);
  assert.equal(carouselLoopIndex(5, 2), 1);
  assert.equal(carouselLoopIndex(1, 0), 0);
  near(carouselLoopDistance(0, 0.75), 0.25);
  near(carouselLoopDistance(0.5, 0), -0.5);
  near(carouselSlideScale(0, 0.25), 1);
  near(carouselSlideScale(0.25, 0.25), 0.96);
  near(carouselSlideScale(0.125, 0.25), 0.98);
  near(carouselSlideScale(1, 0), 1);
});
