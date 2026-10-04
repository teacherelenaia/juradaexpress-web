// content/persona.js
//
// Entidad Person de Elena para el JSON-LD de todo el sitio (una sola
// definición, un solo @id). La entidad completa se emite en el footer
// (SiteShell) junto al ProfessionalService, que la enlaza como founder y
// employee; las páginas de blog y "Sobre mí" solo la referencian por @id
// (más name y url, para que los lectores que no resuelven grafos sigan
// viendo el autor). Si cambia un dato (nombre, número MAEC, redes), se
// cambia aquí.
import {
  EMAIL,
  PHONE_TEL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  LINKEDIN_URL,
  GOOGLE_BUSINESS_URL,
  MAEC_LIST_URL,
} from "./site";

const BASE = "https://juradaexpress.es";

export const PERSON_ID = `${BASE}/#elena`;
export const ORGANIZATION_ID = `${BASE}/#organization`;
export const PERSON_NAME = "Elena Peñaranda Ortega";
export const MAEC_NUMBER = "7310";
// Año del nombramiento como Traductora-Intérprete Jurada (vigente desde
// entonces). Los años de experiencia se calculan siempre a partir de aquí
// para que ningún texto se quede anticuado.
export const SINCE = 2009;
export const yearsOfExperience = () => new Date().getFullYear() - SINCE;

// Listado oficial de Traductores/as-Intérpretes Jurados/as del MAEC, donde
// cualquiera puede comprobar el nombramiento nº 7310. La URL vive en
// content/site.js (MAEC_LIST_URL) para que también la usen las garantías.
export const MAEC_URL = MAEC_LIST_URL;

const JOB_TITLE = {
  es: "Traductora-Intérprete Jurada de Inglés",
  en: "Sworn Translator-Interpreter of English",
};

const CREDENTIAL_NAME = {
  es: `Traductora-Intérprete Jurada nombrada por el MAEC, nº ${MAEC_NUMBER}`,
  en: `Sworn Translator-Interpreter appointed by Spain's Ministry of Foreign Affairs, no. ${MAEC_NUMBER}`,
};

const CREDENTIAL_DESCRIPTION = {
  es: `Nombramiento vigente desde ${SINCE}.`,
  en: `Appointment in force since ${SINCE}.`,
};

const MINISTRY = {
  es: "Ministerio de Asuntos Exteriores, Unión Europea y Cooperación",
  en: "Spanish Ministry of Foreign Affairs, European Union and Cooperation",
};

/** Referencia corta a la Person (para author, founder, employee…). */
export function personRef(locale = "es") {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON_NAME,
    url: locale === "en" ? `${BASE}/en/about` : `${BASE}/sobre-mi`,
  };
}

/** Entidad Person completa (se emite una vez por página, en SiteShell). */
export function personJsonLd(locale = "es") {
  const l = locale === "en" ? "en" : "es";
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON_NAME,
    givenName: "Elena",
    familyName: "Peñaranda Ortega",
    jobTitle: JOB_TITLE[l],
    identifier: MAEC_NUMBER,
    url: l === "en" ? `${BASE}/en/about` : `${BASE}/sobre-mi`,
    email: EMAIL,
    telephone: PHONE_TEL,
    knowsLanguage: ["es", "en"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Murcia",
      addressRegion: "Murcia",
      addressCountry: "ES",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: CREDENTIAL_NAME[l],
      credentialCategory:
        l === "en" ? "Sworn Translator-Interpreter" : "Traductora-Intérprete Jurada",
      identifier: MAEC_NUMBER,
      description: CREDENTIAL_DESCRIPTION[l],
      dateCreated: String(SINCE),
      url: MAEC_URL,
      recognizedBy: {
        "@type": "GovernmentOrganization",
        name: MINISTRY[l],
        url: "https://www.exteriores.gob.es/",
      },
    },
    worksFor: {
      "@type": "ProfessionalService",
      "@id": ORGANIZATION_ID,
      name: "Jurada Express",
      url: `${BASE}/`,
    },
    sameAs: [
      MAEC_URL,
      INSTAGRAM_URL,
      FACEBOOK_URL,
      LINKEDIN_URL,
      GOOGLE_BUSINESS_URL,
    ].filter(Boolean),
  };
}
