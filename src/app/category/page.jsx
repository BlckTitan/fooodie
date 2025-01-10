'use client'

import LoadingSpinner from '@/components/layout/LoadingSpinner';
import Sidebar from '@/components/layout/sidebar';
import useFetch from '@/customHooks/useFetch';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { createRoot } from 'react-dom/client';
import { BsTrash3 } from 'react-icons/bs';
import { toast } from 'react-toastify';

export default function CategoryPage() {

 const [modalShow, setModalShow] = React.useState(false);
 const session = useSession()

 useEffect(() => {
    //user authentication check
   if(session.status === 'unauthenticated') return redirect('/login')
   (session.status === 'loading') && <LoadingSpinner/> 
   
 }, [session]); 

 
{/*mounting form modal to add category */}
 useEffect(() =>{
    const domRoot = document.getElementById('root')

    if (domRoot) {
        const root = createRoot(domRoot); // React 18+
        root.render(<CategoryModal />);
    } else {
        console.error("Target container not found!");
    }
}, [])

//  fetch Category dta from the database
 const {data, error, isLoading } = useFetch('/api/category');

 if(isLoading) return <LoadingSpinner/>;
 if(session?.data?.user?.isAdmin === false) return redirect('/login')

// delete category handller
 const handleDelete = async (e, id) => {
   confirm(`Are you sure to delete category`)
 }
 
 return (
   <section className='flex flex-col lg:flex-row w-full h-screen bg-white' id='root'>

     <Sidebar/>

     <main className='w-full lg:w-10/12 bg-gray-50 px-4 lg:px-6 py-6 lg:py-8 overflow-x-scroll'>

     <header className='w-full h-24 mb-4 flex justify-between items-center'>

       <Button 
            type='button' 
            variant='primary'
            className='p-2 rounded-md text-white' 
            onClick={() => setModalShow(true)}
        >Add Category</Button>

       <CategoryModal
            title='Add New Category'
            show={modalShow}
            onHide={() => setModalShow(false)}
        />

     </header>

        {/* table to list out components */}
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

// modal component
function CategoryModal(props){

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    //db category save handler
    const handleSave = async () => {
        
      if(title === ''){
        toast.error('title cannot be empty')
        return false
      }else{

        try {

          await axios.post('/api/category', {
            title, description
          })
          .then(function (response) {

            console.log(response);

          })
          .catch(function (error) {

            console.log(error);

          });

        } catch (error) {

          console.log('failed to create post', error)

        }

      }

      return redirect('/category')
    }

    return(

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

        <Modal.Header closeButton>
  
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
  
        </Modal.Header>
  
        <Modal.Body>
  
          <Form>
  
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  
              <Form.Label>Title</Form.Label>
              <Form.Control required type="text" placeholder="New Category" value={title} onChange={(e) => setTitle(e.target.value)}/>
  
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" value={description} onChange={(e) => setDescription(e.target.value)}>
  
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
  
            </Form.Group>
            
          </Form>
  
        </Modal.Body>
  
        <Modal.Footer>
  
          <Button variant='primary' onClick={handleSave}>Save</Button>
          <Button variant='secondary' onClick={props.onHide}>Close</Button>
  
        </Modal.Footer>
  
      </Modal>
    )
}