import React from 'react';
import profileAvatar from '../../../../public/img/Profile_avatar_placeholder.png'
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Avatar() {

  const session = useSession()
  const userData = session?.data?.user

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
        
    </div>
  )
}
