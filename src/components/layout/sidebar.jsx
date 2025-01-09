'use client'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { BsBell, BsCalculator, BsCart4, BsColumnsGap, BsGear, BsGrid, BsPencilSquare, BsPeople, BsQuestionCircle, BsTicketPerforated } from 'react-icons/bs'
import LoadingSpinner from './LoadingSpinner';

    export default function Sidebar() {

    const[isAdmin, setIsAdmin] = useState(true)
    const session = useSession()

  useEffect(() => {
    
    (session.status === 'loading') && <LoadingSpinner/> 
    setIsAdmin(session?.data?.user?.isAdmin)

  }, [session, isAdmin]);
  
  return (
    <aside className='w-2/12 hidden lg:inline-block'>
        <ul className='sidebar_navigation'>
          <li>
              <a href='/dashboard'>
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
          
          {(isAdmin === true) &&
          <>
            <li>
                <a href='/user'>
                    <i><BsPeople /></i>
                    <span>Users</span>
                </a>
            </li>
             <li>
                <a href='/category'>
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
          </>
          }
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
  )
}
