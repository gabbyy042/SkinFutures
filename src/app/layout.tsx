import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkinFutures - See Your Skin's Future",
  description: "Visual skincare motivation app - See how your skin may change over time based on habits and lifestyle",
  keywords: ["skincare", "skin health", "motivation", "habits", "wellness"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-gradient-to-br from-primary-50 via-white to-skin-light min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}