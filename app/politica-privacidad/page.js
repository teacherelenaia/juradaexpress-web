// app/politica-privacidad/page.js
export const metadata = {
  title: "Política de privacidad",
  description:
    "Cómo trata juradaexpress.es tus datos personales: responsable, finalidades, base jurídica, destinatarios, plazos de conservación y cómo ejercer tus derechos RGPD.",
  alternates: {
    canonical: "https://juradaexpress.es/politica-privacidad",
    languages: {
      es: "https://juradaexpress.es/politica-privacidad",
      en: "https://juradaexpress.es/en/privacy-policy",
      "x-default": "https://juradaexpress.es/politica-privacidad",
    },
  },
};

const H2 =
  "mt-10 font-display text-2xl font-semibold leading-snug text-slate-900";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        Política de privacidad
      </h1>
      <p className="mt-4 max-w-[68ch] text-slate-600">
        Esta política explica cómo se tratan los datos personales en
        juradaexpress.es, conforme al Reglamento (UE) 2016/679 (RGPD) y a la
        Ley Orgánica 3/2018 (LOPDGDD).
      </p>

      <h2 className={H2}>Responsable del tratamiento</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        Elena Peñaranda Ortega, NIF 48399700H, con
        domicilio en Carril de los Leales, 10, C.P. 30009, La Arboleja, Murcia (España). Email:{" "}
        <a href="mailto:info@juradaexpress.es" className="link">
          info@juradaexpress.es
        </a>
        . Teléfono: 685 891 214.
      </p>

      <h2 className={H2}>Qué datos se recogen y para qué</h2>
      <ul className="mt-3 max-w-[68ch] list-disc space-y-2 pl-6 text-slate-600">
        <li>
          <strong className="text-slate-900">Formulario del catálogo y
          contacto por email o WhatsApp:</strong>{" "}
          nombre, email, teléfono y los documentos que quieres traducir.
          Finalidad: preparar tu presupuesto, responderte y, si encargas la
          traducción, prestar el servicio y facturarlo.
        </li>
        <li>
          <strong className="text-slate-900">Documentos que envías para
          traducir:</strong>{" "}
          pueden contener datos personales, incluso de categorías especiales.
          Se usan exclusivamente para realizar la traducción jurada y se
          tratan con estricta confidencialidad, como exige la deontología de
          la profesión.
        </li>
        <li>
          <strong className="text-slate-900">Pago online (Stripe):</strong>{" "}
          los datos de tu tarjeta los trata directamente Stripe; esta web no
          los recibe ni los almacena.
        </li>
        <li>
          <strong className="text-slate-900">Analítica (Google
          Analytics):</strong>{" "}
          solo si aceptas las cookies; con IP anonimizada. Ver la{" "}
          <a href="/politica-cookies" className="link">
            política de cookies
          </a>
          .
        </li>
      </ul>

      <h2 className={H2}>Base jurídica</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        La aplicación de medidas precontractuales y la ejecución del encargo
        (art. 6.1.b RGPD) para presupuestos y traducciones; el cumplimiento
        de obligaciones legales, fiscales y contables (art. 6.1.c); y tu
        consentimiento (art. 6.1.a) para las cookies de analítica.
      </p>

      <h2 className={H2}>Destinatarios</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        No se ceden datos a terceros salvo obligación legal. Prestan
        servicios como encargados de tratamiento: Web3Forms (envío del
        formulario), Stripe (pagos), Vercel (alojamiento) y Google
        (analítica, solo con consentimiento). Algunos de estos proveedores
        están en Estados Unidos y operan bajo el Marco de Privacidad de Datos
        UE-EE. UU. o cláusulas contractuales tipo.
      </p>

      <h2 className={H2}>Conservación</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        Las solicitudes de presupuesto no aceptadas se conservan como máximo
        un año. La documentación de encargos realizados se conserva durante
        los plazos exigidos por la normativa fiscal y por las obligaciones
        del traductor jurado, y después se elimina de forma segura.
      </p>

      <h2 className={H2}>Tus derechos</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        Puedes ejercer tus derechos de acceso, rectificación, supresión,
        oposición, limitación y portabilidad escribiendo a{" "}
        <a href="mailto:info@juradaexpress.es" className="link">
          info@juradaexpress.es
        </a>{" "}
        con una copia de tu documento de identidad. Si consideras que el
        tratamiento no es correcto, puedes reclamar ante la Agencia Española
        de Protección de Datos (
        <a
          href="https://www.aepd.es"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          aepd.es
        </a>
        ).
      </p>

      <p className="mt-8 text-sm text-slate-500">
        Última revisión: agosto de 2026.
      </p>
    </main>
  );
}
