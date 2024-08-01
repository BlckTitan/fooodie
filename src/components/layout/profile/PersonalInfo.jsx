'use client'

import { useSession } from 'next-auth/react'
import React, { useState } from 'react';
import Avatar from './Avatar';
import MyVerticallyCenteredModal from '@/components/layout/MyVerticallyCenteredModal'


export default function PersonalInfo() {

    const [modalShow, setModalShow] = useState(false);
    const session = useSession()
    const userData = session?.data?.user
    let userName = ''

    if(session.status === 'authenticated' && session?.data?.user?.firstname){

      userName = session?.data?.user?.firstname
  
    }else{
      if(session.status === 'authenticated' && session?.data?.user?.name){
         userName = session?.data?.user?.name
      }
    }

  return (
    <section className='container bg-white'>

        <header className='w-full pb-8 mb-4 border-b'>
          <h1 className='text-2xl font-semibold'>Personal Information</h1>
        </header>

        <div>
            <Avatar/>
        </div>

        <ul>
          <li className='mb-4'>
            <span className='font-semibold mr-8'>Name:</span>{userName && userName?.toUpperCase()}
          </li>
          <li className='mb-4'>
            <span className='font-semibold mr-8'>Email:</span>{userData && userData?.email}
          </li>
          <li className='mb-4'>
            <span className='font-semibold mr-8'>Phone:</span> +234 813 000 1111
          </li>
        </ul>

        <div>
          <button 
            type="button" 
            className='bg-primaryColor text-white rounded-md px-6 py-2'
            onClick={() => setModalShow(true)}
          >Edit</button>
        </div>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
    </section>
  )
}
