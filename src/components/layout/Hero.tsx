import Image from 'next/image'
import React from 'react'
import Food1 from '../../../public/img/food1.jpg'
import { BsArrowRightCircle } from 'react-icons/bs'

export default function Hero() {
  return (
    <section className='container container-fluid mt-4 flex flex-col-reverse xl:grid xl:grid-cols-2'>
        <div className='w-full h-fit jumbotron jumbotron-fluid d-flex flex-column'>

            <div className="jumboText">
                
                <h2 className='display-1'>Never face your day hungry</h2>
                <p className='lead'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Modi iste consequuntur esse perspiciatis eveniet unde inventore quo recusandae eaque beatae.
                </p>
                <div className="button flex">
                    <button className='btn !bg-primaryColor text-white mr-4 d-flex align-items-center'>
                        <span className='mr-2'>Order now</span>
                        <BsArrowRightCircle />
                    </button>
                    <button className='btn btn-outline-dark d-flex align-items-center'>
                        <span className='mr-2'>Learn more</span>
                        <BsArrowRightCircle />
                    </button>
                </div>
            </div>
        </div>
        
        <div className="relative w-full h-full mb-8 xl:mb-0">
            <Image src={Food1} alt='food image' objectFit='cover' layout='fill' className='h-full w-full'/>
        </div>
        
    </section>
  )
}
