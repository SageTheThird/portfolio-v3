import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { TerminalFrame } from '@/components/terminal-frame';
import { ThemeProvider } from '@/components/theme-provider';
import { siteConfig } from '@/lib/site-config';
import { getAllProjects, getProjectMeta } from '@/lib/projects';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: `@${siteConfig.handle}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = getAllProjects().map(p => {
    const meta = getProjectMeta(p.slug);
    return {
      slug: p.slug,
      title: p.title.split('—')[0]?.split(':')[0]?.trim() ?? p.title,
      year: meta.year,
    };
  });

  return (
    <html
      lang='en'
      data-theme='dark'
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Read persisted theme before paint to avoid flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('sajid-theme');if(!t){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <TerminalFrame paletteData={{ projects }}>{children}</TerminalFrame>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
