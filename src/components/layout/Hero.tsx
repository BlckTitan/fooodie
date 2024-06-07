import Image from 'next/image'
import React from 'react'
import Food2 from '../../../public/img/food2.png'
import { BsArrowRightCircle } from 'react-icons/bs'

export default function Hero() {
  return (
    <section className='container container-fluid mt-4 flex flex-col-reverse xl:grid xl:grid-cols-2'>
        <div className='w-full h-fit jumbotron jumbotron-fluid d-flex flex-column'>

            <div className="jumboText">
                
                <h2 className='jumboText__h2'>Never face your day hungry.</h2>
                <p className='lead'>
                    We provide best food in town, we provide home delivery and dine in services.
                </p>
                <div className="button flex">
                    <button className='btn !bg-primaryColor text-white mr-4 d-flex align-items-center'>
                        <span className='mr-2'>Order now</span>
                        <BsArrowRightCircle />
                    </button>
                    <button className='btn btn-outline-dark d-flex align-items-center w-48'>
                        <span className='mr-2'>Learn more</span>
                        <BsArrowRightCircle />
                    </button>
                </div>
            </div>
        </div>
        
        <div className="relative w-full h-full mb-8 xl:mb-0">
            <Image src={Food2} alt='food image' objectFit='cover' layout='fill' className='h-full w-full'/>
        </div>
        
    </section>
  )
}
