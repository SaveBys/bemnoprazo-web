import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BemNoPrazo",
  description: "WebApp BemNoPrazo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <AuthProvider>
        <CartProvider>
          <body className={`${openSans.variable} antialiased`}>{children}</body>
        </CartProvider>
      </AuthProvider>
    </html>
  );
}
