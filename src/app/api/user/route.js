import {User} from '@/app/models/User';
// import '@/app/api/db/db'

export async function GET(req, res){

    const body = await req.json()
    let data = '';

    if(req.body){
        data = await User.findOne({body: body?.email})
    }else{
        data = await User.find()
    }

    return Response.json(data)
    
}

export async function POST(req){

    const body = await req.json()

    const createdUser = await User.create(body)

    return Response.json(createdUser)
    
}

export async function PUT(req){

    const body = await req.json()

    // const existingUser = await User.findOne({email: body?.email})

    const updatedUser = await User.updateOne({email: body?.email}, body)

    return Response.json(updatedUser)
    
}

export async function PATCH(req){

    const body = await req.json()

    const createdUser = await User.put(body)

    return Response.json(createdUser)
    
}