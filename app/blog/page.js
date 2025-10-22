// app/blog/page.js
import Link from "next/link";
import { getAllPosts } from "../../content/posts";

export const metadata = {
  title: "Blog de traducción jurada | JuradaExpress",
  description:
    "Guías y consejos prácticos sobre traducción jurada: plazos, formatos, documentación y trámites.",
  alternates: { canonical: "https://juradaexpress.es/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold md:text-4xl">Blog</h1>
        <p className="mt-3 text-slate-600">
          Consejos prácticos, dudas frecuentes y guías rápidas para tus trámites con
          traducción jurada.
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="overflow-hidden rounded-xl border bg-white shadow-sm">
            {post.cover && (
              <img
                src={post.cover}
                alt={post.title}
                className="h-40 w-full object-cover"
                loading="lazy"
              />
            )}
            <div className="p-5">
              <time className="text-xs text-slate-500">
                {new Date(post.date).toLocaleDateString("es-ES")}
              </time>
              <h2 className="mt-1 line-clamp-2 text-lg font-semibold">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags?.map((t) => (
                  <span key={t} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-emerald-700 hover:underline">
                  Leer más
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* JSON-LD de Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Blog de JuradaExpress",
            url: "https://juradaexpress.es/blog",
          }),
        }}
      />
    </main>
  );
}

