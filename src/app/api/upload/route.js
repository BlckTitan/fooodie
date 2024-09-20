'use server'
import fs from 'fs/promises';
import path from 'path';

export async function POST(req){

    const data = await req.formData()
    const file = data.get('file');
    const url = data.get('url')

    // console.log(file.size)

    if(data.get('file')){
        //send a copy of the uploaded file to be saved in public/img dir
        await saveFilesToLocal(file)
    }else{
        console.log('no file')
    }

    return Response.json(true)
    
}

//save files to local
const saveFilesToLocal = async (formData) =>{
    const file = formData
    // const url = formData.get('url')

    const bufferPromise = file.arrayBuffer()
      .then(data => {
        //creating a buffer file from the upload image
        const buffer = Buffer.from(data)

        //creating file upload path
        const uploadDir = path.join(process.cwd(), 'public/img', `/${file.name}`)
        // uploading file to directory
        fs.writeFile(uploadDir, buffer)
    })

  }