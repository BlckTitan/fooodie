'use client'
import React, { useState } from 'react';
import profileAvatar from '../../../../public/img/Profile_avatar_placeholder.png'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Form } from 'react-bootstrap';
import { BsPlusLg } from 'react-icons/bs';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';

export default function Avatar() {

  const [img, setImg] = useState('')
  const session = useSession()
  const userData = session?.data?.user

  const handleUpload = (e) =>{
    const files = e.target.files

    if(files.length > 0){
      const data = new FormData;
      data.set('files', files[0])

      axios({
        method: 'post',
        url: '/api/upload/',
        data: data,
        // headers: {'Content-Type': 'multipart/form-data'} 
      });
    }
  }

  return (
    <div className='relative w-12 xl:w-24 h-12 xl:h-24 mb-4'>
      { (userData && userData?.image) && 

        <Image 
            src={userData?.image} 
            alt='This is the user profile image; format: png;'
            className='w-full h-full rounded-full'
            objectFit='cover'
            layout='contain'
            width={100}
            height={100}
        />
      }

      { (userData && !userData?.image) && 

        <Image 
            src={profileAvatar} 
            alt='This is a user placeholder image; format: png;'
            className='w-full h-full rounded-full'
            objectFit='cover'
            layout='contain'
        />
      }
        {/* <Form className='flex justify-between'>
          <Form.Group className="mb-3" controlId="formBasicText">

              <Form.Label 
                htmlFor='uploadAvatar' 
                className='text-xl xl:text-2xl cursor-pointer absolute border text-gray-500 -right-2.5 xl:-right-0.5 -bottom-1.5 bg-white rounded-full'
              >
                <BsPlusLg />
              </Form.Label>

              <Form.Control 
                id='uploadAvatar'
                type='file'
                // value={img}
                onChange={handleUpload}
                className='hidden'
              />
          </Form.Group>
        </Form> */}
         <div>
            

            {/* <CldUploadWidget uploadPreset="fooodie_food_ordering_app"> */}
            <CldUploadWidget signatureEndpoint='/api/sign-image'>
              {({ open }) => {
                return (
                  <button 
                   className='text-xl xl:text-2xl cursor-pointer absolute border text-gray-500 -right-2.5 xl:-right-0.5 -bottom-1.5 bg-white rounded-full'
                    onClick={() => open()}>
                    <BsPlusLg />
                  </button>
                );
              }}
            </CldUploadWidget>

          </div>
    </div>
  )
}
