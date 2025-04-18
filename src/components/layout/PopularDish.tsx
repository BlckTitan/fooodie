import React from 'react'
import Food1 from '../../../public/img/food1.jpg'
import Image from 'next/image'

export default function PopularDish() {
  return (
    <section className='container h-fit xl:h-[45vh] flex-col xl:grid xl:grid-cols-3'>
        
        <div className="img relative w-full h-[25vh] xl:h-[45vh] mb-4 xl:mb-0 xl:mr-4 xl:col-span-2">
            <Image src={Food1} alt='type: Img, format: jpg'  className=' w-full h-full object-cover object-center'/>
        </div>

        <div className="text xl:px-8">
            <h1 className='text-2xl font-semibold xl:text-6xl'>Our Most Popular Dish.</h1>
            <p>
                This dish is full of flavor and nutrition! Quinoa is a complete protein, 
                providing all the essential amino acids your body needs, and is also a good source of fiber.
            </p>
            <button className='button__CTA bg-primaryColor text-white rounded-md'>Order now</button>
        </div>
    
    </section>
  ) 
}
