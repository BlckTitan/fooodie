'use client';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

export default function DashboardPage() {

  const session = useSession()

  if(session.status === 'loading') return <LoadingSpinner/>

  if(session.status === 'unauthenticated') return redirect('/login')
    
  return (
    <section className='container'>Dashboard page</section>
  )
}
