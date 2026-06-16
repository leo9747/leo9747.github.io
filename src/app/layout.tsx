import type { Metadata } from "next";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TableOfContents from "@/components/TableOfContents";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://leo9747.github.io"),
  title: {
    default: "Leo Hyams",
    template: "%s · Leo Hyams",
  },
  description:
    "Leo Hyams — Founder and Executive Director of AI Safety South Africa, working to reduce global catastrophic risk from advanced AI.",
  icons: {
    icon: "/trinity_penrose_favicon.png",
    apple: "/trinity_penrose_favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lora.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Nav />
        <div className="flex-1 w-full max-w-6xl mx-auto px-6 pt-1 pb-16">
          <div className="flex gap-8">
            {/* Left TOC column — only visible on lg+ */}
            <div className="hidden lg:block w-44 xl:w-52 flex-shrink-0">
              <TableOfContents />
            </div>
            {/* Main content */}
            <main className="flex-1 min-w-0 max-w-2xl">
              {children}
            </main>
            {/* Mirror column to keep content centred */}
            <div className="hidden lg:block w-44 xl:w-52 flex-shrink-0" />
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
