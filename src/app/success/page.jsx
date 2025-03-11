import React from 'react'
import { BsPatchCheck } from 'react-icons/bs'

export default function Success() {
  return (
    <section 
      className='w-full h-full flex flex-col items-center justify-center rounded-md my-8'
    >
      <div
        className='bg-white w-full md:w-8/12 h-full md:h-96 flex flex-col items-center justify-center rounded-md my-8 p-4'
      >
        <h1 className='text-3xl font-bold text-green-500 text-center'>
          Success
        </h1>
        <span className='text-8xl font-bold text-green-500 text-center my-8'>
          <BsPatchCheck />
        </span>
        <p className='text-lg text-gray-500 text-center'>Registration successfull!</p>
        <a href="/register-admin">Go back</a>
      </div>
    </section>
  )
}
