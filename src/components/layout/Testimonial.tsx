'use client'
import Image from 'next/image'
import React from 'react';
import Person1 from '../../../public/img/person1.jpg';
import Person2 from '../../../public/img/person2.jpg';
import { Carousel } from 'react-bootstrap';

export default function Testimonial() {

    const testimonial = [
        {
            testimonialMessage: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed a quos harum suscipit quod cupiditate, aliquid, pariatur commodi veritatis natus id omnis possimus voluptatem sint sunt dicta nisi at modi.", 
            testimonialImg: Person1, 
            testimonialProfileName: 'Jim Housecry', 
            testimonialProfileTitle: 'FOA Advisor'
        },
        {
            testimonialMessage: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Sed a quos harum suscipit quod cupiditate, aliquid,  pariatur commodi veritatis natus id omnis possimus voluptatem sint sunt dicta nisi at modi.", 
            testimonialImg: Person2, 
            testimonialProfileName: 'Elisha Fisher', 
            testimonialProfileTitle: 'FOA Advisor'
        },
        {
            testimonialMessage: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.  Sed a quos harum suscipit quod cupiditate, aliquid, pariatur commodi veritatis natus id omnis possimus voluptatem sint sunt dicta nisi at modi.", 
            testimonialImg: Person1, 
            testimonialProfileName: 'Alan Smith', 
            testimonialProfileTitle: 'FOA Secretary'
        },
    ]

  return (
    <section className='container carouselSlide flex flex-col items-center  pb-8'>

        <header className='bg-white text-center w-full p-2 xl:p-4'>
            <h2 className='font-bold text-4xl'>OUR TESTIMONIALS</h2>
        </header>

        <div className='carouselContainer w-full py-4 xl:py-8 flex justify-center'>
             <div id="carouselExampleSlidesOnly" className="carousel slide w-[95%] xl:w-4/5 bg-white py-2 px-4 rounded-md" data-bs-ride="carousel">
                
                <Carousel data-bs-theme="dark" className='carousel w-full h-full'>
                    {
                        testimonial.map((data, index) => (

                        <Carousel.Item key={index} className='w-ull h-96 xl:h-72 py-4 xl:py-0'>
                            <div className='w-full xl:mt-8'>
                                <p className='w-10/12 xl:w-9/12 text-justify mx-auto !text-base xl:text-xl'>
                                    {data.testimonialMessage} 
                                </p>
                            </div>

                            <div className='testimonialProfile'>
                                <Image src={data.testimonialImg} className="d-block img" alt="..."/>
                                <div className='testimonialTitle'>
                                    <h2>{data.testimonialProfileName}</h2>
                                    <span>{data.testimonialProfileTitle}</span>
                                </div>
                            </div>

                        </Carousel.Item>
                    ))}
                </Carousel>

            </div>
        </div> 
    </section>
  )
}

