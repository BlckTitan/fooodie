'use client'

import { useSession } from 'next-auth/react'
import React from 'react';

export default function AccountInfo() {

    const session = useSession()
    const userData = session?.data?.user;

  return (
    <section className='container bg-white'>
        <ul>
          <li>Email: {userData && userData?.email}</li>
          <li>Username: {userData && userData?.username}</li>
        </ul>
    </section>
  )
}
