import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const font = localFont({
  src: "./CascadiaCode.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ABS Telegram",
  description: "Always Be Shipping's Telegram tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <main className="container mx-auto p-4 sm:px-0 h-dvh">{children}</main>
      </body>
    </html>
  );
}
