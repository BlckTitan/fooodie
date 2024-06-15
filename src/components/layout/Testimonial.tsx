import Image from 'next/image'
import React from 'react';
import Person1 from '../../../public/img/person1.jpg';
import Person2 from '../../../public/img/person2.jpg';

export default function Testimonial() {

    const testimonial = [
        {
            testimonialMessage: `<span >&ldquo;</span>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Sed a quos harum suscipit quod cupiditate, aliquid, 
            pariatur commodi veritatis natus id omnis possimus voluptatem sint sunt dicta nisi at modi.
            <span>&rdquo;</span>`, 
            testimonialImg: Person1, 
            testimonialProfileName: 'Jim Housecry', 
            testimonialProfileTitle: 'FOA Advisor'
        },
        {
            testimonialMessage: `<span >&ldquo;</span>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Sed a quos harum suscipit quod cupiditate, aliquid, 
            pariatur commodi veritatis natus id omnis possimus voluptatem sint sunt dicta nisi at modi.
            <span>&rdquo;</span>`, 
            testimonialImg: Person2, 
            testimonialProfileName: 'Elisha Fisher', 
            testimonialProfileTitle: 'FOA Advisor'
        },
        {
            testimonialMessage: `<span >&ldquo;</span>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Sed a quos harum suscipit quod cupiditate, aliquid, 
            pariatur commodi veritatis natus id omnis possimus voluptatem sint sunt dicta nisi at modi.
            <span>&rdquo;</span>`, 
            testimonialImg: Person1, 
            testimonialProfileName: 'Alan Smith', 
            testimonialProfileTitle: 'FOA Secretary'
        },
    ]

  return (
    <section className='container carouselSlide flex flex-col items-center  pb-8'>

        <header className='bg-white text-center w-full p-4'>
            <h2 className='font-bold text-4xl'>Our Testimonials</h2>
        </header>

        <div className='carouselContainer w-full p-8 flex justify-center'>
            <div id="carouselExampleSlidesOnly" className="carousel slide w-3/5 bg-white p-4 rounded-md" data-bs-ride="carousel">

            <div className="carousel-inner">
                {
                    testimonial.map((data, index) => (
                    <div className="carousel-item active" key={index}>
                        <div>
                            <p>
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
    
                    </div>
                    ))
                }
               
            </div>

            {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button> */}

            </div>
        </div>

    </section>
  )
}
