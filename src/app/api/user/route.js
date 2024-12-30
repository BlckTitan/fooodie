import {User} from '@/app/models/User';

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

    const body = await req.json()

    const createdUser = await User.create(body)

    return Response.json(createdUser)
    
}

export async function PUT(req, res){

    const body = await req.json()
    const id = body?.id

    let existingUser = await User.findByIdAndUpdate(id, body)

    return Response.json(existingUser, {status: 200}, {message: 'User updated successfully'})
    
}

export async function PATCH(req){

    const body = await req.json()

    const createdUser = await User.put(body)

    return Response.json(createdUser)
    
}