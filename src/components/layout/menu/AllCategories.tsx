import Image from 'next/image'
import React from 'react'
import Menu1 from '../../../../public/img/menu1.png'
import Pagination from '../Pagination'

export default function AllCategories() {
  return (
    <nav aria-label="Menu navigation shadow-lg">

        <div className="card relative">
          <Image src={Menu1} className="card-img-top" alt="type: image; formart: jpg; name: menu1;" layout='contain' objectFit='cover'/>
          <div className="card-body text-center border-none">
            <h5 className="card-title">Spaghetti</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
            
            <div className="CTA flex justify-between items-center">
              <span className="price">#2500</span>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>

          </div>
        </div>

        <footer className='flex items-center justify-center'>
          <Pagination/>
        </footer>
    </nav>
  )
}