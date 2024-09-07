'use client'

import { useSession } from 'next-auth/react'
import React from 'react';

export default function AddressInfo() {

    const session = useSession()
    const userData = session?.data?.user;


  return (
    <section className='container bg-white'>

        <ul>
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold w-30'>Country: </h2>
            {/* <span className='text-left mr-2'>{userData && userData?.country}</span> */}
          </li>
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold w-30'>State: </h2>
            {/* <span>{userData && userData?.state}</span> */}
          </li>
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold w-30'>City: </h2>
            {/* <span>{userData && userData?.city}</span> */}
          </li>
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold w-30'>LGA or Region: </h2>
            {/* <span>{userData && userData?.region}</span> */}
          </li>
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold w-30'>Street: </h2>
            {/* <span>{userData && userData?.street}</span> */}
          </li>
        </ul>

    </section>
  )
}
