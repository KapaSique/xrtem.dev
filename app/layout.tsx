import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Onest } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-onest",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
});

const title = "xrtem — сайты и продукты под ключ";
const description =
  "Артём Свинобоев — fullstack-разработчик из Якутска. Сайты, интернет-магазины, платформы и Telegram-боты под ключ: от макета до админки и реальных пользователей.";

export const metadata: Metadata = {
  metadataBase: new URL("https://xrtem.dev"),
  title: { default: title, template: "%s — xrtem.dev" },
  description,
  keywords: ["Артём Свинобоев", "Artem Svinoboev", "разработка сайтов", "Якутск", "Next.js", "интернет-магазин", "Telegram-бот"],
  authors: [{ name: "Artem Svinoboev", url: "https://github.com/KapaSique" }],
  creator: "Artem Svinoboev",
  openGraph: {
    type: "website",
    url: "https://xrtem.dev",
    siteName: "xrtem.dev",
    title,
    description,
    locale: "ru_RU",
    alternateLocale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07060B",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/* Entrances are applied from the client; without scripting they would
            leave sections blank, so the hidden state is cancelled outright. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-ink font-sans text-fg antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
