import { ButtonHTMLAttributes } from "react";
import styles from "./hub-action.module.css";

export type HubActionVariant = "primary" | "accent" | "outline" | "text";
export const hubActionClass = (
  variant: HubActionVariant,
  compact = false,
  className = "",
) =>
  `${styles.action} ${styles[variant]} ${compact ? styles.compact : ""} ${className}`;

/** Decorative spans belong to the containing action; no nested control or extra tab stop. */
export const HubArrow = ({ circle = false }: { circle?: boolean }) => (
  <span
    aria-hidden="true"
    className={`${styles.arrow} ${circle ? styles.circle : ""}`}
  >
    <span className={styles.glyph} data-hub-arrow-glyph>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  </span>
);

export const HubButton = ({
  children,
  variant = "primary",
  compact = false,
  arrow = true,
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: HubActionVariant;
  compact?: boolean;
  arrow?: boolean;
}) => (
  <button
    {...props}
    type={type}
    className={hubActionClass(variant, compact, className)}
    data-hub-action
  >
    {children}
    {arrow && <HubArrow circle={variant !== "text"} />}
  </button>
);
