import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Block Bitters | The Power of Nature, Bottled for Men",
    template: "%s | Block Bitters",
  },
  description: "A premium herbal bitters blend of Tongkat Ali, Maka Root, Korean Red Ginseng, honey, plum and Gorontula, handcrafted in Lagos to support male strength, stamina, and energy.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Block Bitters | The Power of Nature, Bottled for Men",
    description: "Handcrafted in Lagos to support male strength, stamina, and energy. 100% natural ingredients.",
    url: "/",
    siteName: "Block Bitters",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Block Bitters | Male Vitality Bottled",
    description: "Premium herbal bitters handcrafted in Lagos, Nigeria.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-cream-100 text-ink-900 font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
