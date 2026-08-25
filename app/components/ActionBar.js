"use client";

// app/components/ActionBar.js
// Acciones de conversión fijas:
// - Móvil (<768 px): barra inferior con "WhatsApp" y "Pedir presupuesto".
//   El body reserva su altura en globals.css para no tapar contenido.
// - Escritorio: botón flotante de WhatsApp a 24 px de la esquina.
// El botón flotante desaparece en móvil porque la barra ya ofrece WhatsApp.
import { usePathname } from "next/navigation";
import { WHATSAPP_URL, WHATSAPP_URL_EN } from "../../content/site";

function track(label) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "cta_click", {
      event_category: "engagement",
      event_label: label,
    });
  }
}

export default function ActionBar() {
  const pathname = usePathname() || "/";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const whatsappUrl = isEnglish ? WHATSAPP_URL_EN : WHATSAPP_URL;
  const quoteHref = isEnglish ? "/en/documentos" : "/documentos";

  return (
    <>
      {/* Barra inferior fija (solo móvil) */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 px-3 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur md:hidden"
        role="region"
        aria-label={isEnglish ? "Quick actions" : "Acciones rápidas"}
      >
        <div className="grid h-16 grid-cols-2 items-center gap-2 py-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("bar_whatsapp")}
            className="btn btn-secondary h-full min-h-0 py-0 text-sm"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12.05 0C5.407 0 0 5.407 0 12.05c0 2.125.553 4.198 1.606 6.024L0 24l6.075-1.594a11.99 11.99 0 0 0 5.976 1.594h.005c6.643 0 12.05-5.407 12.05-12.05 0-3.22-1.254-6.246-3.532-8.524A11.982 11.982 0 0 0 12.05 0zm0 22.06a10.05 10.05 0 0 1-5.13-1.405l-.368-.218-3.812.999 1.017-3.716-.24-.383a10.037 10.037 0 0 1-1.539-5.363c0-5.548 4.516-10.064 10.077-10.064 2.692 0 5.223 1.05 7.126 2.955a10.001 10.001 0 0 1 2.951 7.12c0 5.549-4.517 10.075-10.082 10.075z" />
            </svg>
            WhatsApp
          </a>
          <a
            href={quoteHref}
            onClick={() => track("bar_presupuesto")}
            className="btn btn-primary h-full min-h-0 py-0 text-sm"
          >
            {isEnglish ? "Request a quote" : "Pedir presupuesto"}
          </a>
        </div>
      </div>

      {/* Botón flotante de WhatsApp (solo escritorio, a 24 px de la esquina) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("float_whatsapp")}
        aria-label={
          isEnglish ? "Message us on WhatsApp" : "Escríbenos por WhatsApp"
        }
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg md:flex"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12.05 0C5.407 0 0 5.407 0 12.05c0 2.125.553 4.198 1.606 6.024L0 24l6.075-1.594a11.99 11.99 0 0 0 5.976 1.594h.005c6.643 0 12.05-5.407 12.05-12.05 0-3.22-1.254-6.246-3.532-8.524A11.982 11.982 0 0 0 12.05 0zm0 22.06a10.05 10.05 0 0 1-5.13-1.405l-.368-.218-3.812.999 1.017-3.716-.24-.383a10.037 10.037 0 0 1-1.539-5.363c0-5.548 4.516-10.064 10.077-10.064 2.692 0 5.223 1.05 7.126 2.955a10.001 10.001 0 0 1 2.951 7.12c0 5.549-4.517 10.075-10.082 10.075z" />
        </svg>
      </a>
    </>
  );
}
