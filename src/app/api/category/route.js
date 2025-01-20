import { Category } from '../../models/Category';
import { revalidatePath } from 'next/cache';

// import '@/app/api/db/db'

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
            // data = await Category.find().limit(size).sort({'createdAt': -1})

            data = await Category.find().sort({'createdAt': -1})
            
            // total items sent from the db
            const totalItems = data.length

            // Slice the dataset to return only the data for the requested page
            data = data.slice(startIndex, endIndex);

            return Response.json({data, totalItems}, {status: 200})
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

        const existingCategory = await Category.findOne({title: body.title})

        if(existingCategory){
            return Response.json(
                { message: 'Category already exists'},
                { status: 401 }
            )
        }else{

            const createdCategory = await Category.create(body)
    
            return Response.json(createdCategory)
        }

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

export async function DELETE(req) {

    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get('_id')
    
    try {
        // Parse the request body

        // Validate the presence of 'id' in the body
        if (!id) {
            return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
        }

        // Find and delete the category by ID
        const deletedCategory = await Category.deleteOne({_id: id});

        // If no category is found, return a 404 response
        if (!deletedCategory) {
            return new Response(JSON.stringify({message: 'Internal Server Error: Category not found.' }, { error: "Category not found" }), { status: 404 });
        }

        // Return the deleted category as a response
        return new Response(JSON.stringify(deletedCategory), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        // Catch and handle any unexpected errors
        return new Response(JSON.stringify({ error: "An error occurred", details: error.message }), { status: 500 });
    }
}
