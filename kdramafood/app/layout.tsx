import type { Metadata } from "next";
import { Oswald, Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-korean",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "KDramaFood — Cook What They Eat",
    template: "%s | KDramaFood",
  },
  description:
    "Discover and cook iconic Korean recipes from your favorite K-dramas. From Crash Landing on You's ramyeon to Squid Game's dalgona — eat what they eat.",
  keywords: ["K-drama food", "Korean recipes", "K-drama recipes", "Korean cooking"],
  openGraph: {
    title: "KDramaFood — Cook What They Eat",
    description: "Discover Korean recipes from your favorite K-dramas",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} ${notoSansKR.variable}`}
    >
      <body className="bg-[#0A0A0A] text-white antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
