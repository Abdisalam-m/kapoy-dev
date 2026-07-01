import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/siteConfig";

export default function sitemap() {
  const posts = getAllPosts();

  const postEntries = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  return [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/blog`, lastModified: new Date() },
    ...postEntries,
  ];
}
