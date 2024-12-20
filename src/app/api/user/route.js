import {User} from '@/app/models/User';
import { NextRequest, NextResponse } from 'next/server';

// import '@/app/api/db/db'

export async function GET(NextRequest, NextResponse){

    // const body = await req.json()
    let data = '';
    const searchParams = NextRequest.nextUrl.searchParams
    const id = searchParams.get('_id')

    if(id){
        data = await User.findOne({_id: id})
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