// app/(es)/documentos/pago-exitoso/page.js
//
// Stripe redirige aquí con ?session_id=cs_… tras pagar en el checkout de la
// web (app/api/create-checkout-session). Misma página que /gracias
// (Payment Links): ver app/components/ThankYouPage.js.
import ThankYouPage, { thankYouMetadata } from "../../../components/ThankYouPage";

export const metadata = thankYouMetadata("es");

// La página depende de ?session_id: se renderiza en cada petición.
export const dynamic = "force-dynamic";

export default function Page({ searchParams }) {
  return <ThankYouPage searchParams={searchParams} locale="es" />;
}
