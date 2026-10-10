// content/servicios/index.js
// Registro de las páginas de audiencia/servicio del encargo internacional.
// Cada módulo exporta { es, en } con la misma forma (ver ServicePage.js).
// Las rutas (sin contenido) viven en ./routes.js para los componentes cliente.
import * as visados from "./visados";
import * as fbi from "./fbi";
import * as acro from "./acro";
import * as nomadaDigital from "./nomada-digital";
import * as uscis from "./uscis";
import * as estadosUnidos from "./estados-unidos";
import * as india from "./india";
import * as urgente from "./urgente";
import * as irlanda from "./irlanda";
import * as canada from "./canada";
import * as australia from "./australia";
import * as traductorIngles from "./traductor-jurado-ingles";

export { SERVICE_ROUTES, INTERNATIONAL_MENU } from "./routes";

export const SERVICE_PAGES = [
  traductorIngles,
  visados,
  fbi,
  acro,
  nomadaDigital,
  uscis,
  estadosUnidos,
  india,
  urgente,
  irlanda,
  canada,
  australia,
];
