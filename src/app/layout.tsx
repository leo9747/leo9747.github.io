import type { Metadata } from "next";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
        <main className="flex-1 w-full max-w-2xl mx-auto px-6 pt-8 pb-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
