// app/blog/page.js
import Link from "next/link";
import Image from "next/image";
import { posts } from "./posts";

export const metadata = {
  title: "Blog — JuradaExpress",
  description: "Artículos útiles sobre traducción jurada, precios, plazos y consejos.",
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="mt-2 text-slate-600">
        Guías rápidas, consejos y novedades sobre traducción jurada.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-2xl border bg-white/60 p-4 shadow-sm hover:shadow-md transition">
            <Link href={`/blog/${post.slug}`} className="block">
              {post.cover ? (
                <Image
                  src={post.cover}
                  alt={post.title}
                  width={800}
                  height={480}
                  className="h-40 w-full rounded-xl object-cover"
                />
              ) : null}
              <h2 className="mt-3 line-clamp-2 text-lg font-semibold">{post.title}</h2>
              <p className="mt-1 line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime} min</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags?.map((t) => (
                  <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                    #{t}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

