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
            <h5 className='w-24'>Email: </h5>
            <span className='text-left mr-2'>{(account_email === null) ? '' : account_email}</span>
          </li>
          <li className='mb-4 flex items-center'>
            <h5 className='w-36'>Username: </h5>
            <span className='text-left mr-2'>{(username === null) ? '' : username}</span>
          </li>
        </ul>
        
    </section>
  )
}
