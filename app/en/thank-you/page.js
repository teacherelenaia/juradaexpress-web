// app/en/thank-you/page.js
//
// "After payment" redirect for the English Stripe Payment Links (25/10/2026):
//   https://juradaexpress.es/en/thank-you?session_id={CHECKOUT_SESSION_ID}
// Fires the «Compra en la web (Stripe)» Google Ads conversion with the real
// session amount. noindex and not in the sitemap. See
// app/components/ThankYouPage.js.
import ThankYouPage, { thankYouMetadata } from "../../components/ThankYouPage";

export const metadata = thankYouMetadata("en");

// Depends on ?session_id: rendered on every request.
export const dynamic = "force-dynamic";

export default function Page({ searchParams }) {
  return <ThankYouPage searchParams={searchParams} locale="en" />;
}
