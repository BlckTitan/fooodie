'use client'

import { useSession } from 'next-auth/react'
import React from 'react';

export default function AccountInfo() {

    const session = useSession()
    const userData = session?.data?.user;

  return (
    <section className='container bg-white'>

        <ul>
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold w-24'>Email: </h2>
            <span className='text-left mr-2'>{userData && userData?.email}</span>
          </li>
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold w-24'>Username: </h2>
            <span>{userData && userData?.username}</span>
          </li>
        </ul>
        
    </section>
  )
}
