// app/blog/[slug]/page.js
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { posts } from "../posts";

export function generateMetadata({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Entrada no encontrada — Blog" };
  return {
    title: `${post.title} — JuradaExpress`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/blog" className="text-sm text-blue-600 hover:underline">← Volver al blog</Link>
      <h1 className="mt-2 text-3xl font-bold">{post.title}</h1>
      <div className="mt-2 text-sm text-slate-500">
        {post.date} · {post.readTime} min
      </div>
      {post.cover ? (
        <Image
          src={post.cover}
          alt={post.title}
          width={1200}
          height={630}
          className="mt-6 h-64 w-full rounded-xl object-cover"
        />
      ) : null}
      <article className="prose prose-slate mt-6 max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>") }} />
      </article>
    </main>
  );
}

