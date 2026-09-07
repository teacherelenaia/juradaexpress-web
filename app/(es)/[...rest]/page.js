// app/(es)/[...rest]/page.js
// Con dos root layouts (app/(es) y app/en) no puede existir app/not-found.js
// global. Este catch-all no genera ninguna ruta (dynamicParams = false) y
// hace que cualquier URL no reconocida devuelva el 404 de app/(es)/not-found.js
// con <html lang="es">. Solo las URL desconocidas se sirven bajo demanda;
// todas las páginas reales siguen siendo estáticas (○ en el build).
import { notFound } from "next/navigation";

export default function CatchAll() {
  notFound();
}
