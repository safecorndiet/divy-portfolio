import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    publishedAt: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" } }
  },
  computedFields: {
    slug: { type: "string", resolve: p => p._raw.sourceFileName.replace(/\.mdx$/, "") },
    readingTime: { type: "string", resolve: (p) => `${Math.max(1, Math.round(p.body.raw.split(/\s+/).length / 200))} min` }
  }
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: { rehypePlugins: [[rehypePrettyCode, { theme: "one-dark-pro" }]] }
});