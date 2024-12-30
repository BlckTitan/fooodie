'use client'
import React, { useEffect, useState } from 'react';
import Avatar from './Avatar';
import LoadingSpinner from '../LoadingSpinner';
import { useSession } from 'next-auth/react';

export default function PersonalInfo({name, firstname, email, lastname, phone, loadingState, img}) {

  const session = useSession();

  if(session.status === 'loading' || loadingState === true) return <LoadingSpinner/>

  return (
    <section className='container bg-white'>

        <div>
            <Avatar img={img} loadingState={loadingState}/>
        </div>

        <ul>
            <li className='mb-4 flex items-center'>
            <h2 className='font-semibold w-24'>Name: </h2>
            {
              (name) ?
              <span className='text-left mr-2'>{(firstname === null) ? '' : name.toUpperCase()} </span> :
              <>
                <span className='text-left mr-2'>{(lastname === null) ? '' : lastname.toUpperCase()} </span>
                <span>{(firstname === null) ? '' : firstname.toUpperCase()}</span>
              </>
            }
          </li>
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold w-24'>Email: </h2>
            <span>{(email === null) ? '' : email}</span>
          </li> 
          <li className='mb-4 flex items-center'>
            <h2 className='font-semibold w-24'>Phone: </h2>
            <span className='text-start'>{(phone === null) ? '' : phone}</span>
          </li>
        </ul>

    </section>
  )
}
