import Footer from "@/components/Footer";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online Code Editor",
  description: "A simple online code editor built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:type" content="website" />
      </head>
      <html lang="en">
        <body className={`${geistSans.variable} antialiased`}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
