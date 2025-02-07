'use client';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import useFetch from '@/customHooks/useFetch';
import { Button, FloatingLabel, Form, Modal, Table } from 'react-bootstrap';
import { BsPlusLg, BsTrash3 } from 'react-icons/bs';
import Image from 'next/image';
import holder_img from '../../../public/img/holder_image.webp'; 

export default function AdminPage() {

  // const [isAdmin, setIsAdmin] = useState(false)
  const [modalShow, setModalShow] = React.useState(false);
  const session = useSession()

  useEffect(() => {
    // setIsAdmin(session?.data?.user?.isAdmin)
    if(session.status === 'unauthenticated') return redirect('/login')
    (session.status === 'loading') && <LoadingSpinner/> 
    
  }, [session]); 

  const {data, error, isLoading } = useFetch('/api/admin');

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
                        Array.isArray(data) && data.length > 0 && data.map((userData, index) => (
                            <tr key={index}>
                              {console.log(data)}
                                <td>{index+1}</td>
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
                                    <a href={`/profile/?id=${userData?._id}`} className='text-underline text-blue-500 hover:text-primaryColor'>view profile</a>
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