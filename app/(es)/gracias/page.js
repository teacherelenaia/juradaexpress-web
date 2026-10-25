// app/(es)/gracias/page.js
//
// Redirección «después del pago» de los Payment Links de Stripe (25/10/2026):
//   https://juradaexpress.es/gracias?session_id={CHECKOUT_SESSION_ID}
// Dispara la conversión «Compra en la web (Stripe)» con el importe real de
// la sesión. noindex y fuera del sitemap. Ver app/components/ThankYouPage.js.
import ThankYouPage, { thankYouMetadata } from "../../components/ThankYouPage";

export const metadata = thankYouMetadata("es");

// La página depende de ?session_id: se renderiza en cada petición.
export const dynamic = "force-dynamic";

export default function Page({ searchParams }) {
  return <ThankYouPage searchParams={searchParams} locale="es" />;
}
