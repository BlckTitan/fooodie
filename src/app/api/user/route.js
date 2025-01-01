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