import {User} from '@/app/models/User';
// import '@/app/api/db/db'

export async function POST(req){

    const body = await req.json()

    const createdUser = await User.create(body)

    return Response.json(createdUser)
    
}