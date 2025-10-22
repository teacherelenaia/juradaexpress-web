// app/blog/[slug]/page.js
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { posts } from "../../../content/posts";

// Pre-render estático de todas las rutas /blog/[slug]
export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

// SEO por artículo
export function generateMetadata({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: "Artículo no encontrado | Blog JuradaExpress" };
  }
  return {
    title: `${post.title} | Blog JuradaExpress`,
    description: post.excerpt,
    alternates: { canonical: `https://juradaexpress.es/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://juradaexpress.es/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default function ArticlePage({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-sm text-slate-500 hover:text-slate-700">
        ← Volver al blog
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mt-4">{post.title}</h1>
      <p className="text-slate-500 mt-2">
        {post.date} · {post.readingTime}
      </p>

      {post.image && (
        <div className="mt-6">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={630}
            className="rounded-xl w-full h-auto"
            priority
          />
        </div>
      )}

      {/* Si en content/posts.js guardas JSX en post.content */}
      <article className="prose prose-slate mt-8">{post.content}</article>

      {/* Si en content/posts.js usas HTML en post.html, cambia la línea anterior por:
      <article
        className="prose prose-slate mt-8"
        dangerouslySetInnerHTML={{ __html: post.html }}
      /> */}
    </main>
  );
}

