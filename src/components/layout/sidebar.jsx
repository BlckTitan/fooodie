import { useSession } from 'next-auth/react';
import React from 'react';
import { BsBell, BsCalculator, BsCart4, BsColumnsGap, BsGear, BsGrid, BsPencilSquare, BsPeople, BsQuestionCircle, BsTicketPerforated } from 'react-icons/bs'

export default function Sidebar() {

    // const session = useSession()

  return (
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
  )
}
