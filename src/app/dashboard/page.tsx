'use client';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import Sidebar from '@/components/layout/sidebar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function DashboardPage() {

    const session = useSession()

  useEffect(() => {

    (session.status === 'loading') && <LoadingSpinner/>

  }, [session]);

  if(session.status === 'unauthenticated') return redirect('/login')
    
  return (
    <section className='flex flex-col lg:flex-row w-full h-screen bg-white'>
        <Sidebar/>
       <main className='w-10/12 bg-gray-50'>main area</main>
    </section>
  )
}
