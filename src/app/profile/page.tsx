'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '../../components/layout/LoadingSpinner';
import { redirect } from 'next/navigation';
import Accordion from 'react-bootstrap/Accordion';
import PersonalInfo from '../../components/layout/profile/PersonalInfo'
import AccountInfo from '../../components/layout/profile/AccountInfo'
import AddressInfo from '../../components/layout/profile/AddressInfo'
import BillingInfo from '../../components/layout/profile/BillingInfo'
import OrderHistory from '../../components/layout/profile/OrderHistory'
import MyVerticallyCenteredModal from '@/components/layout/MyVerticallyCenteredModal';

export default function ProfilePage() {

  const [modalShow, setModalShow] = useState(false);
  const session = useSession();

  if(session.status === 'loading') return <LoadingSpinner/>

  if(session.status === 'unauthenticated') return redirect('/login')

    const handleEdit = async () => {
      setModalShow(true)
    }
  return (
    <section className='container h-screen py-8 bg-white'>
      <header className='py-4'>
        
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />

        <div>
          <button 
            type="button" 
            className='bg-primaryColor hover:bg-orange-800 text-white rounded-md px-6 py-2'
            onClick={ handleEdit }
          >Update Information</button>
        </div>

      </header>
      <Accordion>

        <Accordion.Item eventKey="0">
          <Accordion.Header className='text-5xl font-semibold'>Personal Information</Accordion.Header>
          <Accordion.Body className='visible'>
            <PersonalInfo/>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header className='font-semibold'>Account Information</Accordion.Header>
          <Accordion.Body className='visible'>
            <AccountInfo/>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header className='font-semibold'>Address Information</Accordion.Header>
          <Accordion.Body className='visible'>
            <AddressInfo/>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header className='font-semibold'>Billing</Accordion.Header>
          <Accordion.Body className='visible'>
            <BillingInfo />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header className='font-semibold'>Order History</Accordion.Header>
          <Accordion.Body className='visible'>
            <OrderHistory />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

    </section>
  )
}