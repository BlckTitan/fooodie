'use client'

import { useSession } from 'next-auth/react'
import React from 'react';
import Avatar from './Avatar';

export default function PersonalInfo() {

    const session = useSession()
    const userData = session?.data?.user

  return (
    <section className='container bg-white'>
        <header>
            <Avatar/>
            <p>{userData?.name && userData?.name.toUpperCase()}</p>
        </header>
        This is personal information
    </section>
  )
}
