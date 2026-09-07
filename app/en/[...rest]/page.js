// app/en/[...rest]/page.js
// Catch-all: cualquier /en/... desconocida devuelve el 404 en inglés
// (app/en/not-found.js) dentro del root layout con lang="en". Solo las URL
// desconocidas se sirven bajo demanda; las páginas reales siguen estáticas.
import { notFound } from "next/navigation";

export default function CatchAll() {
  notFound();
}
