// app/politica-cookies/page.js
export const metadata = {
  title: "Política de cookies",
  description:
    "Qué cookies usa juradaexpress.es, para qué sirven, cuánto duran y cómo aceptarlas, rechazarlas o retirar tu consentimiento.",
  alternates: {
    canonical: "https://juradaexpress.es/politica-cookies",
    languages: {
      es: "https://juradaexpress.es/politica-cookies",
      en: "https://juradaexpress.es/en/cookie-policy",
      "x-default": "https://juradaexpress.es/politica-cookies",
    },
  },
};

const COOKIES = [
  {
    name: "cookie_consent",
    provider: "juradaexpress.es",
    duration: "Persistente (localStorage)",
    purpose:
      "Recuerda si has aceptado o rechazado las cookies de analítica para no volver a preguntarte.",
    type: "Técnica (exenta de consentimiento)",
  },
  {
    name: "_ga",
    provider: "Google Analytics 4",
    duration: "2 años",
    purpose:
      "Distingue a los usuarios mediante un identificador aleatorio para medir visitas de forma agregada.",
    type: "Analítica (solo con tu consentimiento)",
  },
  {
    name: "_ga_*",
    provider: "Google Analytics 4",
    duration: "2 años",
    purpose:
      "Mantiene el estado de la sesión de medición de cada propiedad de Google Analytics.",
    type: "Analítica (solo con tu consentimiento)",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        Política de cookies
      </h1>
      <p className="mt-4 text-slate-600">
        Esta política explica qué cookies utiliza{" "}
        <strong className="text-slate-900">juradaexpress.es</strong>, titularidad
        de Elena Peñaranda Ortega [[COMPLETAR: NIF y dirección fiscal para
        identificar a la responsable]], para qué sirven y cómo puedes
        gestionarlas.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold leading-snug text-slate-900">
        ¿Qué son las cookies?
      </h2>
      <p className="mt-3 text-slate-600">
        Son pequeños archivos que el navegador guarda cuando visitas una web.
        Sirven, por ejemplo, para recordar tus preferencias o para medir de
        forma agregada cómo se usa la página. En esta web solo usamos una
        cookie técnica propia y, únicamente si las aceptas, las cookies de
        analítica de Google Analytics.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold leading-snug text-slate-900">
        Cookies que usa esta web
      </h2>
      <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-stone-200">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left text-slate-600">
            <tr>
              <th className="p-3">Cookie</th>
              <th className="p-3">Proveedor</th>
              <th className="p-3">Duración</th>
              <th className="p-3">Finalidad</th>
              <th className="p-3">Tipo</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {COOKIES.map((c, i) => (
              <tr key={c.name} className={i % 2 ? "bg-stone-50/50" : ""}>
                <td className="p-3 font-medium text-slate-900">{c.name}</td>
                <td className="p-3">{c.provider}</td>
                <td className="p-3">{c.duration}</td>
                <td className="p-3">{c.purpose}</td>
                <td className="p-3">{c.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-slate-500">
        Google Analytics se carga con la IP anonimizada y sin señales
        publicitarias de Google (remarketing desactivado).
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold leading-snug text-slate-900">
        Cómo aceptarlas, rechazarlas o cambiar de opinión
      </h2>
      <p className="mt-3 text-slate-600">
        Al entrar por primera vez, un aviso te permite aceptar o rechazar las
        cookies de analítica. Si las rechazas, Google Analytics no se carga.
        Para cambiar tu elección, borra los datos de navegación de este sitio
        en tu navegador (cookies y almacenamiento local) y vuelve a cargar la
        página: el aviso aparecerá de nuevo. También puedes bloquear o
        eliminar cookies desde la configuración de tu navegador (Chrome,
        Firefox, Safari o Edge).
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold leading-snug text-slate-900">
        Más información
      </h2>
      <p className="mt-3 text-slate-600">
        Si tienes cualquier duda sobre esta política, escríbeme a{" "}
        <a href="mailto:info@juradaexpress.es" className="link">
          info@juradaexpress.es
        </a>
        .
      </p>
      <p className="mt-3 text-sm text-slate-500">
        Última revisión: agosto de 2026.
      </p>
    </main>
  );
}
