import React from 'react';
import Image from 'next/image';
import Chef1 from '../../../public/img/chef1.jpg';
import Chef2 from '../../../public/img/chef2.jpg';
import Chef3 from '../../../public/img/chef3.jpg';
import Chef4 from '../../../public/img/chef4.jpg';
import Chef5 from '../../../public/img/chef5.jpg';
import Chef6 from '../../../public/img/chef6.jpg';
import { inter, lora, raleway } from '@/app/fonts';

export default function Chefs() {

    const Chefs = [
        {img: Chef1, name: 'Bank Phrom', text:'Some quick example text to build on the card name and make up the bulk of the cards content'},
        {img: Chef2, name: 'Semen Zhuravlev', text:'Some quick example text to build on the card name and make up the bulk of the cards content'},
        {img: Chef5, name: 'Yilmaz Akin', text:'Some quick example text to build on the card name and make up the bulk of the cards content'},
        {img: Chef4, name: 'Romain Briaux', text:'Some quick example text to build on the card name and make up the bulk of the cards content'},
        {img: Chef5, name: 'Louis Hansel', text:'Some quick example text to build on the card name and make up the bulk of the cards content'},
        {img: Chef2, name: 'Bozoo Moazami', text:'Some quick example text to build on the card name and make up the bulk of the cards content'}
    ]

  return (
    <section className='p-4'>
        <div className='chefHeaderText text-center mb-14'>
            <h1 className='text-5xl font-bold'>OUR POPULAR CHEFS</h1>
        </div>
      <div className='chefs'>
      {
          Chefs.map((chefData, index) => (
            <div className="card " key={index}>
              <div className="img relative flex justify-center w-full h-48">
                <Image src={chefData.img} 
                  className="card-img-toprounded-full  w-full h-full object-cover object-center" 
                  alt="type: image; format: jpg; name: menu1;" 
              />
              </div>
              <div className="card-body text-center border-none">
                <h5 className="card-title meals">{chefData.name}</h5>
                <p className="card-text">{chefData.text}</p>
                
              </div>
          </div>
          ))
        }
          
      </div>
    </section>
  )
}
