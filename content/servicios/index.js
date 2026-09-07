// content/servicios/index.js
// Registro de las páginas de audiencia/servicio del encargo internacional.
// Cada módulo exporta { es, en } con la misma forma (ver ServicePage.js).
// Las rutas (sin contenido) viven en ./routes.js para los componentes cliente.
import * as nomadaDigital from "./nomada-digital";
import * as uscis from "./uscis";
import * as estadosUnidos from "./estados-unidos";
import * as india from "./india";
import * as urgente from "./urgente";

export { SERVICE_ROUTES, INTERNATIONAL_MENU } from "./routes";

export const SERVICE_PAGES = [nomadaDigital, uscis, estadosUnidos, india, urgente];
