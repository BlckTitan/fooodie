'use client'
import React, { useEffect, useState } from 'react';
import profileAvatar from '../../../../public/img/Profile_avatar_placeholder.png'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Form } from 'react-bootstrap';
import { BsPlusLg } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { getPhotos } from '@/app/api/upload/route';
// import { redirect } from 'next/navigation';

export default function Avatar() {

  const [img, setImg] = useState('')
  const session = useSession()
  const userData = session?.data?.user
  const user_id = session?.data?.user?.id

  const getProfileAvatar = async () => {
    await axios.get(`/api/user?_id=${user_id}`)
    .then(function (response) {
      // handle success
      setImg(response.data.image.secure_url);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  }

  useEffect(() => {
    
    getProfileAvatar()

  }, [])

  //handle upload using api
  const handleUpload = async (formData) => {
    const file = formData.target.files
    
    //checking for file size and type(image files)
    if(file[0].size < 1024 * 1024 && file[0].type.startsWith('image/')){

      //creating a link for the upload file
      const url = URL.createObjectURL(file[0])

      const data = new FormData; 
      data.set('file', file[0])
      data.set('url', url)
      data.set('user_id', user_id)

      axios({
        method: 'post',
        url: '/api/upload/',
        data: data,
      });

      return toast.success('Profile photo successfully updated', {position: 'top-right', autoClose: 3000, toastId: 1});
    }else{
      return toast.error('Image file too large', {position: 'top-right', autoClose: 3000, toastId: 1});
    }
    
  }

  return (
    <div className='relative w-12 xl:w-24 h-12 xl:h-24 mb-4'>
      {/* if we have an existing profile avatar, display it. */}
      { img && 
       
        <Image 
            src={img} 
            alt='This is the user profile image; format: png;'
            className='w-full h-full rounded-full'
            objectFit='cover'
            layout='contain'
            width={100}
            height={100}
        />
      }
      
      {/* if there is no exiting profile avatar, display the default avatar */}
      { (userData && !userData?.image) && 

        <Image 
            src={profileAvatar} 
            alt='This is a user placeholder image; format: png;'
            className='w-full h-full rounded-full'
            objectFit='cover'
            layout='contain'
        />
      }
        <Form className='flex justify-between' action={handleUpload}>
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
                accept='image/*'
                // value={img}
                onChange={handleUpload}
                className='hidden'
                name='image'
              />
          </Form.Group>
        </Form>
         <div>

          </div>
    </div>
  )
}
