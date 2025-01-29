'use server'
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import os from 'node:os';
import { revalidatePath } from 'next/cache';
import { User } from '@/app/models/User';
import { ProfileAvatar } from '@/app/models/profileAvatar'
// import { userAgent } from 'next/server';
import cloudinary from 'cloudinary'
import cloudinaryConfig from '../../../lib/cloudinaryConfig'
import delay from '../../../lib/delay'
import reloadPage from '@/lib/reload';

// calling the cloudinary configuration
cloudinaryConfig;

// calling the delay timer


export async function POST(req){

    const data = await req.formData()

    // extracting the file from formData b 
    const file = data.get('file');

    // extracting url from formData
    const url = data.get('url')

    // extracting user_id from formData
    const user_id = data.get('user_id')

    if(data.get('file')){
        //send a copy of the uploaded file to be saved in public/img dir
        const newUpload = await saveFilesToLocal(file)

        //save a copy of the uploaded file to cloudinary
        const profileAvatar = await saveFilesToCloudinary(newUpload)

        // //save photo to mongoDB
        // const newProfileAvatar = profileAvatar.map(avatar => {
        //     const newAvatar = ProfileAvatar({public_id: avatar.public_id, secure_url: avatar.secure_url})
        //     newAvatar.save()

        //     return newAvatar
        // }) 

        if(user_id && profileAvatar)(
            updateProfilePhotoInMongoDB(user_id, profileAvatar)
        )
        else{
            return Response.json({message: 'Profile photo cannot be updated in the cloud!'})

        }

       
        //delete photos after upload to cloudinary
        newUpload.map(data => fs.unlink(data.filepath))

        //delay 2s to update cloudinary database
        await delay(2000)

        revalidatePath('/')

        return( 
            reloadPage(),
            Response.json({message: 'Upload successfull!'}, true)
        )

    }else{
        return Response.json({message: 'Upload failed, file too large!'})
    }
    
}

//save files to local
export const saveFilesToLocal = async (formData) =>{
    const file = formData
    // const url = formData.get('url')

    const bufferPromise = file.arrayBuffer()
      .then(data => {
        //creating a buffer file from the upload image
        const buffer = Buffer.from(data)

        //renaming the upload file
        const name = uuidv4()
        const ext = file.type.split('/')[1]

        //creating file upload path
        const uploadDir = path.join(process.cwd(), 'public/img', `/${name}.${ext}`)

        //upload to tempdir
        const tempDir = os.tmpdir()
        const uploadToTempDir = path.join(tempDir, `/${name}.${ext}`)

        // uploading file to directory
        fs.writeFile(uploadDir, buffer)

        // uploading file to temp directory
        fs.writeFile(uploadToTempDir, buffer)

        return { filepath: uploadToTempDir, filename: file.name}
    })

    return await Promise.all([bufferPromise])
  }

//   upload photos to cloudinary
export const saveFilesToCloudinary = async (newUpload) =>{

    const file = newUpload;

    const bufferPromise = file.map(data => (
        cloudinary.v2.uploader.upload(data.filepath, { folder: 'fooodie_food_ordering_app'})
    ))
    
    revalidatePath('/')
    return await Promise.all(bufferPromise)
}

//get images from the cloud
export const getPhotos = async () => {
    try {
        const { resources } = await cloudinary.v2.search.expression(
            'folder: fooodie_food_ordering_app/*'
        ).sort_by('created_at', 'desc').max_results(1).execute()

        return resources
        
    } catch (error) {
        console.log(error.message)
    }
    
}

//delete images from cloud
export const deletePhoto = async (public_id, ProfileAvatar) => {
    try {
        if(ProfileAvatar){
            await Promise.all([
                ProfileAvatar.findOneAndDelete({public_id}),
                cloudinary.v2.uploader.destroy(public_id)
            ])
        }else{
            
        await Promise.all([
            cloudinary.v2.uploader.destroy(public_id)
        ])
        }
        return {message: 'deleted successfully'}
    } catch (error) {
        console.log(error.message)
    }
}


const updateProfilePhotoInMongoDB = async (user_id, profileAvatar) => {
    //save user profile photo to mongoDB

     try {
            const newAvatar = await User.findByIdAndUpdate(
                user_id,
                {
                    $set: {
                        'image.public_id': profileAvatar[0].public_id,
                        'image.secure_url': profileAvatar[0].secure_url
                    }
                }, { new: true }
            )
            if (!newAvatar) {
                console.log('User not found');
            } else {
                revalidatePath('/login')
            }

            return newAvatar

    } catch (error) {
        console.log(error, error.message)
    }
}