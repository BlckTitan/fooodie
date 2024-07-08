'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function Dashboard() {

    const session = useSession()
    console.log(session)
    
  return (
    <div>page</div>
  )
}
