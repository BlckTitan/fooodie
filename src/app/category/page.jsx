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
import reload from '../../lib/reload'
import PaginationComponent from '@/components/layout/Pagination';
import { unauthorized } from 'next/server'
import { useSelector } from 'react-redux';

export default function CategoryPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

 // pagination states
 const currentPageData = useSelector((state) => state.currentPageData)//which pagination page to display
//  const [currentPage, setCurrentPage] = useState(2)//which pagination page to display
 const [pageSize, setPageSize] = useState(5); // Number of rows per page

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
        const root = createRoot(domRoot); // React 18 
        root.render(<CategoryModal />);
    } else {
        console.error("Target container not found!");
    }
}, [])

useEffect(() => {

  let isMounted = true;
  let response;

  const fetchData = async () => {

    setIsLoading(true); // Set loading to true before making the request
    setError(null); // Reset error before each fetch

    try {

      response = await axios.get('/api/category', 
      {
        params: {
          page: currentPageData.currentPage, 
          size: pageSize
        } 
      })
      
      if(isMounted){
        setData(response.data); // Set data on successful response 
        console.log(response.data)
      }

    } catch (error) {

      console.error(error);
      
      if(isMounted){
        setIsLoading(false); // Set loading to false when the request completes
      }


    } finally {

      // always executed
      if(isMounted){
        setIsLoading(false); // Set loading to false when the request completes
      }

    }

  };


  // unmounting the component hook
return () => {

  return fetchData(); // Only fetch if a URL is provided

  isMounted = false; // Avoids state updates on unmounted component

};

}, [currentPageData.currentPage, pageSize]);

//  fetch Category data from the database
//  const {data, error, isLoading } = useFetch('/api/category', 
//   {
//     params: {
//       page: currentPageData.currentPage, 
//       size: pageSize
//     } 
//   });

 if(isLoading) return <LoadingSpinner/>
 if(session?.data?.user?.isAdmin === false) return unauthorized()
  
 return (
   <section className='flex flex-col lg:flex-row w-full h-screen bg-white' id='root'>

     <Sidebar/>

     <main className='w-full lg:w-10/12 bg-gray-50 px-4 lg:px-6 py-6 lg:py-8 overflow-x-scroll lg:overflow-x-auto'>

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
        {(data === null || data?.data.length === 0) ? <h2 className='font-semibold text-center text-gray-400 text-2xl'>No category yet</h2> :
            
            <Table striped bordered hover>

                <thead>
                    <tr className='text-center'>
                        <th style={{width: '5%'}}>SN</th>
                        <th style={{width: '30%'}}>Title</th>
                        <th style={{width: '45%'}}>Description</th>
                        <th style={{width: '20%'}}>Action</th>
                    </tr>
                </thead>

                  <tbody>
                      {
                        (data !== null) && data?.data.map((categoryData, index) => (

                            <tr key={index}>
                                <td style={{width: '5%', textAlign: 'center'}}>{index+1}</td>
                                <td style={{width: '30%'}}>{(categoryData?.title) && categoryData.title}</td>
                                <td style={{width: '45%'}} className='overflow-ellipsis text-wrap'>{categoryData?.description.slice(0, 150)}</td>
                                <td style={{width: '20%', textAlign: 'center'}}>
                                    <a href={`/profile/?id=${categoryData?._id}`} className='text-underline text-blue-500 hover:text-primaryColor'>view category</a>
                                    <button 
                                        type='button' 
                                        className='text-red-500 ml-6' 
                                        onClick={(e) => {handleDelete(e, categoryData?._id)}}
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
      
     <PaginationComponent 
        data={data?.data} 
        loadingState={isLoading} 
        pageSize={pageSize}
        totalItemsNum={data?.totalItems}
      />

     </main>
   </section>
 )
}

// delete category handler
const handleDelete = async (e, id) => {

  const deleted = confirm(`Are you sure to delete category`);
   
 //  check if there is a category ID
  if((id !== '') && (deleted === true)){

     try {

       await axios.delete(`/api/category/?_id=${id}`)
       .then(function (response) {
         console.log(response)

         if(response.status === 200) return toast.success('Category deleted succesfully')
           
         // trigger reload after successful delete
         if(response.status === 200) return reload()
       })
       .catch(function(error) {
         console.log(error)
       })
       

     } catch (error) {

       console.log(error)
       if(error.response.data.message) return toast.error(error.response.data.message)

     }

  }else{
     if(deleted === false) return false
     if(id === '') return toast.error('Invalid category ID')
  }

}

// modal component
function CategoryModal(props){

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    //db category save handler
    const handleSave = async () => {
        
      if(title === ''){
        return toast.error('Title cannot be empty')
      }else{

        try {

          await axios.post('/api/category', {
            title, description
          })
          .then(function (response) {

            if(response.status === 200) return toast.success('category created successfully')
              
              // trigger page reload after successful save to db
              if(response.status === 200) return reload()

          })
          .catch(function (error) {

            console.log(error);
            if(error.response.data.message) return toast.error(error.response.data.message)
          });
          

        } catch (error) {

          console.log('failed to create post', error)

        }
      }

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