import { Inter, Lora, Raleway } from "next/font/google";

export const lora = Lora({
    subsets: ['latin'],
    display: 'swap',
    weight: '700'
})

export const inter = Inter({ subsets: ["latin"] });

export const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap'
})