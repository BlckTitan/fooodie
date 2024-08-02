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

    if(session.status === 'authenticated' && (session?.data?.user?.firstname && session?.data?.user?.lastname)){

      userName = session?.data?.user
  
    }else{
      if(session.status === 'authenticated' && session?.data?.user?.name){
         userName = session?.data?.user?.name
      }
    }

    const handleEdit = async () => {
      setModalShow(true)
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
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold mr-8'>Name: </h2>
            <span className='text-left mr-2'>{userName && userName?.lastname.toUpperCase()} </span>
            <span>{userName && userName?.firstname.toUpperCase()}</span>
          </li>
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold mr-8'>Email: </h2>
            <span>{userData && userData?.email}</span>
          </li>
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold mr-8'>Phone: </h2>
            <span className='text-start'>+234 813 000 1111</span>
          </li>
        </ul>

        <div>
          <button 
            type="button" 
            className='bg-primaryColor hover:bg-orange-800 text-white rounded-md px-6 py-2'
            onClick={ handleEdit }
          >Edit</button>
        </div>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
    </section>
  )
}
