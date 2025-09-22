import { allPosts } from "contentlayer/generated";
import Link from "next/link";

export const revalidate = 120;

export default function BlogPage() {
  const posts = allPosts.sort((a,b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  return (
    <section className="container py-10">
      <h1 className="text-3xl font-semibold">Blog & Notes</h1>
      <div className="mt-6 space-y-6">
        {posts.map(p => (
          <article key={p._id} className="border rounded-2xl p-5">
            <h2 className="text-xl font-medium">
              <Link href={`/blog/${p.slug}`}>{p.title}</Link>
            </h2>
            <p className="text-sm text-muted-foreground">{p.description}</p>
            <div className="text-xs mt-2">Reading time: {p.readingTime} • {new Date(p.publishedAt).toLocaleDateString()}</div>
          </article>
        ))}
      </div>
    </section>
  );
}