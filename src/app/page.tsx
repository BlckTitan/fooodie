import Hero from "@/components/layout/Hero";
import Navbar from "@/components/layout/Navbar";
import PopularDish from "@/components/layout/PopularDish";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <PopularDish/>
    </main>
  );
}
