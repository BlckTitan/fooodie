'use server'
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import os from 'node:os';
import cloudinary from 'cloudinary'
import { revalidatePath } from 'next/cache';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms))
}
export async function POST(req){

    const data = await req.formData()

    // extracting the file from formData
    const file = data.get('file');

    // extracting url from formData
    const url = data.get('url')

    if(data.get('file')){
        //send a copy of the uploaded file to be saved in public/img dir
        const newUpload = await saveFilesToLocal(file)

        //save a copy of the uploaded file to cloudinary
        await saveFilesToCloudinary(newUpload)

        //delete photos after upload to cloudinary
        newUpload.map(data => fs.unlink(data.filepath))

        //delay 2s to update cloudinary database
        await delay(2000)

        revalidatePath('/')
        return Response.json({message: 'Upload successfull!'})

    }else{
        return Response.json({message: 'Upload failed, file too large!'})
    }

    return Response.json(true)
    
}
//   npx update-browserslist-db@latest
//save files to local
const saveFilesToLocal = async (formData) =>{
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
const saveFilesToCloudinary = async (newUpload) =>{

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
