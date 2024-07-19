'use client'
import React from 'react';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '../../components/layout/LoadingSpinner';

export default function ProfilePage() {

  const session = useSession()

  if(session.status === 'loading') return <LoadingSpinner/>
  return (
    <section className='container'>Profile</section>
  )
}
