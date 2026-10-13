import { ChangeEvent, ReactNode } from "react";
import { HubButton } from "./hub-action";
import styles from "./hub-form.module.css";

export const HubField = ({
  name,
  label,
  value,
  onChange,
  required = false,
  type = "text",
  readOnly = false,
  inline = false,
  children,
}: {
  name: string;
  label: string;
  value: string;
  onChange?: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  required?: boolean;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  readOnly?: boolean;
  inline?: boolean;
  children?: ReactNode;
}) => {
  const id = `field-${name}`;
  const cleanLabel = label.replace(/\s*\*$/, "");
  const common = {
    id,
    name,
    value,
    onChange,
    required,
    className: styles.control,
    placeholder: inline ? `${cleanLabel}${required ? " *" : ""}` : undefined,
  };
  return (
    <div
      className={`${styles.field} ${type === "textarea" ? styles.wide : ""} ${inline ? styles.inline : ""}`}
    >
      <label htmlFor={id} className={inline ? styles.srOnly : undefined}>
        {cleanLabel}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {type === "textarea" ? (
        <textarea {...common} rows={6} />
      ) : type === "select" ? (
        <select {...common}>{children}</select>
      ) : (
        <input
          {...common}
          type={type}
          readOnly={readOnly}
          autoComplete={
            (
              {
                firstName: "given-name",
                lastName: "family-name",
                email: "email",
                phone: "tel",
              } as Record<string, string>
            )[name]
          }
        />
      )}
    </div>
  );
};
export const HubForm = ({
  children,
  title,
  description,
  submit,
  embedded = false,
  id,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
  submit: string;
  embedded?: boolean;
  id?: string;
}) => (
  <div
    id={id}
    className={`${styles.panel} ${embedded ? styles.embedded : ""}`}
    data-reveal
  >
    {title && <h2>{title}</h2>}
    {description && <p className={styles.description}>{description}</p>}
    <form
      action={`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`}
      method="POST"
      className={styles.form}
    >
      <div className={styles.fields}>{children}</div>
      <HubButton type="submit" className={styles.submit}>
        {submit}
      </HubButton>
    </form>
  </div>
);
