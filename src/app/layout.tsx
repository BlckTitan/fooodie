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
import Providers from '@/app/GlobalRedux/provider'
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
            <Providers>
              <Navbar/>
                {children}
              <Footer/>
            </Providers>
          </NextAuthSessionProviders>
          <BootstrapClient/>
          <ToastContainer/> 
        </body>
      </html>
  );
} 