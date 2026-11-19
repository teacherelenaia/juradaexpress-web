// app/components/SendDocumentsButton.js
//
// Botón «Enviar documentos» / «Send documents» (19/11/2026) que lleva a la
// página de subida. Se usa en la página de expedientes, en las de visado y
// en la de gracias tras el pago (en la cabecera va en HeaderActions).
import { IconUpload } from "./Icons";

export const SEND_DOCS_HREF = { es: "/enviar-documentos", en: "/en/send-documents" };
const LABEL = { es: "Enviar documentos", en: "Send documents" };

export default function SendDocumentsButton({ locale = "es", className = "btn btn-gold", label }) {
  return (
    <a href={SEND_DOCS_HREF[locale] || SEND_DOCS_HREF.es} className={className} data-cta="enviar_documentos">
      <IconUpload className="h-5 w-5" />
      {label || LABEL[locale] || LABEL.es}
    </a>
  );
}
