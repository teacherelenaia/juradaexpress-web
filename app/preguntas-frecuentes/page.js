// app/preguntas-frecuentes/page.js
export const metadata = {
  title: "Preguntas Frecuentes — Traducción Jurada en Murcia",
  description:
    "Resolvemos tus dudas sobre traducción jurada en Murcia: validez, plazos, precios, entrega y documentos aceptados.",
  alternates: {
    canonical: "https://juradaexpress.es/preguntas-frecuentes",
    languages: {
      es: "https://juradaexpress.es/preguntas-frecuentes",
      en: "https://juradaexpress.es/en/preguntas-frecuentes",
      "x-default": "https://juradaexpress.es/preguntas-frecuentes",
    },
  },
};

const faqs = [
  {
    q: "¿La traducción jurada es válida en todo el territorio?",
    a: "Sí. Las traducciones juradas firmadas y selladas por traductor jurado son válidas ante organismos oficiales en toda España.",
  },
  {
    q: "¿Entregáis en papel y digital?",
    a: "Sí. Entregamos PDF firmado digitalmente y, si lo necesitas, envío físico a tu dirección.",
  },
  {
    q: "¿Puedo tener la traducción en 24/48 h?",
    a: "Para documentos habituales, sí. Si son más de 20 folios, acordamos un calendario específico.",
  },
  {
    q: "¿Qué documentos puedo traducir de forma jurada?",
    a: "Certificados de nacimiento, matrimonio y penales, títulos y expedientes académicos, contratos, poderes notariales, estatutos y otros documentos oficiales o mercantiles.",
  },
  {
    q: "¿Cuánto cuesta una traducción jurada?",
    a: "El precio depende de la extensión y complejidad del documento. Consulta nuestras tarifas orientativas en la página de precios o pide presupuesto cerrado enviando tu documento.",
  },
  {
    q: "¿Cómo os envío el documento?",
    a: "Puedes enviarnos el escaneo o foto legible por email o WhatsApp, indicando idioma de origen y destino, y el uso que le vas a dar.",
  },
  {
    q: "¿Hacéis envíos fuera de Murcia o al extranjero?",
    a: "Sí, realizamos envíos a toda España y al extranjero, tanto en formato digital como en papel.",
  },
  {
    q: "¿La traducción jurada lleva firma y sello?",
    a: "Sí. Toda traducción jurada va firmada y sellada por un traductor jurado nombrado por el Ministerio de Asuntos Exteriores, lo que le da validez oficial.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">Preguntas frecuentes</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Resolvemos las dudas más habituales sobre traducción jurada en
        Murcia. Si no encuentras respuesta a tu pregunta,{" "}
        <a href="/contacto" className="link">
          contacta con nosotros
        </a>
        .
      </p>

      <div className="mt-8 divide-y rounded-xl ring-1 ring-stone-200 bg-white">
        {faqs.map((f, idx) => (
          <details key={idx} className="p-5">
            <summary className="cursor-pointer font-medium">{f.q}</summary>
            <p className="mt-2 text-sm text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
              },
            })),
          }),
        }}
      />
    </main>
  );
}
