import {Admin} from '@/app/models/admin';
// import '@/app/api/db/db'

export async function POST(req){

   try {
        const body = await req.json()

        const existingAdmin = await Admin.findOne({email: body.email})

        if(existingAdmin){
            return Response.json(
                { message: 'Administrator already exists'},
                { status: 401 }
            )
        }else{

            const createdAdmin = await Admin.create(body)
    
            return Response.json(createdAdmin, {status: 200})
        }

    } catch (error) {
        console.error('Error creating administrator data:', error);
        return Response.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        )
    }
    
    
}