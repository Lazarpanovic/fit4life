import {
  HubPage,
  HubPageMeta,
  pageStyles as styles,
} from "../components/hub/page-ui";
import { HubLink } from "../components/hub/hub-ui";
import { useTranslation } from "../i18n/use-translation";
export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <>
      <HubPageMeta
        title="404 | Fit4Life Hub"
        description={t.ui.notFound}
        path="/404"
        noindex
      />
      <HubPage>
        <div className={styles.notFound}>
          <p>404</p>
          <h1>{t.ui.notFound}</h1>
          <HubLink href="/" variant="primary">
            {t.ui.backHome}
          </HubLink>
        </div>
      </HubPage>
    </>
  );
}
