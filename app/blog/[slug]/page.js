// app/blog/[slug]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../../content/posts";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | JuradaExpress`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-sm">
        <Link href="/blog" className="text-indigo-600 hover:underline">
          ← Volver al blog
        </Link>
      </div>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
        {post.title}
      </h1>

      <div className="mt-2 text-sm text-slate-500">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("es-ES")}
        </time>{" "}
        · {post.readingTime}
      </div>

      {/* Si el post trae HTML, lo renderizamos como HTML.
          Si algún post futuro trae "content" en JSX, también lo soportamos. */}
      {post.html ? (
        <article
          className="prose prose-slate mt-8"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      ) : (
        <article className="prose prose-slate mt-8">{post.content}</article>
      )}
    </main>
  );
}

