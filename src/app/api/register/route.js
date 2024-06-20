import mongoose from "mongoose"
import {User} from '@/app/models/User';

export async function POST(req){

    const body = await req.json()

    mongoose.connect(process.env.DATABASE_URI)

    const createdUser = await User.create(body)

    return Response.json(createdUser)
}