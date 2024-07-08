import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from '@/components/BootstrapClient'
import  '@/components/BootstrapHead';
import { raleway } from "./fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NextAuthSessionProviders from "../pages/api/auth/NextAuthSessionProviders";
import '@/app/api/db/db'

export const metadata: Metadata = {
  title: "Fooodie",
  description: "Foodie food ordering platform.",
};



export default function RootLayout({
  children, session
}: Readonly<{
  children: React.ReactNode, session: any
}>) {

  
  return (
      <html lang="en">
        <body className={raleway.className}>
          <NextAuthSessionProviders session={session}>    
            <Navbar/>
              {children}
            <Footer/>
          </NextAuthSessionProviders>
          <BootstrapClient/>
        </body>
      </html>
  );
} 