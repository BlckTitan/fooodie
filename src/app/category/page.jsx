'use client'

import LoadingSpinner from '@/components/layout/LoadingSpinner';
import Sidebar from '@/components/layout/sidebar';
import useFetch from '@/customHooks/useFetch';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { BsTrash3 } from 'react-icons/bs';
import Modals from '@/components/layout/Modals'

export default function CategoryPage() {
 const [modalShow, setModalShow] = React.useState(false);
 const session = useSession()

 useEffect(() => {
    
   if(session.status === 'unauthenticated') return redirect('/login')
   (session.status === 'loading') && <LoadingSpinner/> 
   
 }, [session]); 

 const {data, error, isLoading } = useFetch('/api/category');

 if(isLoading) return <LoadingSpinner/>;
 if(session?.data?.user?.isAdmin === false) return redirect('/login')

 const handleDelete = async (e, id) => {
   confirm(`Are you sure to delete category`)
 }
 
 return (
   <section className='flex flex-col lg:flex-row w-full h-screen bg-white'>

     <Sidebar/>

     <main className='w-full lg:w-10/12 bg-gray-50 px-4 lg:px-6 py-6 lg:py-8 overflow-x-scroll'>

     <header className='w-full h-24 mb-4 flex justify-between items-center'>
       <button 
            type='button' 
            variant='primary'
            className='bg-blue-500 p-2 rounded-md text-white' 
            onClick={() => setModalShow(true)}
        >Add Category</button>
       <Modals
       title='Add New Category'
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
     </header>

        {(isLoading) && <LoadingSpinner/>}
        {(data === null || data.length === 0) ? <h2 className='font-semibold text-center text-gray-400 text-2xl'>No category yet</h2> :
            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        (data !== null) && data.map((categoryData, index) => (

                            <tr key={index}>
                                <td>{index}</td>
                                <td>{(categoryData?.title) && categoryData.title.toUpperCase()}</td>
                                <td>{categoryData?.description}</td>
                                <td>
                                    <a href={`/profile/?id=${categoryData?._id}`} className='text-underline text-blue-500 hover:text-primaryColor'>view category</a>
                                    <button 
                                        type='button' 
                                        className='text-red-500 ml-4' 
                                        onClick={(e) => {handleDelete(e, userData?._id)}}
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
