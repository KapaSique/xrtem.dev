import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider, themeBootScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
});

/** Wordmark face. Latin only — it is never asked to set Cyrillic. */
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const description =
  "Artem Svinoboev — machine learning, computer vision and full-stack engineering. Commercial storefronts, multi-tenant platforms and research that reports its own limits.";

export const metadata: Metadata = {
  metadataBase: new URL("https://xrtem.dev"),
  title: {
    default: "Artem Svinoboev — ML, CV and full-stack engineering",
    template: "%s — xrtem.dev",
  },
  description,
  keywords: [
    "Artem Svinoboev",
    "machine learning",
    "computer vision",
    "full-stack",
    "Next.js",
    "portfolio",
    "Yakutsk",
  ],
  authors: [{ name: "Artem Svinoboev", url: "https://github.com/KapaSique" }],
  creator: "Artem Svinoboev",
  openGraph: {
    type: "website",
    url: "https://xrtem.dev",
    siteName: "xrtem.dev",
    title: "Artem Svinoboev — ML, CV and full-stack engineering",
    description,
    locale: "en_US",
    alternateLocale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artem Svinoboev — ML, CV and full-stack engineering",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f2f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1015" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The boot script writes data-theme before React hydrates, so the
    // server markup never carries it — that mismatch is intended.
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${grotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Resolves the theme before the first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        {/* Entrance animations are applied from the client. Without
            scripting they would leave the page blank, so the hidden
            state is cancelled outright. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
