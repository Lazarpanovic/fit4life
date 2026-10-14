import {
  HubPage,
  HubPageMeta,
  pageStyles as styles,
} from "../components/hub/page-ui";
import { HubLink } from "../components/hub/hub-ui";
import { useTranslation } from "../i18n/use-translation";
export default function ServerErrorPage() {
  const { t } = useTranslation();
  return (
    <>
      <HubPageMeta
        title="500 | Fit4Life Hub"
        description={t.ui.unavailable}
        path="/500"
        noindex
      />
      <HubPage>
        <div className={styles.notFound}>
          <p>500</p>
          <h1>{t.ui.unavailable}</h1>
          <HubLink href="/" variant="primary">
            {t.ui.backHome}
          </HubLink>
        </div>
      </HubPage>
    </>
  );
}
