// app/aviso-legal/page.js
export const metadata = {
  title: "Aviso legal",
  description:
    "Aviso legal de juradaexpress.es: identificación de la titular, condiciones de uso, propiedad intelectual y legislación aplicable.",
  alternates: {
    canonical: "https://juradaexpress.es/aviso-legal",
    languages: {
      es: "https://juradaexpress.es/aviso-legal",
      en: "https://juradaexpress.es/en/legal-notice",
      "x-default": "https://juradaexpress.es/aviso-legal",
    },
  },
};

const H2 =
  "mt-10 font-display text-2xl font-semibold leading-snug text-slate-900";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        Aviso legal
      </h1>
      <p className="mt-4 max-w-[68ch] text-slate-600">
        En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la
        Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se
        informa de los siguientes datos.
      </p>

      <h2 className={H2}>Titular del sitio web</h2>
      <ul className="mt-3 max-w-[68ch] space-y-1 text-slate-600">
        <li>
          <strong className="text-slate-900">Titular:</strong> Elena Peñaranda
          Ortega
        </li>
        <li>
          <strong className="text-slate-900">NIF:</strong> 48399700H
        </li>
        <li>
          <strong className="text-slate-900">Domicilio:</strong> Carril de los Leales, 10, C.P. 30009, La Arboleja, Murcia (España)
        </li>
        <li>
          <strong className="text-slate-900">Email:</strong>{" "}
          <a href="mailto:info@juradaexpress.es" className="link">
            info@juradaexpress.es
          </a>
        </li>
        <li>
          <strong className="text-slate-900">Teléfono:</strong>{" "}
          <a href="tel:+34685891214" className="link">
            685 891 214
          </a>
        </li>
        <li>
          <strong className="text-slate-900">Actividad:</strong> Traducción e
          interpretación jurada de inglés. Traductora-Intérprete Jurada
          nombrada por el Ministerio de Asuntos Exteriores, Unión Europea y
          Cooperación, nº de acreditación 7310.
        </li>
      </ul>

      <h2 className={H2}>Condiciones de uso</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        El acceso a juradaexpress.es es gratuito y atribuye la condición de
        usuario, que implica aceptar estas condiciones. El usuario se
        compromete a hacer un uso adecuado del sitio y de sus contenidos, y a
        no emplearlos para actividades ilícitas o contrarias a la buena fe.
        Los precios mostrados son orientativos: el presupuesto definitivo se
        confirma siempre por escrito antes de encargar la traducción.
      </p>

      <h2 className={H2}>Propiedad intelectual</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        Los contenidos de este sitio (textos, marca, logotipo y estructura)
        son titularidad de Elena Peñaranda Ortega o se usan con licencia de
        sus autores. No está permitida su reproducción o distribución con
        fines comerciales sin autorización expresa. Las fotografías de stock
        se utilizan bajo la licencia de su plataforma de origen.
      </p>

      <h2 className={H2}>Responsabilidad</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        La titular no se hace responsable del mal uso de los contenidos de
        este sitio ni de los contenidos de sitios de terceros enlazados. La
        información sobre trámites administrativos se ofrece a título
        orientativo: el criterio final corresponde siempre al organismo que
        tramita tu expediente.
      </p>

      <h2 className={H2}>Legislación aplicable</h2>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        Estas condiciones se rigen por la legislación española. Para
        cualquier controversia, las partes se someten a los juzgados y
        tribunales del domicilio del usuario cuando la normativa de consumo
        así lo establezca.
      </p>

      <p className="mt-8 text-sm text-slate-500">
        Consulta también la{" "}
        <a href="/politica-privacidad" className="link">
          política de privacidad
        </a>{" "}
        y la{" "}
        <a href="/politica-cookies" className="link">
          política de cookies
        </a>
        . Última revisión: agosto de 2026.
      </p>
    </main>
  );
}
