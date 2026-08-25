// app/en/blog/page.js
import Link from "next/link";
import { getAllPostsEn } from "../../../content/posts.en";

export const metadata = {
  title: "Blog",
  description:
    "Practical guides on sworn translation for Spain: NIE and residency paperwork, property purchases, prices and turnaround times.",
  alternates: {
    canonical: "https://juradaexpress.es/en/blog",
    languages: {
      es: "https://juradaexpress.es/blog",
      en: "https://juradaexpress.es/en/blog",
      "x-default": "https://juradaexpress.es/blog",
    },
  },
};

export default function BlogPage() {
  const posts = getAllPostsEn();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        Blog
      </h1>
      <p className="mt-3 max-w-[68ch] text-slate-600">
        Practical guides for handling Spanish paperwork with English-language
        documents. More articles are available in{" "}
        <Link href="/blog" className="link">
          Spanish
        </Link>
        .
      </p>

      <ul className="mt-8 space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="group">
            <Link
              href={`/en/blog/${post.slug}`}
              className="block overflow-hidden rounded-xl bg-white no-underline ring-1 ring-stone-200 transition-shadow hover:shadow-card"
            >
              {post.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.image}
                  alt={post.alt || post.title}
                  width="1200"
                  height="675"
                  loading="lazy"
                  className="aspect-video h-44 w-full object-cover"
                />
              )}
              <div className="p-5">
                <h2 className="text-xl font-semibold leading-snug text-slate-900 group-hover:text-brand-navy md:text-2xl">
                  {post.title}
                </h2>
                <div className="mt-1 text-sm text-slate-500">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-GB")}
                  </time>{" "}
                  · {post.readingTime}
                </div>
                <p className="mt-2 text-slate-700">{post.excerpt}</p>
                <span className="mt-3 inline-block text-sm font-medium text-brand-navy">
                  Read article →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
