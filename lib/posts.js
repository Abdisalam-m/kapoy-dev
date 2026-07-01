import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// Returns metadata for every post, sorted newest first.
// Does not parse/render MDX body — use getPostBySlug for that.
export function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fullPath = path.join(POSTS_DIR, filename);
    const source = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(source);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "1970-01-01",
      tags: data.tags || [],
      draft: Boolean(data.draft),
      readingTime: stats.text,
    };
  });

  return posts
    .filter((p) => !p.draft || process.env.NODE_ENV !== "production")
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getAllSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

// Returns full post data including raw MDX content, for a single slug.
export function getPostBySlug(slug) {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "1970-01-01",
    tags: data.tags || [],
    draft: Boolean(data.draft),
    readingTime: stats.text,
    content,
  };
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
