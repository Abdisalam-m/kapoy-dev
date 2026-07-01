import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata = {
  title: "Posts",
  description: "Every build log and how-to, newest first.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section style={{ padding: "48px 0 40px" }}>
      <p className="hero-eyebrow">$ ls ./posts</p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          margin: "0 0 8px",
          letterSpacing: "-0.02em",
        }}
      >
        All posts
      </h1>

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
                {post.tags?.length > 0 && (
                  <div style={{ marginTop: 10 }}>
                    {post.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
