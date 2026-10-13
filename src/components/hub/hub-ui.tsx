import Link from "next/link";
import Image from "next/image";
import { MouseEventHandler, ReactNode } from "react";
import { HubArrow, HubActionVariant, hubActionClass } from "./hub-action";
import styles from "./hub-ui.module.css";

export const HubLink = ({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  href: string;
  children: ReactNode;
  variant?: HubActionVariant;
  className?: string;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={hubActionClass(variant, false, className)}
    data-hub-action
  >
    {children}
    <HubArrow circle={variant !== "text"} />
  </Link>
);

export const BrandWordmarkContent = () => (
  <>
    <Image
      src="/assets/fit4life/logo-mark-dark.svg"
      alt=""
      width={44}
      height={38}
    />
    <span>
      Fit<span className={styles.four}>4</span>Life{" "}
      <span className={styles.hub}>Hub</span>
    </span>
  </>
);

export const brandWordmarkClass = styles.wordmark;
export const BrandWordmark = ({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) => (
  <Link
    href="/"
    className={`${styles.wordmark} ${className}`}
    aria-label="Fit4Life Hub"
    onClick={onClick}
  >
    <BrandWordmarkContent />
  </Link>
);

export const HubSectionHeading = ({
  label,
  title,
  children,
  href,
  linkText,
  id,
}: {
  label: string;
  title: string;
  children?: ReactNode;
  href?: string;
  linkText?: string;
  id?: string;
}) => (
  <div className={styles.sectionHeading} data-reveal>
    <div>
      <p className={styles.eyebrow}>{label}</p>
      <h2 id={id}>{title}</h2>
      {children && <p className={styles.description}>{children}</p>}
    </div>
    {href && (
      <HubLink href={href} variant="text">
        {linkText}
      </HubLink>
    )}
  </div>
);
