import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";
import { MDXComponents } from "@/components/mdx-components";

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find(p => p.slug === params.slug);
  if (!post) return notFound();
  const MDX = useMDXComponent(post.body.code);
  return (
    <section className="container py-10">
      <h1 className="text-3xl font-semibold">{post.title}</h1>
      <p className="text-sm text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString()} • {post.readingTime}</p>
      <article className="prose dark:prose-invert mt-6">
        <MDX components={MDXComponents} />
      </article>
    </section>
  );
}