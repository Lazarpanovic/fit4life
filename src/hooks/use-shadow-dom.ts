import { useEffect } from "react";

export const useShadowDOM = (elId: string, description?: string | null) => {
  useEffect(() => {
    const host = document.querySelector(elId);
    if (host && !host.shadowRoot) {
      host.attachShadow({ mode: "open" });
    }
    if (host?.shadowRoot && description) {
      host.shadowRoot.innerHTML = description;
    }
  }, [description, elId]);
};
