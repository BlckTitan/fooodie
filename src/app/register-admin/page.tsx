'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import GoogleLogo from '../../../public/img/Google-logo.png'
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { AlertError, AlertSuccess } from '@/components/layout/Alerts';
import { useRouter } from 'next/navigation';
import { BsPlusLg } from 'react-icons/bs';
import holder_img from '../../../public/img/Profile_avatar_placeholder.png'; 
import reloadPage from '@/lib/reload';

export default function RegisterAdminPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [newUploadUrl, setNewUploadUrl] = useState('')
  const [imageData, setImageData] = useState('')

  const router = useRouter()

  const handleValidation = () => {
    // input field validation
    if(firstName === '') return AlertError('First name cannot be empty')
    if(lastName === '') return AlertError('Last name cannot be empty')
    if(username === '') return AlertError('Username cannot be empty') 
    if(email === '') return AlertError('Email cannot be empty')
    if(phone === '') return AlertError('Phone number cannot be empty')
    if(password === '') return AlertError('Password cannot be empty')
    else if(password.length < 8) return AlertError('Password must be at least 8 characters long')
    else{return true}
  }
  
  const handleHolderImg = async (e: any) =>{

    const file = e.target.files[0];
    setImageData(file)
    const url = URL.createObjectURL(file)

    // set new url if we have selected a new image
    if(url){
      setNewUploadUrl(url)
    } 

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

        } catch (error: any) {

          if(error.response.data.message) return AlertError(error.response.data.message)
          console.log('Failed to create post', error)
          return AlertError('Failed to create post')
        }
      }
    }

  }


  return (
    <section className='container flex flex-col items-center w-full h-fit'>

      <header className='w-full h-14 flex justify-center items-center mt-4'>
        <h1 className='text-3xl text-center flex-wrap text-primaryColor font-semibold'>REGISTER ADMINISTRATOR</h1>
      </header>

      <div className='bg-white rounded-md w-full xl:w-2/5 my-6 px-4 py-6'>

        <Form className='w-full'>

          {/* image upload display */}
          <header 
            className='w-full h-50 lg:h-fit mb-3 flex justify-center items-center'
          >

            <Image 
              src={(newUploadUrl) ? newUploadUrl : holder_img}  
              width={200}
              height={100}
              alt='This is a user placeholder image; format: png;'
              className='w-48 h-48 object-contain object-center relative'
            />

            <Form.Label 
              htmlFor='uploadImg' 
              className='text-2xl xl:text-4xl cursor-pointer absolute border text-gray-500 bg-white'
            >
              <BsPlusLg />

            </Form.Label>

          </header>

          <Form.Group className="mb-3 hidden" controlId="uploadImg">
                              
            <Form.Control 
              type='file'
              accept='image/*'
              onChange={(e) => {
                handleHolderImg(e)
              }}
              name='image'
            />
  
          </Form.Group>

          <div className='w-full mb-0 md:mb-4 flex flex-col md:flex-row justify-center'>  
          
            <Form.Group className="w-full md:w-1/2 md:mr-2" controlId="formBasicFirstName">

              <FloatingLabel label="First Name" className="mb-3 md:mb-0">
                <Form.Control 
                  type="text" 
                  placeholder="John" 
                  onChange={(e) => setFirstName(e.target.value)} 
                  required
                />
              </FloatingLabel>

            </Form.Group>

            <Form.Group className="w-full md:w-1/2" controlId="formBasicLastName">

              <FloatingLabel label="Last Name" className="mb-3 md:mb-0">
                <Form.Control 
                  type="text" 
                  placeholder="Bricks" 
                  onChange={(e) => setLastName(e.target.value)} 
                  required
                />
              </FloatingLabel>

            </Form.Group>

          </div>

          <Form.Group className="mb-3" controlId="formBasicEmail">

            <FloatingLabel label="Email address">
              <Form.Control 
                type="email" 
                placeholder="name@example.com" 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </FloatingLabel>

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">

            <FloatingLabel label="Phone Number">
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
          
          <div className='w-full mb-3 flex flex-col md:flex-row justify-center'>

            <Form.Group className="w-full md:w-1/2 md:mr-2" controlId="formBasicUsername">

              <FloatingLabel label="Username" className="mb-3">
                <Form.Control 
                  type="text"  
                  placeholder="" 
                  onChange={(e) => setUsername(e.target.value)} 
                  required
                />
              </FloatingLabel>

            </Form.Group>

            <Form.Group className="w-full md:w-1/2" controlId="formBasicPassword">

              <FloatingLabel label="Password">
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  onChange={(e) => setPassword(e.target.value)} 
                  minLength={8}
                  required
                />
              </FloatingLabel>

            </Form.Group>

          </div>

        <Form.Group className='flex justify-center'>
          <Button 
            variant="primary" 
            type="submit"  
            className='mx-auto w-full xl:w-3/5'
            onClick={e => handleSave(e)}
          >
            Submit
          </Button>
        </Form.Group>

        </Form>

        <div className='w-full xl:w-3/5 flex justify-center mx-auto'>
          <hr />
          <span >or</span>
          <hr />
        </div>

        <div className='flex justify-center px-8 py-2 rounded-md w-full xl:w-3/5 mx-auto border hover:bg-slate-50'>
          <button type="button" onClick={() => signIn('google', {  callbackUrl: '/dashboard'})} className='flex items-center hover:underline'>
            <Image 
              src={GoogleLogo}
              className='w-6 h-6 object-cover mr-2'
              alt='alternative signin with google'
            />
            <span>Login with Google</span>
          </button>
        </div>

        <div className='w-full flex xl:flex-row xl:justify-center xl:items-start justify-center items-center flex-col mt-2 px-8'>
          <p className='mr-1'>Already have an account?</p>
          <a href='/login' className='hover:underline'>
            Login
          </a>
        </div>
        
      </div>
        
    </section>
  )
}
