import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from '@/components/BootstrapClient'
import  '@/components/BootstrapHead';
import { raleway } from "./fonts";

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
      <body className={raleway.className}>
        {children}
        <BootstrapClient/>
      </body>
    </html>
  );
}
