import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-jetbrains",
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
  themeColor: "#faf9f7",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
