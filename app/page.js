import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { siteConfig } from "@/lib/siteConfig";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <>
      <section className="hero">
        <p className="hero-eyebrow">$ whoami</p>
        <h1>Build logs on trading bots &amp; automation.</h1>
        <p>{siteConfig.description}</p>
      </section>

      <section>
        {posts.length === 0 ? (
          <p className="empty-state">
            No posts yet. Add an .mdx file to content/posts to get started.
          </p>
        ) : (
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="post-row">
                  <div className="post-row-top">
                    <span className="prompt">&gt;</span>
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2>{post.title}</h2>
                  {post.description && <p>{post.description}</p>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
