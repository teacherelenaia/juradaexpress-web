// app/en/blog/[slug]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostsEn, getPostEnBySlug } from "../../../../content/posts.en";
import { WHATSAPP_URL_EN } from "../../../../content/site";

const BASE = "https://juradaexpress.es";

export async function generateStaticParams() {
  return getAllPostsEn().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostEnBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${BASE}/en/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE}/en/blog/${post.slug}`,
      siteName: "JuradaExpress",
      type: "article",
      locale: "en_GB",
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

function relatedPosts(post) {
  const others = getAllPostsEn().filter((p) => p.slug !== post.slug);
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
  const post = getPostEnBySlug(params.slug);
  if (!post) notFound();
  const related = relatedPosts(post);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <Link href="/en" className="link-nav">
          Home
        </Link>{" "}
        <span aria-hidden="true">/</span>{" "}
        <Link href="/en/blog" className="link-nav">
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
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>{" "}
        · {post.readingTime}
      </div>

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

      <article
        className="prose prose-slate mt-8"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {/* Final CTA */}
      <div className="mt-12 rounded-xl bg-brand-navy p-6 text-white md:p-8" data-surface="navy">
        <h2 className="font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-white">
          Does your document need a sworn translation?
        </h2>
        <p className="mt-2 text-brand-navy-100">
          Send me a scan and you'll have a fixed quote and a real delivery
          time within 2 working hours.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="/en/documentos" className="btn btn-light">
            Request a quote
          </a>
          <a
            href={WHATSAPP_URL_EN}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-slate-900">
            Related articles
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/en/blog/${r.slug}`}
                  className="block h-full rounded-xl bg-white p-5 no-underline ring-1 ring-stone-200"
                >
                  <span className="font-medium text-brand-navy">{r.title}</span>
                  <span className="mt-2 block text-sm text-slate-500">
                    {new Date(r.date).toLocaleDateString("en-GB")} ·{" "}
                    {r.readingTime}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                headline: post.title,
                description: post.excerpt,
                url: `${BASE}/en/blog/${post.slug}`,
                datePublished: post.date,
                dateModified: post.updated || post.date,
                inLanguage: "en",
                image: post.image ? `${BASE}${post.image}` : undefined,
                author: {
                  "@type": "Person",
                  name: post.author || "Elena Peñaranda Ortega",
                  url: `${BASE}/en/about`,
                },
                publisher: {
                  "@type": "Organization",
                  name: "JuradaExpress",
                  url: `${BASE}/`,
                  logo: {
                    "@type": "ImageObject",
                    url: `${BASE}/logo.svg`,
                  },
                },
                mainEntityOfPage: `${BASE}/en/blog/${post.slug}`,
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: `${BASE}/en`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Blog",
                    item: `${BASE}/en/blog`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: post.title,
                    item: `${BASE}/en/blog/${post.slug}`,
                  },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
