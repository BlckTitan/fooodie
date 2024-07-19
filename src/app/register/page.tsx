'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import GoogleLogo from '../../../public/img/Google-logo.png'
import axios from 'axios';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')

  const handleSubmit = (e: any) =>{
    e.preventDefault()

    axios.post('/api/register', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  return (
    <section className='container flex flex-col items-center w-full h-[100vh]'>

      <header className='w-full h-24 flex justify-center items-center mt-4'>
        <h1 className='text-4xl text-center text-primaryColor font-semibold'>REGISTER</h1>
      </header>

      <div className='bg-white rounded-md w-full xl:w-2/5 my-8 px-4 py-8'>

        <Form className='w-full' onSubmit={e => handleSubmit(e)}>

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
        
        <Form.Group className='flex justify-center'>
          <Button variant="primary" type="submit"  className='mx-auto w-full xl:w-3/5'>
            Submit
          </Button>
        </Form.Group>

        </Form>

        <div className='w-full xl:w-3/5 flex justify-center mx-auto mt-2'>
          <hr />
          <span >or</span>
          <hr />
        </div>

        <div className='flex justify-center mt-2 px-8 py-2 rounded-md w-full xl:w-3/5 mx-auto border hover:bg-slate-50'>
          <button type="button" onClick={() => signIn('google', {  callbackUrl: '/dashboard'})} className='flex items-center hover:underline'>
            <Image 
              src={GoogleLogo}
              className='w-6 h-6 object-cover mr-2'
              alt='alternative signin with google'
            />
            <span>Login with Google</span>
          </button>
        </div>

        <div className='flex xl:flex-row xl:justify-center xl:items-start justify-center items-center flex-col mt-2 px-8 py-2 w-full'>
          <p className='mr-1'>Already have an account?</p>
          <a href='/login' className='hover:underline'>
            Login
          </a>
        </div>
        
      </div>
        
    </section>
  )
}
