import { GetStaticPaths, GetStaticProps } from "next";
import { newPrograms, pricingPlans } from "../../data/data";
import { HubPage, HubPageMeta, pageStyles } from "../../components/hub/page-ui";
import { ProgramImageView } from "../../views/programs/details/program-image.view";
import { PricingPlanView } from "../../views/programs/details/pricing-plans.view";
import { ProgramSelectionView } from "../../views/programs/details/program-selection.view";
import { useTranslation } from "../../i18n/use-translation";
import { breadcrumbSchema, serviceSchema } from "../../utils/seo";
export default function ProgramDetailsPage({
  programId,
}: {
  programId: number;
}) {
  const { t, locale } = useTranslation();
  const program = newPrograms.find((item) => item.id === programId)!;
  const copy = t.programsPage.programs[program.key];
  const path = `/programs/${program.id}`;
  return (
    <>
      <HubPageMeta
        title={t.programDetailsPage.metaTitle.replace(
          "{program}",
          copy.shortTitle,
        )}
        description={copy.metaDescription}
        path={path}
        image={program.imageSrc}
        imageAlt={copy.title}
        jsonLd={[
          serviceSchema({
            locale,
            path,
            name: copy.shortTitle,
            description: copy.longDescription,
            image: program.imageSrc,
            price: program.price,
          }),
          breadcrumbSchema(locale, [
            { name: t.nav.home, path: "/" },
            { name: t.nav.programs, path: "/programs" },
            { name: copy.shortTitle, path },
          ]),
        ]}
      />
      <HubPage bleed>
        <ProgramImageView program={program} />
        <PricingPlanView program={program} pricingPlans={pricingPlans} />
        <section id="form" className={pageStyles.section}>
          <div className={pageStyles.container}>
            <ProgramSelectionView
              programKey={program.key}
              pricingPlans={pricingPlans}
            />
          </div>
        </section>
      </HubPage>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async ({ locales }) => ({
  paths: (locales || ["en"]).flatMap((locale) =>
    newPrograms.map((program) => ({
      params: { id: String(program.id) },
      locale,
    })),
  ),
  fallback: false,
});
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const program = newPrograms.find((item) => item.id === Number(params?.id));
  return program ? { props: { programId: program.id } } : { notFound: true };
};
