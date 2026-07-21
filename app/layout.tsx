import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Licor Amargo | The Power of Nature, Bottled for Men",
    template: "%s | Licor Amargo",
  },
  description: "A premium herbal bitters blend of Tongkat Ali, Maka Root, Korean Red Ginseng, honey, plum and Gorontula, handcrafted to support male strength, stamina, and energy.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Licor Amargo | The Power of Nature, Bottled for Men",
    description: "Handcrafted to support male strength, stamina, and energy. 100% natural ingredients.",
    url: "/",
    siteName: "Licor Amargo",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Licor Amargo | Male Vitality Bottled",
    description: "Premium handcrafted herbal bitters.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-cream-100 text-ink-900 font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
