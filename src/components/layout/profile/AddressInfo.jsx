'use client'

import { useSession } from 'next-auth/react'
import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

export default function AddressInfo({country, state, city, region, street, loadingState}) {

    const session = useSession()
    // const userData = session?.data?.user;

    if(session.status === 'loading' || loadingState === true) return <LoadingSpinner/>


  return (
    <section className='container bg-white'>

        <ul>
          <li className='mb-4 flex items-center'>
            <h5 className='w-30'>Country: </h5>
            <span className='text-right ml-2'>{(country === null) ? '' : country}</span>
          </li>
          <li className='mb-4 flex items-center'>
            <h5 className='w-30'>State: </h5>
            <span className='text-right ml-2'>{(state === null) ? '' : state}</span>
          </li>
          <li className='mb-4 flex items-center'>
            <h5 className='w-30'>City: </h5>
            <span className='text-right ml-2'>{(city === null) ? '' : city}</span>
          </li>
          <li className='mb-4 flex items-center'>
            <h5 className='w-30'>LGA or Region: </h5>
            <span className='text-right ml-2'>{(region === null) ? '' : region}</span>
          </li>
          <li className='mb-4 flex items-center'>
            <h5 className='w-30'>Street: </h5>
            <span className='text-right ml-2'>{(street === null) ? '' : street}</span>
          </li>
        </ul>

    </section>
  )
}
