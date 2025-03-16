'use client';

import LoadingSpinner from '@/components/layout/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import { Button, FloatingLabel, Form, Modal, Table } from 'react-bootstrap';
import { BsPlusLg, BsTrash3 } from 'react-icons/bs';
import Image from 'next/image';
import holder_img from '../../../public/img/Profile_avatar_placeholder.png'; 
import { useSelector } from 'react-redux';
import axios from 'axios';
import PaginationComponent from '@/components/layout/Pagination';
import reloadPage from '@/lib/reload';
import { AlertError, AlertSuccess } from '@/components/layout/Alerts';

export default function AdminPage() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const [isAdmin, setIsAdmin] = useState(false)
  const [modalShow, setModalShow] = React.useState(false);
  const session = useSession()

  // pagination states
  const currentPageData = useSelector((state) => state.currentPageData)//which pagination page to display

  const [pageSize, setPageSize] = useState(8); // Number of rows per page


  useEffect(() => {
    // setIsAdmin(session?.data?.user?.isAdmin)
    if(session.status === 'unauthenticated') return redirect('/login')
    (session.status === 'loading') && <LoadingSpinner/> 
    
  }, [session]); 

  useEffect(() => {

    let isMounted = true;
    let response;
  
    const fetchData = async (page) => {
  
      setIsLoading(true); // Set loading to true before making the request
      setError(null); // Reset error before each fetch
  
      try {
  
        response = await axios.get('/api/admin', 
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

  if(isLoading) return <LoadingSpinner/>;
  if(session?.data?.user?.isAdmin === false) return redirect('/login')

  const handleDelete = async (e, id) => {

    e.preventDefault();

    const isDeleted = confirm(`Are you sure to delete administrator`)
    
    try {
      if(isDeleted){
        await axios.delete(`/api/admin/?_id=${id}`)
        .then(function (response) {
          if(response.status === 200){
            AlertSuccess('Admin deleted successfully')
            return reloadPage()
          }else{
            AlertError('Failed to delete adminnistrator')
          }
        })
      }
    }
    catch (error) {
      console.error('Failed to delete admin', error)
    }
  }

  return (
    <section className='flex flex-col lg:flex-row w-full h-screen bg-white'>

      <Sidebar/>

      <main className='w-full lg:w-10/12 bg-gray-50 px-4 lg:px-6 py-6 lg:py-8 overflow-x-scroll'>

      <header className='w-full h-24 mb-4 flex justify-between items-center'>

        <Button 
              type='button' 
              variant='primary'
              className='p-2 rounded-md text-white' 
              onClick={() => setModalShow(true)}
          >Add Admin</Button>

          {/* modal to add a new category */}
        <UserModal
              title='Add New User'
              show={modalShow}
              onHide={() => setModalShow(false)}
          />

      </header>

        { (isLoading) ? <LoadingSpinner/> :
            
            <Table striped bordered hover className='overflow-x-scroll'>

                <thead>
                    <tr className='text-center'>
                        <th>SN</th>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        Array.isArray(data?.data) && data?.data.length > 0 && data?.data.map((adminData, index) => (
                          
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td className='flex justify-center'>
                                    <Image 
                                      src={(adminData?.image) ? adminData?.image?.secure_url : holder_img} 
                                      alt=''
                                      width={100}
                                      height={100}
                                      style={{width: '100px', height: '100px', borderRadius: '100%', objectFit: 'cover', objectPosition: 'center'}}
                                    />
                                </td>
                                <td>{(adminData?.name) ? adminData.name.toUpperCase() : `${adminData?.lastName.toUpperCase()} ${adminData?.firstName.toUpperCase()}`}</td>
                                <td>{(adminData?.email) && adminData?.email}</td>
                                <td className='w-64 text-center text-wrap'>
                                    <a href={`/profile/?id=${adminData?._id}`} className='text-underline text-blue-500 hover:text-primaryColor'>view admin profile</a>
                                    <button 
                                      type='button' 
                                      className='text-red-500 ml-4 text-center' 
                                      onClick={(e) => {handleDelete(e, adminData?._id)}}
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

// modal component
function UserModal(props){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [imageData, setImageData] = useState('')
    const [phone, setPhone] = useState('')
    const [newUploadUrl, setNewUploadUrl] = useState('')

    const handleHolderImg = async (e) =>{

      const file = e.target.files[0];
      const url = URL.createObjectURL(file)
  
      // set new image data if we have selected a new file
      if(file){
        
        setImageData(file)

      } 
      // set new url if we have selected a new image
      if(url){
        setNewUploadUrl(url)
      } 
  
    }

    // input field validation
    const handleValidation = () => {

      if(firstName === '') return AlertError('First name cannot be empty')
      if(lastName === '') return AlertError('Last name cannot be empty')
      if(username === '') return AlertError('Username cannot be empty') 
      if(email === '') return AlertError('Email cannot be empty')
      if(phone === '') return AlertError('Phone number cannot be empty')
      if(password === '') return AlertError('Password cannot be empty')
      else if(password.length < 8) return AlertError('Password must be at least 8 characters long')
      else{ return true }

    }
    
  //db admin save handler
  const handleSave = async (e) => {

      e.preventDefault()
   
      const validate = handleValidation()
      let file;
   
      if(imageData === ''){
        return AlertError('Select and image for upload')
      }else if(validate !== true){
        return  false
      }else{

        file = imageData;

        let data; 
  
        //checking for file size and type(image files)
        if(file.size < 1024 * 1024 && file.type.startsWith('image/')){
          
          data = new FormData(); 

          data.set('file', file)
          data.set('firstName', firstName)
          data.set('lastName', lastName)
          data.set('username', username)
          data.set('email', email)
          data.set('phone', phone)
          data.set('password', password)

        try {

          const response = await axios({
          method: 'post',
          url: '/api/admin',
          data: data,
          headers: {'Content-Type': 'multipart/form-data'}
          
        })

          console.log(response)                                                                                                                                                                                                                                                                                                                                           

          if(response.status === 200){
              
            AlertSuccess('user created successfully')
            // trigger page reload after successful save to db
            reloadPage()
          }

        } catch (error) {

          if(error.response.data.message) return AlertError(error.response.data.message)
          console.log('Failed to create post', error)
          return AlertError('Failed to create post')
        }
      }else{
        return AlertError('File size must be less than 1MB and must be an image file')
      }
    }

  }

  return(

      <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
      >

      <Modal.Header closeButton>

        <Modal.Title id="contained-modal-title-vcenter">
          Add New User
        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        <header className='w-full h-48 lg:h-48 flex items-center justify-center relative'>

          <Image 
            src={(newUploadUrl) ? newUploadUrl : holder_img}  
            width={100}
            height={100}
            alt='This is a user placeholder image; format: png;'
            className='w-48 h-48 object-cover object-center'
          />

          <Form.Label 
            htmlFor='uploadImg' 
            className='text-2xl xl:text-4xl cursor-pointer border text-gray-500 bg-white absolute'
          >
              <BsPlusLg />

          </Form.Label>

        </header>
        
      <Form className='w-full'>

        <Form.Group className="mb-3" controlId="uploadImg">
                    
          <Form.Control 
            type='file'
            accept='image/*'
            onChange={(e) => {setImageData(e), handleHolderImg(e)}}
            className='!hidden'
            name='image'
          />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicFirstName">

          <FloatingLabel controlId="formBasicFirstName" label="First Name">
            <Form.Control 
              type="text" 
              placeholder="John" 
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </FloatingLabel>

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">

          <FloatingLabel controlId="formBasicLastName" label="Last Name">
            <Form.Control 
              type="text" 
              placeholder="Bricks" 
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </FloatingLabel>

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">

          <FloatingLabel controlId="formBasicEmail" label="Email address">
            <Form.Control 
              type="email" 
              placeholder="name@example.com" 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FloatingLabel>

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">

          <FloatingLabel controlId="formBasicPhone" label="Phone Number">
            <Form.Control 
              type="tel" 
              placeholder="+234 800 000 0000" 
              onChange={(e) => setPhone(e.target.value)}
              required
              minLength={9}
              maxLength={15}
            />
          </FloatingLabel>

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">

          <FloatingLabel controlId="formBasicUsername" label="Username" >
            <Form.Control 
              type="text"  
              placeholder="" 
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FloatingLabel>

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">

          <FloatingLabel controlId="formBasicPassword" label="Password">
            <Form.Control 
              type="password" 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </FloatingLabel>

        </Form.Group>

        </Form>

      </Modal.Body>

      <Modal.Footer className='w-full flex flex-col md:flex-row md:!justify-between  md:items-stretch'>

        <Button 
          type='submit'
          variant='primary' onClick={(e) => handleSave(e)} 
          className='w-full md:w-48'
        >
          Save
        </Button>
        <Button variant='secondary' onClick={props.onHide} className='w-full md:w-48'>Close</Button>

      </Modal.Footer>

    </Modal>
  )
}