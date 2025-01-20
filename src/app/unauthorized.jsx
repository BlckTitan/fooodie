 
export default function Unauthorized() {
  return (
    <main className='w-full h-screen flex items-center justify-center'>
      <div className='text-center text-3xl text-gray-600'>
        <h2  className='font-bold'>401 - Unauthorized</h2>
        <p  className='my-2'>You need administrator privilege.</p>
      </div>
    </main>
  )
}