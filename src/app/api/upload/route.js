
export async function POST(req){

    const data = await req.formData()
    // const body = await req.json()

    if(data.get('files')){
        console.log('we have a file')
    }else{
        console.log('no file')
    }

    return Response.json(true)
    
}