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
import '@/lib/db'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Fooodie",
  description: "Foodie food ordering platform.",
};



export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode,
}>) {

  
  return (
      <html lang="en">
        <body className={raleway.className}>
          <NextAuthSessionProviders>    
            <Navbar/>
              {children}
            <Footer/>
          </NextAuthSessionProviders>
          <BootstrapClient/>
          <ToastContainer/> 
        </body>
      </html>
  );
} 