import Image from 'next/image'
import React from 'react'
import Logo from '../../../public/img/home-delivery.png'
import { MdFacebook, MdWhatsapp } from 'react-icons/md'
import { BsTwitterX } from 'react-icons/bs'

export default function Footer() {
  return (
    <footer className="bg-dark w-full h-full text-slate-300 text-xl">
      <section className='container w-full py-12 flex flex-col items-center'>

        <div className='info w-full mb-8'>
            <div className='bio relative'>
                <header className='flex items-center mb-8'>
                    <Image src={Logo} alt='name: logo; format: png;' className='w-12 h-12 rounded-full object-cover'/>
                    <h2 className='font-semibold ml-4'>FOODIE.</h2>
                </header>
                <p className='text-xl'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quia sed tempora ratione commodi optio fuga nisi laborum iure ipsa vitae!
                </p>
                <div className='icons flex justify-evenly mt-4'>
                    <a href='#'><MdWhatsapp /></a>
                    <a href='#'><BsTwitterX /></a>
                    <a href='#'><MdFacebook /></a>
                </div>
            </div>

            <div className='links flex flex-col '>
                <a href='#'>Home</a>
                <a href='#'>Menu</a>
                <a href='#'>About</a>
                <a href='#'>Contact</a>
                <a href='#'>Login</a>
            </div>
            
            <div className='contact'>
                <p>2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
                <span>abc@example.com</span>
                <span>+123 4567 8901</span>
            </div>
        </div>

        <div className='copyrightText'>
            <h2 className='text-2xl'>Copyright &copy; FOOODIE 2024</h2>
        </div>
      </section>
    </footer>
  )
}
