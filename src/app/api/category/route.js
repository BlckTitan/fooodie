import { Category } from '../../models/Category';
import { revalidatePath } from 'next/cache';

// import '@/app/api/db/db'

export async function GET(req){

    try {
        // extract the url parameter
        let data;
        const searchParams = new URL(req.url).searchParams;
        const id = searchParams.get('_id')

        if(id){
            // fetch Category data if there is a url param url param(category id)
            data = await Category.findOne({_id: id})
            if (!data) {
                return Response.json(
                  { message: 'Category not found' },
                  { status: 404 }
                );
            }
    
            return Response.json(data, {status: 200})
        }else{
            // if there is no url param, fetch all Category data
            data = await Category.find()
            return Response.json(data, {status: 200})
        }

    } catch (error) {
        console.error('Error fetching Category data:', error);
        return Response.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        )
    }
    
}

export async function POST(req){

  
    try {
        const body = await req.json()

        const createdCategory = await Category.create(body)
    
        return Response.json(createdCategory)
    } catch (error) {
        console.error('Error creating category data:', error);
        return Response.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        )
    }
    
}

export async function PUT(req, res){

    const body = await req.json()
    const id = body?.id

    try {
        const existingCategory = await Category.findByIdAndUpdate(
            id,
            {
                $set: {
                    'title': body.title,
                    'description': body.description,
                    
                }
            }, { new: true }
        )
        if (!existingCategory) {
            console.log('Category not found');
            return Response.json(
                { message: 'Internal Server Error: Category not found.', error: error.message },
                { status: 500 }
            )
        } else {
            revalidatePath('/category')
        }

        return Response.json(existingCategory, {status: 200}, {message: 'Category updated successfully'})

    } catch (error) {
        console.log(error, error.message)
        return Response.json(
            { message: 'Internal Server Error: Could not update category.', error: error.message },
            { status: 500 }
        )
    }
            
}

export async function PATCH(req){

    const body = await req.json()

    const createdCategory = await Category.put(body)

    return Response.json(createdCategory)
    
}