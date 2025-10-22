// app/blog/page.js
import Link from "next/link";
import { getAllPosts } from "../../content/posts";

export const metadata = {
  title: "Blog | JuradaExpress",
  description:
    "Consejos prácticos sobre traducción jurada: precios, plazos y cómo preparar tus documentos.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Blog
      </h1>
      <p className="mt-2 text-slate-600">
        Guías rápidas y consejos para que tu traducción jurada sea fácil y sin
        sorpresas.
      </p>

      <ul className="mt-8 space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="group">
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-lg border border-slate-200 p-4 hover:border-slate-300 hover:bg-slate-50"
            >
              <h2 className="text-xl font-semibold text-slate-900 group-hover:underline">
                {post.title}
              </h2>
              <div className="mt-1 text-sm text-slate-500">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("es-ES")}
                </time>{" "}
                · {post.readingTime}
              </div>
              <p className="mt-2 text-slate-700">{post.excerpt}</p>
              <span className="mt-3 inline-block text-sm font-medium text-indigo-600">
                Leer artículo →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
