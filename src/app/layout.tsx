import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from '@/components/Navbar'

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "প্রতিদিনের বাজারের নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ দাম জানুন",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="light" className="scroll-smooth">
      <body className={`${hindSiliguri.className} antialiased`}>
        <Toaster position="top-right" />
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}