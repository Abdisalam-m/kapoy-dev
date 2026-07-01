import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { getAllSlugs, getPostBySlug, formatDate } from "@/lib/posts";
import { mdxComponents } from "@/lib/mdxComponents";
import { siteConfig } from "@/lib/siteConfig";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

const rehypePrettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: true,
};

export default function PostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article>
      <div className="post-header">
        <a href="/blog" className="back-link">
          ← back to posts
        </a>
        <div className="post-meta">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1>{post.title}</h1>
        {post.tags?.length > 0 && (
          <div style={{ marginTop: 12 }}>
            {post.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="prose">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypePrettyCode, rehypePrettyCodeOptions],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
