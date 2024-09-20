'use client'
import React, { useState } from 'react';
import profileAvatar from '../../../../public/img/Profile_avatar_placeholder.png'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Form } from 'react-bootstrap';
import { BsPlusLg } from 'react-icons/bs';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import { FiEdit, FiExternalLink } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Avatar() {

  const [img, setImg] = useState('')
  const session = useSession()
  const userData = session?.data?.user

  // const handleUpload = (e) =>{
  //   const files = e.target.files

  //   if(files.length > 0){
  //     const data = new FormData;
  //     data.set('files', files[0])

  //     axios({
  //       method: 'post',
  //       url: '/api/upload/',
  //       data: data,
  //       // headers: {'Content-Type': 'multipart/form-data'} 
  //     });
  //   }
  // }

  

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

      axios({
        method: 'post',
        url: '/api/upload/',
        data: data,
        // headers: {'Content-Type': 'multipart/form-data'} 
      });

      // return file 
      // setImg(file[0])

      return toast.success('Profile photo successfully updated', {position: 'top-right', autoClose: 3000, toastId: 1});
    }else{
      return toast.error('Image file too large', {position: 'top-right', autoClose: 3000, toastId: 1});
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
            

          {/* <CldUploadWidget uploadPreset="fooodie_food_ordering_app"> */}
          {/* <CldUploadWidget signatureEndpoint='/api/sign-image'>
            {({ open }) => {
              return (
                <button 
                  className='text-xl xl:text-2xl cursor-pointer absolute border text-gray-500 -right-2.5 xl:-right-0.5 -bottom-1.5 bg-white rounded-full'
                  onClick={() => open()}>
                  <BsPlusLg />
                </button>
              );
            }}
          </CldUploadWidget> */}

          </div>
    </div>
  )
}

// const { resources: sneakers } = await cloudinary.api.resources_by_tag('nextjs-server-actions-upload-sneakers', { context: true });

//     // 'use server'

//     const file = formData.get('image');
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     await new Promise((resolve, reject) => {

//       cloudinary.uploader.upload_stream({
//         tags: ['nextjs-server-actions-upload-sneakers'],
//         upload_preset: 'fooodie_food_ordering_app'
//       }, function (error, result) {

//         if (error) {
//           reject(error);
//           return;
//         }

//         resolve(result);

//       })
//       .end(buffer);
//     });

//     revalidatePath('/')
