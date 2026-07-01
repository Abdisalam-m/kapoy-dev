import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitter,
  },
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.url}/rss.xml`,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell site-nav">
            <a href="/" className="brand">
              <span className="brand-prompt">~/</span>
              {siteConfig.name.toLowerCase()}
            </a>
            <nav className="nav-links">
              <a href="/blog">posts</a>
              <a href="/rss.xml">rss</a>
              <a href={`https://x.com/${siteConfig.twitter.replace("@", "")}`}>
                x.com
              </a>
            </nav>
          </div>
        </header>

        <main className="shell">{children}</main>

        <footer className="site-footer">
          <div className="shell">
            © {new Date().getFullYear()} {siteConfig.name}. Built with
            Next.js, deployed on Vercel.
          </div>
        </footer>
      </body>
    </html>
  );
}
