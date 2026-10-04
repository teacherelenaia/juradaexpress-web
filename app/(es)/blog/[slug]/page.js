// app/blog/[slug]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../../../content/posts";
import { getPostEnBySlug } from "../../../../content/posts.en";
import { WHATSAPP_URL } from "../../../../content/site";
import { personRef, ORGANIZATION_ID } from "../../../../content/persona";

const BASE = "https://juradaexpress.es";

// Artículo en inglés emparejado (campo `translationOf`), solo si existe de
// verdad en content/posts.en.js: alimenta hreflang y el enlace visible.
function englishVersion(post) {
  return post.translationOf ? getPostEnBySlug(post.translationOf) || null : null;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const en = englishVersion(post);
  // Meta description: campo propio (110–155 caracteres); `excerpt` sigue
  // siendo el resumen visible y sirve de fallback.
  const description = post.metaDescription || post.excerpt;
  return {
    title: post.title,
    description,
    alternates: {
      canonical: `${BASE}/blog/${post.slug}`,
      ...(en
        ? {
            languages: {
              es: `${BASE}/blog/${post.slug}`,
              en: `${BASE}/en/blog/${en.slug}`,
              "x-default": `${BASE}/blog/${post.slug}`,
            },
          }
        : {}),
    },
    openGraph: {
      title: post.title,
      description,
      url: `${BASE}/blog/${post.slug}`,
      siteName: "Jurada Express",
      type: "article",
      locale: "es_ES",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author || "Elena Peñaranda Ortega"],
      images: post.image
        ? [
            {
              url: `${BASE}${post.image}`,
              width: 1200,
              height: 675,
              alt: post.alt || post.title,
            },
          ]
        : undefined,
    },
  };
}

// Dos artículos relacionados: los que compartan más etiquetas; si no hay
// suficientes, se completa con los más recientes.
function relatedPosts(post) {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const tags = new Set(post.tags || []);
  return others
    .map((p) => ({
      p,
      score: (p.tags || []).filter((t) => tags.has(t)).length,
    }))
    .sort(
      (a, b) => b.score - a.score || new Date(b.p.date) - new Date(a.p.date)
    )
    .slice(0, 2)
    .map(({ p }) => p);
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const related = relatedPosts(post);
  const en = englishVersion(post);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      {/* Miga de pan */}
      <nav aria-label="Miga de pan" className="text-sm text-slate-500">
        <Link href="/" className="link-crumb">
          Inicio
        </Link>{" "}
        <span aria-hidden="true">/</span>{" "}
        <Link href="/blog" className="link-crumb">
          Blog
        </Link>{" "}
        <span aria-hidden="true">/</span>{" "}
        <span className="text-slate-700">{post.title}</span>
      </nav>

      <h1 className="font-display text-balance mt-4 text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        {post.title}
      </h1>

      <div className="mt-3 text-sm text-slate-500">
        {post.author || "Elena Peñaranda Ortega"} ·{" "}
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>{" "}
        · {post.readingTime}
        {post.updated && post.updated !== post.date ? (
          <>
            {" "}
            · Actualizado el{" "}
            <time dateTime={post.updated}>
              {new Date(post.updated).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </>
        ) : null}
      </div>

      {en && (
        <p className="mt-3 text-sm text-slate-600">
          <a href={`/en/blog/${en.slug}`} hrefLang="en" lang="en" className="link">
            Read this article in English
          </a>
        </p>
      )}

      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt={post.alt || post.title}
          width="1200"
          height="675"
          className="mt-6 aspect-video w-full rounded-xl object-cover shadow"
        />
      )}

      {post.html ? (
        <article
          className="prose prose-slate mt-8"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      ) : (
        <article className="prose prose-slate mt-8">{post.content}</article>
      )}

      {/* FAQ propia del artículo (opcional, campo `faq` en content/posts.js) */}
      {post.faq?.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-slate-900">
            Preguntas frecuentes
          </h2>
          <div className="mt-4 divide-y divide-stone-200 rounded-xl bg-white ring-1 ring-stone-200">
            {post.faq.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer font-medium text-slate-900">
                  {f.q}
                </summary>
                <p className="mt-2 max-w-[68ch] text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CTA final */}
      <div className="mt-12 rounded-xl bg-brand-navy p-6 text-white md:p-8" data-surface="navy">
        <h2 className="font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-white">
          ¿Tu documento necesita traducción jurada?
        </h2>
        <p className="mt-2 text-brand-navy-100">
          Envíamelo escaneado y te respondo con precio cerrado y plazo real en
          menos de 2 horas.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="/documentos" className="btn btn-light">
            Pedir presupuesto
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-slate-900">
            Artículos relacionados
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/blog/${r.slug}`}
                  className="block h-full rounded-xl bg-white p-5 no-underline ring-1 ring-stone-200"
                >
                  <span className="font-medium text-brand-navy">{r.title}</span>
                  <span className="mt-2 block text-sm text-slate-500">
                    {new Date(r.date).toLocaleDateString("es-ES")} ·{" "}
                    {r.readingTime}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Schema: BlogPosting + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                "@id": `${BASE}/blog/${post.slug}#article`,
                headline: post.title,
                description: post.excerpt,
                url: `${BASE}/blog/${post.slug}`,
                datePublished: post.date,
                dateModified: post.updated || post.date,
                inLanguage: "es",
                image: post.image ? `${BASE}${post.image}` : undefined,
                // Autora: la Person de content/persona.js (entidad completa
                // en el footer), referenciada por @id.
                author: personRef("es"),
                publisher: {
                  "@type": "Organization",
                  "@id": ORGANIZATION_ID,
                  name: "Jurada Express",
                  url: `${BASE}/`,
                  logo: {
                    "@type": "ImageObject",
                    url: `${BASE}/logo.svg`,
                  },
                },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `${BASE}/blog/${post.slug}`,
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Inicio",
                    item: `${BASE}/`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Blog",
                    item: `${BASE}/blog`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: post.title,
                    item: `${BASE}/blog/${post.slug}`,
                  },
                ],
              },
              ...(post.faq?.length > 0
                ? [
                    {
                      "@type": "FAQPage",
                      mainEntity: post.faq.map((f) => ({
                        "@type": "Question",
                        name: f.q,
                        acceptedAnswer: { "@type": "Answer", text: f.a },
                      })),
                    },
                  ]
                : []),
            ],
          }),
        }}
      />
    </main>
  );
}
