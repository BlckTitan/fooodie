'use client';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import Sidebar from '@/components/layout/sidebar';
import useFetch from '@/customHooks/useFetch';
import { Table } from 'react-bootstrap';
import { BsTrash3 } from 'react-icons/bs';
import Image from 'next/image';

export default function UserPage() {

  const session = useSession()

  useEffect(() => {
    
    if(session.status === 'unauthenticated') return redirect('/login')
    (session.status === 'loading') && <LoadingSpinner/> 
    
  }, [session]);

  const {data, error, isLoading } = useFetch('/api/user');

  if(isLoading) return <LoadingSpinner/>;

  const handleDelete = async (e, id) => {
    confirm(`Are you sure to delete user`)
  }

  
  console.log(session?.data?.user?.isAdmin)

  return (
    <section className='flex flex-col lg:flex-row w-full h-screen bg-white'>

      <Sidebar/>

      <main className='w-full lg:w-10/12 bg-gray-50 px-4 lg:px-6 py-6 lg:py-8 overflow-x-scroll'>

      <header className='bg-blue-400 w-full h-24 mb-4'>
        header
      </header>

        { (isLoading) ? <LoadingSpinner/> :
            
            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>SN</th>
                        <th></th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        (data !== null) && data.map((userData, index) => (

                            <tr key={index}>
                                <td>{index.length}</td>
                                <td>
                                    <Image 
                                        src={userData?.image?.secure_url} 
                                        alt=''
                                        width={60}
                                        height={60}
                                        style={{width: '45', height: '45'}}
                                        className='object-cover rounded-full'
                                    />
                                </td>
                                <td>{(userData?.name) ? userData.name.toUpperCase() : `${userData?.firstName.toUpperCase()} ${userData?.firstName.toUpperCase()}`}</td>
                                <td>{userData?.phone}</td>
                                <td>{(userData?.isAdmin === true) ? "Administrator" : "Customer"}</td>
                                <td>
                                    <a href='/profile' className='text-underline text-blue-500 hover:text-primaryColor'>view profile</a>
                                    <button 
                                      type='button' 
                                      className='text-red-500 ml-4' 
                                      onClick={(e) => {handleDelete(e, userData._id)}}
                                    >
                                      <BsTrash3 />
                                    </button>
                                </td>
                            </tr>

                        ))
                    }
                </tbody>

            </Table>
        }
      </main>
    </section>
  )
}
