import {User} from '@/app/models/User';
import { revalidatePath } from 'next/cache';

// import '@/app/api/db/db'

export async function GET(req){

    // const body = await req.json()
    try {
        // extract the url parameter
        let data;
        const searchParams = new URL(req.url).searchParams;
        const id = searchParams.get('_id')

        if(id){
            // fetch user data if there is a url param url param(user id)
            data = await User.findOne({_id: id})
            if (!data) {
                return Response.json(
                  { message: 'User not found' },
                  { status: 404 }
                );
            }
    
            return Response.json(data, {status: 200})
        }else{
            // if there is no url param, fetch all user data
            data = await User.find()
            return Response.json(data, {status: 200})
        }

    } catch (error) {
        console.error('Error fetching user data:', error);
        return Response.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        )
    }
    
}

export async function POST(req){

  
    try {
        const body = await req.json()

        const createdUser = await User.create(body)
    
        return Response.json(createdUser)
    } catch (error) {
        console.error('Error creating user data:', error);
        return Response.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        )
    }
    
}

export async function PUT(req, res){

    const body = await req.json()
    const id = body?.id

    // let existingUser = await User.findByIdAndUpdate(id, body)

    // return Response.json(existingUser, {status: 200}, {message: 'User updated successfully'})

    try {
        const existingUser = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    'email': body.email,
                    'firstName': body.firstName,
                    'lastName': body.lastName,
                    'username': body.username,
                    'phone': body.phone,
                    'address.country': body.country,
                    'address.city': body.city,
                    'address.street': body.street,
                    'address.state': body.state,
                    'address.region': body.region,
                }
            }, { new: true }
        )
        if (!existingUser) {
            console.log('User not found');
            return Response.json(
                { message: 'Internal Server Error: User not found.', error: error.message },
                { status: 500 }
            )
        } else {
            revalidatePath('/login')
        }

        return Response.json(existingUser, {status: 200}, {message: 'User updated successfully'})

    } catch (error) {
        console.log(error, error.message)
        return Response.json(
            { message: 'Internal Server Error: Could not update user.', error: error.message },
            { status: 500 }
        )
    }
            
}

export async function PATCH(req){

    const body = await req.json()

    const createdUser = await User.put(body)

    return Response.json(createdUser)
    
}

export async function DELETE(req) {

    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get('_id')
    
    try {

        // Validate the presence of 'id' in the body
        if (!id) {
            return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
        }

        // find existing user
        const existingUser = await User.findOne({_id: id})

        // If no user is found, return a 404 response
        if (!existingUser) {
            return new Response(JSON.stringify({message: 'Internal Server Error: User not found.' }, { error: "User not found" }), { status: 404 });
        }

        deletePhoto(existingUser.image.public_id)
        
        // Find and delete the user by ID
        const deletedUser = await User.deleteOne({_id: id});

        // If no user is found, return a 404 response
        if (!deletedUser) {
            return new Response(JSON.stringify({message: 'Internal Server Error: User not found.' }, { error: "Unable to delete user" }), { status: 500 });
        }

        // Return the deleted User as a response
        return new Response(JSON.stringify(deletedUser), { status: 200, headers: { "Content-Type": "application/json" } });
        
    } catch (error) {
        // Catch and handle any unexpected errors
        return new Response(JSON.stringify({ error: "An error occurred", details: error.message }), { status: 500 });
    }
}
