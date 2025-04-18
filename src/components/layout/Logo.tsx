import Image from 'next/image';
import React from 'react';
import LogoImg from '../../../public/img/home-delivery.png'

export default function Logo() {
  return (
    <header className='navbar-brand pageTitle links flex items-center'>
        <Image src={LogoImg} alt='name: logo; format: png;' className='w-12 h-12 rounded-full object-cover'/>
        <a href='/' className='pageTitle font-semibold ml-4 cursor-pointer'>FOODIE</a>
    </header>
  )
}
