// scripts/payment-links-redirect.mjs
//
// Pone la redirección a /gracias o /en/thank-you a los Payment Links activos
// que sigan con la página de confirmación de Stripe («hosted_confirmation»).
// Misma regla que el webhook (app/lib/paymentLinkRedirect.mjs). Los enlaces
// que ya redirigen a algún sitio no se tocan, así que se puede pasar las
// veces que haga falta.
//
// Se pasó una vez el 02/11/2026 para los enlaces creados desde el 25/10
// (los anteriores ya se habían cambiado ese día). Desde entonces el webhook
// lo hace solo con cada enlace nuevo; esto queda para repasos puntuales,
// p. ej. si el webhook estuvo caído.
//
// Uso (sin --apply solo enseña lo que haría):
//   STRIPE_SECRET_KEY=sk_live_… node scripts/payment-links-redirect.mjs
//   STRIPE_SECRET_KEY=sk_live_… node scripts/payment-links-redirect.mjs --apply
import Stripe from "stripe";
import { ensurePaymentLinkRedirect, chooseRedirect, textsFromLineItems, hasRedirect } from "../app/lib/paymentLinkRedirect.mjs";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Falta STRIPE_SECRET_KEY");
  process.exit(1);
}
const apply = process.argv.includes("--apply");
const stripe = new Stripe(key);

const pending = [];
for await (const link of stripe.paymentLinks.list({ active: true, limit: 100 })) {
  if (!hasRedirect(link)) pending.push(link);
}
console.log(`${pending.length} Payment Links activos sin redirección${apply ? "" : " (simulación; --apply para cambiarlos)"}`);

const counts = {};
for (const link of pending) {
  let result;
  if (apply) {
    result = await ensurePaymentLinkRedirect(stripe, link);
  } else {
    const items = await stripe.paymentLinks.listLineItems(link.id, { limit: 100, expand: ["data.price.product"] });
    result = { changed: false, ...chooseRedirect({ currency: link.currency, texts: textsFromLineItems(items.data) }) };
  }
  counts[result.url] = (counts[result.url] || 0) + 1;
  console.log(`${link.id}\t${link.currency}\t${result.url}\t${result.reason}`);
}
console.log(counts);
