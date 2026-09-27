// content/documents.js
// Catálogo de documentos para /documentos. price: null = "Pendiente de presupuestar".
// nameEn: nombre en inglés para la calculadora de precio (QuoteCalculator) en /en.

export const DOCUMENTS = [
  { id: "partida-nacimiento", name: "Partida de nacimiento", nameEn: "Birth certificate", price: 35, icon: "fileText" },
  { id: "certificado-matrimonio", name: "Certificado de matrimonio", nameEn: "Marriage certificate", price: 35, icon: "heart" },
  { id: "antecedentes-penales", name: "Certificado de antecedentes penales", nameEn: "Criminal record certificate", price: 35, icon: "shieldCheck" },
  { id: "permiso-conducir", name: "Permiso de conducir", nameEn: "Driving licence", price: 40, icon: "creditCard" },
  { id: "titulo-universitario", name: "Título universitario (1 página)", nameEn: "University degree (1 page)", price: 50, icon: "graduationCap" },
  { id: "expediente-academico", name: "Expediente académico", nameEn: "Academic transcript", price: null, icon: "bookOpen" },
  { id: "certificado-empresa", name: "Certificado de empresa / nómina", nameEn: "Employment certificate / payslip", price: 45, icon: "briefcase" },
  { id: "contrato-escritura", name: "Contrato o escritura", nameEn: "Contract or deed", price: null, icon: "edit" },
  { id: "dni-pasaporte", name: "DNI o pasaporte", nameEn: "ID card or passport", price: null, icon: "creditCard" },
  { id: "testamento-herencia", name: "Testamento y documentos de herencia", nameEn: "Will and inheritance documents", price: null, icon: "edit" },
  { id: "certificado-medico", name: "Certificado médico", nameEn: "Medical certificate", price: null, icon: "heart" },
  { id: "otro-documento", name: "Otro documento", nameEn: "Any other document", price: null, icon: "helpCircle" },
];

// Precio mínimo real del catálogo (35 € a 26/09/2026: partida de
// nacimiento, matrimonio y penales). Se usa en el title/description y en
// el chip del hero de la home ES/EN, en /precios y en las landings, para
// que "desde X €" nunca se desincronice de la tabla de arriba.
export const MIN_PRICE = Math.min(
  ...DOCUMENTS.filter((d) => d.price != null).map((d) => d.price)
);
