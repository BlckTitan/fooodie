'use client'

import { useSession } from 'next-auth/react'
import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

export default function AccountInfo({account_email, loadingState, username}) {

    const session = useSession()
    // const userData = session?.data?.user;

    if(session.status === 'loading' || loadingState === true) return <LoadingSpinner/>

  return (
    <section className='container bg-white'>

        <ul>
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold w-24'>Email: </h2>
            <span className='text-left mr-2'>{(account_email === null) ? '' : account_email}</span>
          </li>
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold w-24'>Username: </h2>
            <span>{(username === null) ? '' : username}</span>
          </li>
        </ul>
        
    </section>
  )
}
