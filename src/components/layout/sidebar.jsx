'use client'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { BsBell, BsCalculator, BsCardList, BsCart4, BsColumnsGap, BsGear, BsGrid, BsPeople, BsPerson, BsQuestionCircle } from 'react-icons/bs'
import LoadingSpinner from './LoadingSpinner';
import { usePathname } from 'next/navigation';

    export default function Sidebar() {

    const [isAdmin, setIsAdmin] = useState(true)
    const session = useSession()
    let pathname = usePathname()
    
    pathname = pathname.slice(1, pathname.length)

  useEffect(() => {

    (session.status === 'loading') && <LoadingSpinner/> 
    setIsAdmin(session?.data?.user?.isAdmin)

  }, [session, isAdmin]);
  
  return (
    <aside className='w-2/12 hidden lg:inline-block'>
        <ul className='sidebar_navigation'>
          <li className={(pathname === 'dashboard') ? '!border-l-blue-600 border-l-4' : 'border-l-white'}>
              <a href='/dashboard' className={(pathname === 'dashboard') ? 'text-blue-600' : 'text-black'}>
                  <i><BsColumnsGap /></i>
                  <span>Dashboard</span>
              </a>
          </li>
          <li className={(pathname === 'admin') ? '!border-l-blue-600 border-l-4' : 'border-l-white'}>
              <a href='/admin' className={(pathname === 'admin') ? 'text-blue-600' : 'text-black'}>
                  <i><BsPerson /></i>
                  <span>Administrators</span>
              </a>
          </li>
          
          {(isAdmin === true) &&
          <>
            <li className={(pathname === 'user') ? '!border-l-blue-600 border-l-4' : 'border-l-white'}>
                <a href='/user' className={(pathname === 'user') ? 'text-blue-600' : 'text-black'}>
                    <i><BsPeople /></i>
                    <span>Users</span>
                </a>
            </li>
             <li className={(pathname === 'category') ? '!border-l-blue-600 border-l-4' : 'border-l-white'}>
                <a href='/category' className={(pathname === 'category') ? 'text-blue-600' : 'text-black'}>
                    <i><BsGrid /></i>
                    <span>Categories</span>
                </a>
            </li>
            <li className={(pathname === 'menu') ? '!border-l-blue-600 border-l-4' : 'border-l-white'}>
                <a href='/menu' className={(pathname === 'menu') ? 'text-blue-600' : 'text-black'}>
                    <i><BsCardList /></i>
                    <span>Menu</span>
                </a>
            </li>
            <li className={(pathname === 'orders') ? '!border-l-blue-600 border-l-4' : 'border-l-white'}>
                <a href='' className={(pathname === 'orders') ? 'text-blue-600' : 'text-black'}>
                    <i><BsCart4 /></i>
                    <span>Orders</span>
                </a>
            </li>
          </>
          }
          <li className={(pathname === 'calculator') ? '!border-l-blue-600 border-l-4' : 'border-l-white'}>
              <a href='' className={(pathname === 'calculator') ? 'text-blue-600' : 'text-black'}>
                  <i><BsCalculator /></i>
                  <span>Calculator</span>
              </a>
          </li>
          <li className={(pathname === 'notification') ? '!border-l-blue-600 border-l-4' : 'border-l-white'}>
              <a href='' className={(pathname === 'notification') ? 'text-blue-600' : 'text-black'}>
                  <i><BsBell /></i>
                  <span>Notifications</span>
              </a>
          </li>
          <li className={(pathname === 'settings') ? '!border-l-blue-600 border-l-4' : 'border-l-white'}>
              <a href='' className={(pathname === 'settings') ? 'text-blue-600' : 'text-black'}>
                  <i><BsGear /></i>
                  <span>Settings</span>
              </a>
          </li>
          <li className={(pathname === 'help') ? '!border-l-blue-600 border-l-4 mt-16' : 'border-l-white mt-16'}>
              <a href='' className={(pathname === 'help') ? 'text-blue-600' : 'text-black'}>
                  <i><BsQuestionCircle /></i>
                  <span>Help</span>
              </a>
          </li>
        </ul>
      </aside>
  )
}
