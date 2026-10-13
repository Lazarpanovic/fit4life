import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./detail-ui.module.css";
export const HubDetailHero = ({
  image,
  label,
  title,
  description,
  tags,
  children,
  backHref,
  backLabel,
}: {
  image: string;
  label: string;
  title: string;
  description: string;
  tags?: string[];
  children?: ReactNode;
  backHref?: string;
  backLabel?: string;
}) => (
  <section data-tone="dark" className={styles.hero}>
    <Image
      src={image}
      alt=""
      fill
      priority
      sizes="100vw"
      className={styles.heroImage}
    />
    <div className={styles.heroContent} data-reveal>
      {backHref && (
        <Link href={backHref} className={styles.back}>
          ← {backLabel}
        </Link>
      )}
      {tags && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
      <p className={styles.eyebrow}>{label}</p>
      <h1>{title}</h1>
      <p className={styles.description}>{description}</p>
      {children}
    </div>
  </section>
);
export { styles as detailStyles };
