import Image from 'next/image'
import React from 'react'
import Food2 from '../../../public/img/food2.png'
import { BsArrowRightCircle } from 'react-icons/bs'

export default function Hero() {
  return (
    <section className='container !hero h-[45vh] flex flex-col-reverse xl:grid xl:grid-cols-2'>
        <div className='w-full h-fit jumbotron jumbotron-fluid d-flex flex-column'>

            <div className="jumboText text">
                
                <h2 className='jumboText__h2'>Never Face Your Day Hungry.</h2>
                <p className='lead xl:text-left'>
                    We provide best food in town, we provide home delivery and dine in services.
                </p>
                <div className="button flex justify-center xl:justify-start">
                    <button className='btn button__CTA !bg-primaryColor text-white mr-4 d-flex align-items-center'>
                        <span className='mr-2'>Order now</span>
                        <BsArrowRightCircle />
                    </button> 
                    <button className='button__CTA btn btn-outline-dark d-flex align-items-center'>
                        <span className='mr-2'>Learn more</span>
                        <BsArrowRightCircle />
                    </button>
                </div>
            </div>
        </div>
        
        <div className="relative w-full h-[30vh] xl:h-[45vh] mb-8 xl:mb-0">
            <Image src={Food2} alt='food image' objectFit='cover' layout='fill' className='h-full w-full'/>
        </div>
        
    </section>
  )
}
