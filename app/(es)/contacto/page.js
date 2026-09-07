// app/contacto/page.js
import SocialIcons from "../../components/SocialIcons";
import {
  TIMEZONE_NOTE,
  INTERNATIONAL_SHIPPING,
  EMAIL,
} from "../../../content/site";

export const metadata = {
  title: "Contacto — Traductora Jurada de Inglés, desde cualquier país",
  description:
    "Contacta con Elena Peñaranda, traductora jurada de inglés (MAEC nº 7310), por WhatsApp, email o teléfono desde España o cualquier país. Presupuesto en menos de 2 h y entrega en 24/48 h.",
  alternates: {
    canonical: "https://juradaexpress.es/contacto",
    languages: {
      es: "https://juradaexpress.es/contacto",
      en: "https://juradaexpress.es/en/contacto",
      "x-default": "https://juradaexpress.es/contacto",
    },
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">Contacto</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        ¿Necesitas una traducción jurada en Murcia? Escríbenos por WhatsApp o
        email con tu documento escaneado y te respondemos con presupuesto
        cerrado y plazo de entrega.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quisiera%20un%20presupuesto"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-white p-6 ring-1 ring-stone-200 hover:shadow"
        >
          <h2 className="text-2xl font-semibold leading-snug text-brand-navy md:text-3xl">WhatsApp</h2>
          <p className="mt-2 text-sm text-slate-600">
            Respuesta rápida, ideal para presupuesto inmediato.
          </p>
          <p className="mt-4 font-medium">685 891 214</p>
        </a>

        <a
          href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada"
          className="rounded-xl bg-white p-6 ring-1 ring-stone-200 hover:shadow"
        >
          <h2 className="text-2xl font-semibold leading-snug text-brand-navy md:text-3xl">Email</h2>
          <p className="mt-2 text-sm text-slate-600">
            Envíanos tu documento escaneado y los detalles del encargo.
          </p>
          <p className="mt-4 font-medium">info@juradaexpress.es</p>
        </a>

        <a
          href="tel:+34685891214"
          className="rounded-xl bg-white p-6 ring-1 ring-stone-200 hover:shadow"
        >
          <h2 className="text-2xl font-semibold leading-snug text-brand-navy md:text-3xl">Teléfono</h2>
          <p className="mt-2 text-sm text-slate-600">
            Llámanos directamente si lo prefieres.
          </p>
          <p className="mt-4 font-medium">685 891 214</p>
        </a>
      </div>

      <div className="mt-10 rounded-xl bg-brand-navy-50 p-6 ring-1 ring-brand-navy-100">
        <h2 className="text-2xl font-semibold leading-snug text-slate-900 md:text-3xl">Traductor jurado en Murcia</h2>
        <p className="mt-2 text-sm text-slate-600">
          Traducciones juradas Español ⇆ Inglés, firmadas y selladas, válidas
          ante organismos oficiales. Envíos a toda España y al extranjero.
          Entrega habitual en 24/48 h.{" "}
          <a href="/traductor-jurado-murcia" className="link">
            Más sobre el servicio en Murcia →
          </a>
        </p>
      </div>

      {/* Clientes fuera de España (FASE 2.7) */}
      <section
        aria-labelledby="contacto-internacional"
        className="mt-10 rounded-xl bg-stone-50 p-6 ring-1 ring-stone-200 md:p-8"
      >
        <h2
          id="contacto-internacional"
          className="font-display text-balance text-2xl font-semibold leading-snug tracking-[-0.02em] text-slate-900 md:text-3xl"
        >
          Si me escribes desde fuera de España
        </h2>
        <p className="mt-3 max-w-[68ch] text-slate-600">
          Trabajo cada semana con clientes de Reino Unido, Irlanda, Estados
          Unidos, Canadá, India y Australia. Todo el proceso es digital, así
          que da igual desde dónde me escribas; solo cambia la hora.
        </p>
        <dl className="mt-6 grid gap-x-8 gap-y-5 text-sm md:grid-cols-2">
          <div>
            <dt className="font-semibold text-slate-900">Horario</dt>
            <dd className="mt-1 text-slate-600">{TIMEZONE_NOTE.es}. Si me escribes fuera de ese horario, te contesto a primera hora del siguiente día laborable.</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">WhatsApp y teléfono</dt>
            <dd className="mt-1 text-slate-600">
              <a href="https://wa.me/34685891214" className="link" target="_blank" rel="noopener noreferrer">
                +34 685 891 214
              </a>
              . WhatsApp funciona desde cualquier país; para llamar, marca el
              prefijo internacional +34.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Email</dt>
            <dd className="mt-1 text-slate-600">
              <a href={`mailto:${EMAIL}`} className="link">
                {EMAIL}
              </a>
              . Adjunta el documento escaneado completo o un enlace a la carpeta.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Pago</dt>
            <dd className="mt-1 text-slate-600">
              Tarjeta internacional (Visa, Mastercard, American Express) a través
              de Stripe, en euros; tu banco aplica el cambio. No necesitas cuenta
              en España.
            </dd>
          </div>
          <div className="md:col-span-2">
            <dt className="font-semibold text-slate-900">Entrega</dt>
            <dd className="mt-1 text-slate-600">
              PDF firmado digitalmente, válido para la presentación telemática.
              {INTERNATIONAL_SHIPPING.available
                ? ` ${INTERNATIONAL_SHIPPING.note.es}.`
                : ""}
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-sm text-slate-600">
          Guías por país:{" "}
          <a href="/traduccion-jurada-estados-unidos" className="link">
            Estados Unidos
          </a>
          ,{" "}
          <a href="/traduccion-jurada-india" className="link">
            India
          </a>
          ,{" "}
          <a href="/traduccion-jurada-britanicos-espana" className="link">
            Reino Unido
          </a>
          . Para inmigración en Estados Unidos,{" "}
          <a href="/traduccion-certificada-uscis" className="link">
            traducción certificada para USCIS
          </a>
          .
        </p>
      </section>

      <div className="mt-8 flex items-center gap-3">
        <span className="text-sm text-slate-600">También estoy en</span>
        <SocialIcons className="text-brand-navy" />
      </div>
    </main>
  );
}
