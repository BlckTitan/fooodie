'use client'

import LoadingSpinner from '@/components/layout/LoadingSpinner';
import Sidebar from '@/components/layout/sidebar';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { createRoot } from 'react-dom/client';
import { BsPlusLg, BsTrash3 } from 'react-icons/bs';
import reload from '../../lib/reload'
import PaginationComponent from '@/components/layout/Pagination';
import { unauthorized } from 'next/server'
import { useSelector } from 'react-redux';
import holder_img from '../../../public/img/holder_image.webp'; 
import Image from 'next/image';
import { AlertError, AlertSuccess } from '@/components/layout/Alerts';

export default function MenuPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

 // pagination states
 const currentPageData = useSelector((state) => state.currentPageData)//which pagination page to display

 const [pageSize, setPageSize] = useState(8); // Number of rows per page

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
        root.render(<MenuModal />);
    } else {
        console.error("Target container not found!");
    }
}, [])

useEffect(() => {

  let isMounted = true;
  let response;

  const fetchData = async (page) => {

    setIsLoading(true); // Set loading to true before making the request
    setError(null); // Reset error before each fetch

    try {

      response = await axios.get('/api/menu', 
      {
        params: {
          page, 
          size: pageSize
        } 
      })
      
      if(isMounted){
        setData(response.data); // Set data on successful response 
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

  fetchData(currentPageData.currentPage)

  // unmounting the component hook
  return () => {
    isMounted = false; // Avoids state updates on unmounted component
  };

}, [currentPageData.currentPage, pageSize]);

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
        >Add Menu</Button>

       <MenuModal
            title='Add New Menu'
            show={modalShow}
            onHide={() => setModalShow(false)}
        />

     </header>

     {/* table to list out components */}
     {(isLoading) && <LoadingSpinner/>}
        {(data === null || data?.data.length === 0) ? <h2 className='font-semibold text-center text-gray-400 text-2xl'>No menu yet</h2> :
            
            <Table striped bordered hover>

                <thead>
                    <tr className='text-center'>
                        <th style={{width: '5%'}}>SN</th>
                        <th style={{width: '20%'}}>Image</th>
                        <th style={{width: '20%'}}>Title</th>
                        <th style={{width: '35%'}}>Description</th>
                        <th style={{width: '5%'}}>price</th>
                        <th style={{width: '15%'}}>Action</th>
                    </tr>
                </thead>

                  <tbody>
                      {
                        (data !== null) && data?.data.map((menuData, index) => (

                            <tr key={index}>
                                <td style={{width: '5%', textAlign: 'center'}}>{index+1}</td>
                                <td style={{width: '20%'}}>
                                  <Image
                                    width={150}
                                    height={100}
                                    style={{display: 'flex', flexDirection:'justify-center',  objectFit:'cover'}}
                                    alt='Menu image'
                                    src={(menuData?.image?.secure_url) && menuData?.image?.secure_url}
                                  />
                                </td>
                                <td style={{width: '20%'}}>{(menuData?.title) && menuData?.title}</td>
                                <td style={{width: '35%'}} className='overflow-ellipsis text-wrap'>{menuData?.description.slice(0, 150)}</td>
                                <td style={{width: '5%'}}>{(menuData?.price) && menuData?.price}</td>
                                <td style={{width: '15%', textAlign: 'center'}}>
                                    <a href={`/profile/?id=${menuData?._id}`} className='text-underline text-blue-500 hover:text-primaryColor'>view Menu</a>
                                    <button 
                                        type='button' 
                                        className='text-red-500 ml-6' 
                                        onClick={(e) => {handleDelete(e, menuData?._id)}}
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

// delete menu handler
const handleDelete = async (e, id) => {

  const deleted = confirm(`Are you sure to delete menu`);
   
 //  check if there is a menu ID
  if((id !== '') && (deleted === true)){

     try {

       await axios.delete(`/api/menu/?_id=${id}`)
       .then(function (response) {
         console.log(response)

         if(response.status === 200){
          return (
            AlertSuccess('Menu deleted succesfully'),
            // trigger reload after successful delete
            reload()
          )
        }
       })
       .catch(function(error) {
         console.log(error)
       })

     } catch (error) {

       console.log(error)
       if(error.response.data.message) return AlertError(error.response.data.message)

     }

  }else{
     if(deleted === false) return false
     if(id === '') return AlertError('Invalid menu ID')
  }

}

// modal component
function MenuModal(props){

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState()
    const [imageData, setImageData] = useState('')
    const [newUploadUrl, setNewUploadUrl] = useState('')

    const handleHolderImg = async (e) =>{

      const file = await e.target.files;
      const url = URL.createObjectURL(file[0])

      // set new url if we have selected a new image
      if(url){
        setNewUploadUrl(url)
      } 

    }
    // handle upload
    const handleUpload = async () => {

        if(!imageData){
          return AlertError('No file selected')
        }

        if(title === '' || price === ''){
          return AlertError('Title or Price cannot be empty')
        } 

        const file = await imageData.target.files;
        let data; 
  
        //checking for file size and type(image files)
        if(file[0].size < 1024 * 1024 && file[0].type.startsWith('image/')){
    
          //creating a link for the upload file
          const url = URL.createObjectURL(file[0])
          
          data = new FormData(); 

          data.set('file', file[0])
          data.set('url', url)
          data.set('title', title)
          data.set('description', description)
          data.set('price', price)

          try {

            axios({

              method: 'post',
              url: '/api/menu/',
              data: data,

            })
            .then(function (response) {
  
              if(response.status === 200){
                return(
                  // trigger page reload after successful save to db
                  reload(),
                  AlertSuccess('Menu created successfully')
                )
              }
  
            })
            .catch(function (error) {
  
              console.log(error);
              if(error.response.data.message) return AlertError(error.response.data.message)
            
            })
  
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
  
        <Modal.Body className='w-full flex flex-col lg:flex-row'>

          <header className='w-full h-80 lg:h-96 lg:w-2/5 relative'>

            <Image 
                src={(newUploadUrl) ? newUploadUrl : holder_img}  
                width={200}
                height={100}
                alt='This is a user placeholder image; format: png;'
                className='w-full h-full cover'
            />

            <Form.Label 
                htmlFor='uploadImg' 
                className='text-2xl xl:text-4xl cursor-pointer absolute left-36 lg:left-1/2 bottom-1/2 lg:bottom-1/2 border text-gray-500 bg-white'
            >
                <BsPlusLg />
            </Form.Label>

          </header>

          <Form className='w-full lg:w-3/5 lg:ml-2' action={handleUpload}>
            
            <Form.Group className="mb-3" controlId="formBasicText">
            
                <Form.Control 
                  id='uploadImg'
                  type='file'
                  accept='image/*'
                  onChange={(e) => {setImageData(e), handleHolderImg(e)}}
                  className='hidden'
                  name='image'
                  required
                />

            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  
              <Form.Label>Title</Form.Label>
              <Form.Control required type="text" placeholder="Meal name" value={title} onChange={(e) => setTitle(e.target.value)}/>
  
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" value={description} onChange={(e) => setDescription(e.target.value)}>
  
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
  
            </Form.Group>

            <Form.Group className="mb-3 w-1/3" controlId="exampleForm.ControlInput1">
  
              <Form.Label>Price</Form.Label>
              <Form.Control required type="number" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)}/>
  
            </Form.Group>
            
          </Form>
  
        </Modal.Body>
  
        <Modal.Footer>
  
          <Button variant='primary' onClick={handleUpload}>Save</Button>
          <Button variant='secondary' onClick={props.onHide}>Close</Button>
  
        </Modal.Footer>
  
      </Modal>
    )
}