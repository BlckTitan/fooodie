'use client'

import { useSession } from 'next-auth/react'
import React from 'react';
import Avatar from './Avatar';


export default function PersonalInfo() {

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

  return (
    <section className='container bg-white'>

        <div>
            <Avatar/>
        </div>

        <ul>
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold w-24'>Name: </h2>
            <span className='text-left mr-2'>{userName && userName?.lastname.toUpperCase()} </span>
            <span>{userName && userName?.firstname.toUpperCase()}</span>
          </li>
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold w-24'>Email: </h2>
            <span>{userData && userData?.email}</span>
          </li>
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold w-24'>Phone: </h2>
            <span className='text-start'>+234 813 000 1111</span>
          </li>
        </ul>

        

    </section>
  )
}
