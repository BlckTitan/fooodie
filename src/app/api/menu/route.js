import { Menu } from '../../models/Menu';
import { revalidatePath } from 'next/cache';

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
            // fetch Menu data if there is a url param url param(Menu id)
            data = await Menu.findOne({_id: id})
            if (!data) {
                return Response.json(
                  { message: 'Menu not found' },
                  { status: 404 }
                );
            }
    
            return Response.json(data, {status: 200})
        }else{

            data = await Menu.find().sort({'createdAt': -1})
            
            // total items sent from the db
            const totalItems = data.length

            // Slice the dataset to return only the data for the requested page
            data = data.slice(startIndex, endIndex);

            return Response.json({data, totalItems}, {status: 200})
        }

    } catch (error) {

        console.error('Error fetching Menu data:', error);

        return Response.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        )
    }
    
}

export async function POST(req){
  
    try {
        const body = await req.json()

        const existingMenu = await Menu.findOne({title: body.title})

        if(existingMenu){
            return Response.json(
                { message: 'Menu already exists'},
                { status: 401 }
            )
        }else{

            const createdMenu = await Menu.create(body)
    
            return Response.json(createdMenu)
        }

    } catch (error) {

        console.error('Error creating Menu data:', error);

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
        const existingMenu = await Menu.findByIdAndUpdate(
            id,
            {
                $set: {
                    'title': body.title,
                    'description': body.description,
                    'image.public_id': body.public_id,
                    'image.secure_url': body.secure_url,
                    'price': body.price,
                    'rating': body.rating,
                    
                }
            }, { new: true }
        )
        if (!existingMenu) {
            console.log('Menu not found');
            return Response.json(
                { message: 'Internal Server Error: Menu not found.', error: error.message },
                { status: 500 }
            )
        } else {
            revalidatePath('/Menu')
        }

        return Response.json(existingMenu, {status: 200}, {message: 'Menu updated successfully'})

    } catch (error) {
        
        console.log(error, error.message)

        return Response.json(
            { message: 'Internal Server Error: Could not update Menu.', error: error.message },
            { status: 500 }
        )
    }
            
}

export async function PATCH(req){

    const body = await req.json()

    const createdMenu = await Menu.put(body)

    return Response.json(createdMenu)
    
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

        // Find and delete the Menu by ID
        const deletedMenu = await Menu.deleteOne({_id: id});

        // If no Menu is found, return a 404 response
        if (!deletedMenu) {
            return new Response(JSON.stringify({message: 'Internal Server Error: Menu not found.' }, { error: "Menu not found" }), { status: 404 });
        }

        // Return the deleted Menu as a response
        return new Response(JSON.stringify(deletedMenu), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        // Catch and handle any unexpected errors
        return new Response(JSON.stringify({ error: "An error occurred", details: error.message }), { status: 500 });
    }
}
