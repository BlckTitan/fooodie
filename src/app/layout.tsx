import type { Metadata } from "next";
import { Inter, Open_Sans, Raleway} from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css'
import BootstrapClient from '@/components/BootstrapClient'
import  '@/components/BootstrapHead'

const inter = Inter({ subsets: ["latin"] });

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap'
})

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
