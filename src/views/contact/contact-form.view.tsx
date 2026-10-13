import { ChangeEvent, useState } from "react";
import { HubField, HubForm } from "../../components/hub/hub-form";
import { useTranslation } from "../../i18n/use-translation";

export const ContactFormView = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const change = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) =>
    setFormData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  return (
    <HubForm
      id="contact-form"
      embedded
      title={t.contactSection.formTitle}
      description={t.contactSection.infoDescription}
      submit={t.contactSection.submit}
    >
      <HubField
        name="firstName"
        label={t.contactSection.fields.firstName}
        value={formData.firstName}
        onChange={change}
        required
        inline
      />
      <HubField
        name="lastName"
        label={t.contactSection.fields.lastName}
        value={formData.lastName}
        onChange={change}
        required
        inline
      />
      <HubField
        name="email"
        label={t.contactSection.fields.email}
        value={formData.email}
        onChange={change}
        type="email"
        required
        inline
      />
      <HubField
        name="phone"
        label={t.contactSection.fields.phone}
        value={formData.phone}
        onChange={change}
        type="tel"
        inline
      />
      <HubField
        name="message"
        label={t.contactSection.fields.message}
        value={formData.message}
        onChange={change}
        type="textarea"
        required
        inline
      />
    </HubForm>
  );
};
