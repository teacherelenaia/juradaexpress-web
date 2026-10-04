"use client";

// app/components/HeaderActions.js
// Teléfono y CTA del header. En las rutas /en se muestran en inglés y el
// CTA enlaza al catálogo en inglés (FASE 2.6 del encargo internacional).
import { usePathname } from "next/navigation";
import { isEnglishPath } from "./MainNav";
import { PHONE_DISPLAY, PHONE_TEL } from "../../content/site";

export default function HeaderActions() {
  const pathname = usePathname() || "/";
  const english = isEnglishPath(pathname);

  return (
    <>
      <a
        href={`tel:${PHONE_TEL}`}
        className="btn btn-quiet-light btn-sm hidden xl:inline-flex"
        aria-label={english ? `Call +34 ${PHONE_DISPLAY}` : `Llamar ${PHONE_DISPLAY}`}
      >
        {english ? `+34 ${PHONE_DISPLAY}` : PHONE_DISPLAY}
      </a>
      <a
        href={english ? "/en/documentos" : "/documentos"}
        className="btn btn-gold btn-sm max-sm:px-3"
      >
        {/* En móviles de menos de 380 px la etiqueta completa no cabe junto al
            logo y el botón del menú: se acorta, sin ocultar el botón. */}
        <span className="max-[379px]:hidden">
          {english ? "Request a quote" : "Pedir presupuesto"}
        </span>
        <span className="min-[380px]:hidden">
          {english ? "Get a quote" : "Presupuesto"}
        </span>
      </a>
    </>
  );
}
