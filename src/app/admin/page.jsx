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
    confirm(`Are you sure to delete administrator`)
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
                    <tr>
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
                                <td>
                                    <Image 
                                      src={(adminData?.image) ? adminData?.image?.secure_url : holder_img} 
                                      alt=''
                                      width={60}
                                      height={60}
                                      style={{width: '45', height: '45'}}
                                      className='object-cover rounded-full'
                                    />
                                </td>
                                <td>{(adminData?.name) ? adminData.name.toUpperCase() : `${adminData?.firstName.toUpperCase()} ${adminData?.firstName.toUpperCase()}`}</td>
                                <td>{(adminData?.email) && adminData?.email}</td>
                                <td className='w-64 text-center text-wrap'>
                                    <a href={`/profile/?id=${adminData?._id}`} className='text-underline text-blue-500 hover:text-primaryColor'>view admin profile</a>
                                    <button 
                                      type='button' 
                                      className='text-red-500 ml-4' 
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
    const [isAdmin, setIsAdmin] = useState(false)
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

  //db category save handler
  const handleSave = async () => {
      
    if(title === ''){
      return AlertError('Title cannot be empty')
    }else{
      const file = await imageData.target.files;
        let data; 
  
        //checking for file size and type(image files)
        if(file[0].size < 1024 * 1024 && file[0].type.startsWith('image/')){
          
          data = new FormData(); 

          data.set('file', file[0])
          data.set('firstName', firstName)
          data.set('lastName', lastName)
          data.set('username', username)
          data.set('email', email)
          data.set('password', password)
          data.set('isAdmin', isAdmin)

        try {

          await axios({
            method: 'post',
            url: '/api/register/',
            data: data,

          })
          .then(function (response) {

            if(response.status === 200){
              return(
                // trigger page reload after successful save to db
                reload(),
                AlertSuccess('user created successfully')
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

        <header className='w-full h-80 lg:h-48 relative bg-red-200'>

        <Image 
            src={(newUploadUrl) ? newUploadUrl : holder_img}  
            width={200}
            height={100}
            alt='This is a user placeholder image; format: png;'
            className='w-full h-full cover'
        />

        <Form.Label 
          htmlFor='uploadImg' 
          className='text-2xl xl:text-4xl cursor-pointer absolute left-1/2 bottom-1/2 border text-gray-500 bg-white'
        >
            <BsPlusLg />

        </Form.Label>

</header>
      <Form className='w-full' onSubmit={e => handleSubmit(e)}>

        <Form.Group className="mb-3" controlId="formBasicText">
                    
          <Form.Control 
            id='uploadImg'
            type='file'
            accept='image/*'
            onChange={(e) => {setImageData(e), handleHolderImg(e)}}
            className='hidden'
            name='image'
          />

        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicFirstName">

          <FloatingLabel controlId="floatingInput" label="First Name" className="mb-3">
            <Form.Control type="text" placeholder="John" onChange={(e) => setFirstName(e.target.value)}/>
          </FloatingLabel>

        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicLastName">

          <FloatingLabel controlId="floatingInput" label="Last Name" className="mb-3">
            <Form.Control type="text" placeholder="Bricks" onChange={(e) => setLastName(e.target.value)}/>
          </FloatingLabel>

        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicEmail">

          <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
            <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
          </FloatingLabel>

        </Form.Group>


        <Form.Group className="mb-4" controlId="formBasicUsername">

          <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
            <Form.Control type="text"  placeholder="" onChange={(e) => setUsername(e.target.value)}/>
          </FloatingLabel>

        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">

          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          </FloatingLabel>

        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicAdmin">

          <div className="mb-3 flex">
            <Form.Check aria-label="admin" className='mr-3' onClick={(e) => setIsAdmin(e.target.checked)}/>
            <Form.Check.Label>Administrator</Form.Check.Label>
          </div>

        </Form.Group>

        <Form.Group className='flex justify-center'>
          <Button variant="primary" type="submit"  className='mx-auto w-full xl:w-3/5'>
            Submit
          </Button>
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