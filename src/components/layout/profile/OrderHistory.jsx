'use client'

import { useSession } from 'next-auth/react'
import React from 'react';

export default function OrderHistory() {

    const session = useSession()
    const userData = session?.data?.user;

  return (
    <section className='container bg-white'>
        <ul>
          <li>Country: {userData && userData?.email}</li>
          <li>State: {userData && userData?.username}</li>
          <li>City: {userData && userData?.email}</li>
          <li>LGA: {userData && userData?.username}</li>
          <li>Street: {userData && userData?.email}</li>
        </ul>
    </section>
  )
}
