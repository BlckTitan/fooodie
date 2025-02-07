import { revalidatePath } from 'next/cache';
import { saveFilesToLocal, saveFilesToCloudinary, deletePhoto } from "@/app/api/upload/route";
import cloudinary from 'cloudinary'
import fs from 'fs/promises';
import delay from '@/lib/delay';
import { Admin } from '../../models/admin';

export async function GET(req){

    try {

        // extract the url parameter
        let data;
 
        const searchParams = new URL(req.url).searchParams;
        const id = searchParams.get('_id')
        const size = searchParams.get('size')
        const page = searchParams.get('page')
        
        // Calculate the starting index for the data slice
        const startIndex = (page - 1) * size;
        const endIndex = page * size;

        if(id){
            // fetch Admin data if there is a url param url param(Admin id)
            data = await Admin.findOne({_id: id})
            if (!data) {
                return Response.json(
                  { message: 'Admin not found' },
                  { status: 404 }
                );
            }
    
            return Response.json({data, resources}, {status: 200})
        }else{

            data = await Admin.find().sort({'createdAt': -1})
            
            // total items sent from the db
            const totalItems = data.length

            // Slice the dataset to return only the data for the requested page
            data = data.slice(startIndex, endIndex);

            return Response.json({data, totalItems}, {status: 200})
        }

    } catch (error) {

        console.error('Error fetching Admin data:', error);

        return Response.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        )
    }
}

export async function POST(req){

    const data = await req.formData()

    // extracting the file from formData
    const image = data.get('file');
    const firstName = data.get('firstName')
    const lastName = data.get('lastName')
    const username = data.get('username')
    const email = data.get('email')
    const password = data.get('password')
    const isAdmin = data.get('isAdmin')
    
    if (data) {
        try {
            const existingAdmin = await Menu.findOne({title: title})

            if(existingAdmin){
                return Response.json(
                    { message: 'Admin already exists'},
                    { status: 401 }
                )
            }else{
                //send a copy of the uploaded file to be saved in public/img dir
                const newUpload = await saveFilesToLocal(image)
                //save a copy of the uploaded file to cloudinary
                const adminPicture = await saveFilesToCloudinary(newUpload);

                let newAdmin;

                if(adminPicture){

                    newAdmin = await Admin.create(
                        {
                            firstName: firstName, 
                            lastName: lastName, 
                            username: username,
                            email: email,
                            phone: phone,
                            password: password,
                            isAdmin: isAdmin,
                            image:{
                                public_id: adminPicture[0].public_id,
                                secure_url: adminPicture[0].secure_url,
                            }
                        }
                    )
                    
                }
                //delete photos after upload to cloudinary
                newUpload.map(data => fs.unlink(data.filepath))
                //delay 2s to update cloudinary database
                await delay(2000)

                return Response.json(newAdmin)
            }
        } catch (error) {
            console.log(error)
            return Response.json({error: 'Failed to create administrator'}, {status: 500})
        }
    }
}

export async function PUT(req, res){

    const body = await req.json()
    const id = body?.id

    try {
        const existingAdmin = await Admin.findByIdAndUpdate(
            id,
            {
                $set: {
                    'firstName': body.firstName,
                    'lastName': body.lastName,
                    'image.public_id': body.public_id,
                    'image.secure_url': body.secure_url,
                    'username': body.username,
                    'email': body.email,
                    'phone': body.phone,
                    'isAdmin': body.isAdmin
                    
                }
            }, { new: true }
        )
        if (!existingAdmin) {
            console.log('Admin not found');
            return Response.json(
                { message: 'Internal Server Error: Admin not found.', error: error.message },
                { status: 500 }
            )
        } else {
            revalidatePath('/Admin')
        }

        return Response.json(existingAdmin, {status: 200}, {message: 'Admin updated successfully'})

    } catch (error) {
        
        console.log(error, error.message)

        return Response.json(
            { message: 'Internal Server Error: Could not update Admin.', error: error.message },
            { status: 500 }
        )
    }
            
}

export async function PATCH(req){

    const body = await req.json()

    const createdAdmin = await Admin.put(body)

    return Response.json(createdAdmin)
    
}

export async function DELETE(req) {

    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get('_id')
    
    try {
        // Parse the request body

        // Validate the presence of 'id' in the body
        if (!id) {
            return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
        }

        // find existing admin
        const existingAdmin = await Admin.findOne({_id: id})
        deletePhoto(existingAdmin.image.public_id)
        
        // Find and delete the admin by ID
        const deletedAdmin = await Admin.deleteOne({_id: id});

        // If no Admin is found, return a 404 response
        if (!deletedAdmin) {
            return new Response(JSON.stringify(
                {
                    message: 'Internal Server Error: Admin not found.' 
                },
                { 
                    error: "Admin not found" 
                }), { status: 404 }
            );
        }

        // Return the deleted Admin as a response
        return new Response(JSON.stringify(deletedAdmin), { status: 200, headers: { "Content-Type": "application/json" } });
        
    } catch (error) {
        // Catch and handle any unexpected errors
        return new Response(JSON.stringify({ error: "An error occurred", details: error.message }), { status: 500 });
    }
}
