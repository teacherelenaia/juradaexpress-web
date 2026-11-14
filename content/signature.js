// content/signature.js
//
// «Cómo comprobar mi firma» / «How to verify my signature» (14/11/2026):
// un párrafo corto y tres pasos para comprobar en VALIDe la firma
// electrónica cualificada del PDF, más la pregunta para las FAQ (y su
// FAQPage). Los datos (Orden AUC/213/2025, certificado cualificado de la
// FNMT, URL de VALIDe) salen de content/site.js.
//
// Lo usan /traductor-jurado-ingles y /en/sworn-english-translator
// (content/servicios/traductor-jurado-ingles.js), /en/fbi-background-check-
// translation-spain (content/servicios/fbi.js) y /preguntas-frecuentes.
import { SIGNATURE_CERT, SIGNATURE_ORDER, VALIDE_URL } from "./site";
import { PERSON_NAME } from "./persona";

const VALIDE_HOST = VALIDE_URL.replace(/^https?:\/\//, "");

const TEXT = {
  es: {
    title: "Cómo comprobar mi firma",
    intro: `El PDF lleva mi firma electrónica cualificada (${SIGNATURE_ORDER}), hecha con un ${SIGNATURE_CERT.es}. Cualquiera puede comprobarla gratis en VALIDe, el servicio de validación de firmas del Gobierno de España, sin instalar nada.`,
    steps: [
      `Abre <a href="${VALIDE_URL}" target="_blank" rel="noopener noreferrer">VALIDe (${VALIDE_HOST})</a> y elige la opción de validar una firma.`,
      "Sube el PDF de la traducción tal como te lo envié.",
      `Comprueba que la firmante es ${PERSON_NAME} y que el certificado aparece como cualificado, emitido por la FNMT.`,
    ],
    q: "¿Cómo compruebo que la firma del PDF es válida?",
    a: `En VALIDe (${VALIDE_HOST}), el servicio de validación de firmas del Gobierno de España: abres la opción de validar una firma, subes el PDF tal como te lo envié y compruebas que la firmante es ${PERSON_NAME} y que el certificado es cualificado, emitido por la FNMT. Es gratis y no hay que instalar nada.`,
  },
  en: {
    title: "How to verify my signature",
    intro: `The PDF carries my qualified electronic signature (Spain's ${SIGNATURE_ORDER}), made with a ${SIGNATURE_CERT.en}. Anyone can check it for free on VALIDe, the Spanish government's signature validation service, with nothing to install.`,
    steps: [
      `Open <a href="${VALIDE_URL}" target="_blank" rel="noopener noreferrer">VALIDe (${VALIDE_HOST})</a> and choose the option to validate a signature.`,
      "Upload the PDF of the translation exactly as I sent it.",
      `Check that the signer is ${PERSON_NAME} and that the certificate is shown as qualified, issued by the FNMT.`,
    ],
    q: "How can I check that the signature on the PDF is valid?",
    a: `On VALIDe (${VALIDE_HOST}), the Spanish government's signature validation service: choose the option to validate a signature, upload the PDF exactly as I sent it and check that the signer is ${PERSON_NAME} and that the certificate is qualified, issued by the FNMT. It is free and there is nothing to install.`,
  },
};

export const signatureText = (locale = "es") => TEXT[locale === "en" ? "en" : "es"];

/** Sección para ServicePage: párrafo y tres pasos numerados. */
export function verifySignatureSection(locale = "es") {
  const t = signatureText(locale);
  return {
    id: locale === "en" ? "verify-signature" : "comprobar-firma",
    title: t.title,
    body: [t.intro, { steps: t.steps }],
  };
}

/** Pregunta para las FAQ (y su FAQPage). */
export function verifySignatureFaq(locale = "es") {
  const t = signatureText(locale);
  return { q: t.q, a: t.a };
}
