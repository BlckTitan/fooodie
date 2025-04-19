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
// import useFetch from '@/customHooks/useFetch';
import axios from 'axios';

export default function ProfilePage() {

  const [modalShow, setModalShow] = useState(false);
  const [userId, setUserId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState('')
  const [img, setImg] = useState('')
  const [username, setUsername] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [street, setStreet] = useState('')

  const session = useSession();

  useEffect(() => {
    (session.status === 'loading') ? <LoadingSpinner/> : fetchUser()
  }, [session]);

  const fetchUser = async () =>{

    setUserId(session?.data?.user?.id || '')
    setIsLoading(true); // Set loading to true before making the request
    setError(''); // Reset error before each fetch

    try {
      
      if(userId !== null){
        const response = await axios.get(`/api/user?_id=${userId}`);
        setData(response.data)
        setName(response.data?.name); // Set name on ok response
        setFirstName(response.data?.firstName); // Set firstname on ok response
        setLastName(response.data?.lastName); // Set lastname on ok response
        setEmail(response.data?.email); // Set email on ok response
        setPhone(response.data?.phone); // Set phone on ok response
        setImg(response.data?.image?.secure_url); // Set img on ok response
        setUsername(response.data?.username); // Set username on ok response
        setCountry(response.data?.address?.country); // Set country on ok response
        setState(response.data?.address?.state); // Set state on ok response
        setCity(response.data?.address?.city); // Set city on ok response
        setRegion(response.data?.address?.region)// Set region on ok response
        setStreet(response.data?.address?.street)// Set street on ok response
      }

    } catch (err: string | any) {

      setError(err); // Capture and set error
      console.log(error)

    } finally {

      setIsLoading(false); // Set loading to false when the request completes

    }
  }

  if(session.status === 'unauthenticated') return redirect('/login')
  if(session.status === 'loading' || isLoading === true) return <LoadingSpinner/>

  const handleEdit = async () => {
    setModalShow(true)
  } 
  
  return (
    <section className='container h-screen py-8 bg-white'>
      <header className='py-4'>
        
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}

          editName={name}
          editFirstname={firstname}
          editLastname={lastname}
          editEmail={email}
          editPhone={phone}
          editUsername={username}
          editCountry={country}
          editState={state}
          editCity={city}
          editRegion={region}
          editStreet={street}
          loadingState={isLoading}
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
            <PersonalInfo 
              name={name}
              firstname={firstname}
              lastname={lastname}
              email={email}
              phone={phone}
              img={img}
              loadingState={isLoading}
            />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header className='font-semibold'>Account Information</Accordion.Header>
          <Accordion.Body className='visible'>
            <AccountInfo  
              account_email={email}
              username={username}
              loadingState={isLoading}
            />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header className='font-semibold'>Address Information</Accordion.Header>
          <Accordion.Body className='visible'>
            <AddressInfo
              country={country}
              state={state}
              city={city}
              region={region}
              street={street}
              loadingState={isLoading}
            />
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