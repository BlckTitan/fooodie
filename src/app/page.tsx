import Chefs from "@/components/layout/Chefs";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/layout/Hero";
import Navbar from "@/components/layout/Navbar";
import PopularDish from "@/components/layout/PopularDish";
import Menu from "@/components/layout/menu/Menu";

export default function Home() {
  return (
    <main className="w-full h-full">
      <Navbar/>
      <div className="container bg-white">
        <div className="mb-4">
          <Hero/>
        </div>
        <div className="mb-4">
          <PopularDish />
        </div>
        <div className="mb-4">
          <Menu/>
        </div>
        <div className="">
          <Chefs/>
        </div>
      </div>
      <Footer/>
    </main>
  );
}
