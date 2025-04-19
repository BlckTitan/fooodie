'use client'
import CallToActiom from "@/components/layout/CallToAction";
import Chefs from "@/components/layout/Chefs";
import Hero from "@/components/layout/Hero";
import PopularDish from "@/components/layout/PopularDish";
import Testimonial from "@/components/layout/Testimonial";
import Menu from "@/components/layout/menu/Menu";

export default function Home() {

  return (
      <main className="w-full h-full flex flex-row justify-center">
        
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

          <div>
            <Testimonial/>
          </div>

          <div className="">
            <CallToActiom/>
          </div>

        </div>


      </main>
  );
}
