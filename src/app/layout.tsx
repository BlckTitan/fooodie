import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css'
import BootstrapClient from '@/components/BootstrapClient'
import  '@/components/BootstrapHead'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fooodie",
  description: "Foodie food ordering platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <BootstrapClient/>
      </body>
    </html>
  );
}
