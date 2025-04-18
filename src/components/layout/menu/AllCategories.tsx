import Image from 'next/image'
import React from 'react'
import Menu1 from '../../../../public/img/menu1.png'
import Menu2 from '../../../../public/img/menu2.png'
import Menu3 from '../../../../public/img/menu3.png'
import Menu4 from '../../../../public/img/food2.png'
import Pagination from '../Pagination';




export default function AllCategories() {
  const dummyText = [
    {img: Menu1, title: 'Spagheti', text:'Some quick example text to build on the card title and make up the bulk of the cards content', price: '#2500'},
    {img: Menu2, title: 'Gnocchi', text:'Some quick example text to build on the card title and make up the bulk of the cards content', price: '#2500'},
    {img: Menu3, title: 'Rovioli', text:'Some quick example text to build on the card title and make up the bulk of the cards content', price: '#2500'},
    {img: Menu4, title: 'Risoto', text:'Some quick example text to build on the card title and make up the bulk of the cards content', price: '#2500'}
  ]
  return (
    <section className='w-full p-0 xl:p-4'>
      <div className='menuItems'>
        {
          dummyText.map((dummyData, index) => (
            <div className="card" key={index}>

              <div className=' flex justify-center items-center'>
                <Image src={dummyData.img} 
                  className="card-img-top w-full h-48 object-cover object-center" 
                  alt={`type: image; format: jpg; name: ${dummyData.title}`}
                />
              </div>

              <div className="card-body text-center border-none">
                <h5 className="card-title meals">{dummyData.title}</h5>
                <p className="card-text">{dummyData.text}</p>
                
                <div className="CTA my-4 flex justify-between items-center">
                  <span className="price">{dummyData.price}</span>
                  <a href="#" className="btn btn-primary">Order now</a>  
                </div>
              </div>
          </div>
          ))
        }
      </div>

      
      <nav aria-label="Menu navigation">
          <footer className='flex items-center justify-center'>
            {/* <Pagination/> */}
          </footer>
      </nav>
      
    </section>
  )
}