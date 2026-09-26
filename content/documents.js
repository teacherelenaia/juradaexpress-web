// content/documents.js
// Catálogo de documentos para /documentos. price: null = "Pendiente de presupuestar".

export const DOCUMENTS = [
  { id: "partida-nacimiento", name: "Partida de nacimiento", price: 35, icon: "fileText" },
  { id: "certificado-matrimonio", name: "Certificado de matrimonio", price: 35, icon: "heart" },
  { id: "antecedentes-penales", name: "Certificado de antecedentes penales", price: 35, icon: "shieldCheck" },
  { id: "permiso-conducir", name: "Permiso de conducir", price: 40, icon: "creditCard" },
  { id: "titulo-universitario", name: "Título universitario (1 página)", price: 50, icon: "graduationCap" },
  { id: "expediente-academico", name: "Expediente académico", price: null, icon: "bookOpen" },
  { id: "certificado-empresa", name: "Certificado de empresa / nómina", price: 45, icon: "briefcase" },
  { id: "contrato-escritura", name: "Contrato o escritura", price: null, icon: "edit" },
  { id: "dni-pasaporte", name: "DNI o pasaporte", price: null, icon: "creditCard" },
  { id: "testamento-herencia", name: "Testamento y documentos de herencia", price: null, icon: "edit" },
  { id: "certificado-medico", name: "Certificado médico", price: null, icon: "heart" },
  { id: "otro-documento", name: "Otro documento", price: null, icon: "helpCircle" },
];

// Precio mínimo real del catálogo (35 € a 26/09/2026: partida de
// nacimiento, matrimonio y penales). Se usa en el title/description y en
// el chip del hero de la home ES/EN, en /precios y en las landings, para
// que "desde X €" nunca se desincronice de la tabla de arriba.
export const MIN_PRICE = Math.min(
  ...DOCUMENTS.filter((d) => d.price != null).map((d) => d.price)
);
