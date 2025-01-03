'use client';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import useFetch from '@/customHooks/useFetch'
import { BsBell, BsCalculator, BsCart4, BsColumnsGap, BsGear, BsGrid, BsPencilSquare, BsPeople, BsQuestionCircle, BsTicketPerforated } from 'react-icons/bs'

export default function UserPage() {

  const session = useSession()

  useEffect(() => {
    
    (session.status === 'loading') && <LoadingSpinner/> 
    
  }, [session]);


  const {data, error, isLoading } = useFetch('/api/user');
  
  if(isLoading) return <LoadingSpinner/>

  if(session.status === 'unauthenticated') return redirect('/login')
    
    console.log(data, error, isLoading)

  return (
    <section className='flex flex-col lg:flex-row w-full h-screen bg-white'>
      <aside className='w-2/12 hidden lg:block'>
        <ul className='sidebar_navigation'>
          <li>
              <a href=''>
                  <i><BsColumnsGap /></i>
                  <span>Dashboard</span>
              </a>
          </li>
          <li>
              <a href=''>
                  <i><BsTicketPerforated /></i>
                  <span>Coupons</span>
              </a>
          </li>
          <li>
              <a href=''>
                  <i><BsPeople /></i>
                  <span>Users</span>
              </a>
          </li>
          <li>
              <a href=''>
                  <i><BsGrid /></i>
                  <span>Categories</span>
              </a>
          </li>
          <li>
              <a href=''>
                  <i><BsPencilSquare /></i>
                  <span>Items</span>
              </a>
          </li>
          <li>
              <a href=''>
                  <i><BsCart4 /></i>
                  <span>Orders</span>
              </a>
          </li>
          <li>
              <a href=''>
                  <i><BsCalculator /></i>
                  <span>Calculator</span>
              </a>
          </li>
          <li>
              <a href=''>
                  <i><BsBell /></i>
                  <span>Notifications</span>
              </a>
          </li>
          <li>
              <a href=''>
                  <i><BsGear /></i>
                  <span>Settings</span>
              </a>
          </li>
          <li className='mt-16'>
              <a href=''>
                  <i><BsQuestionCircle /></i>
                  <span>Help</span>
              </a>
          </li>
        </ul>
      </aside>
      <main className='w-10/12 bg-gray-50'>main area</main>
    </section>
  )
}
