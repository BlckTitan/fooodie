import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className='w-full h-screen flex items-center justify-center'>
      <div className='text-center text-3xl text-gray-600'>
        <h2  className='font-bold'>Not Found</h2>
        <p  className='my-2'>Could not find requested resource</p>
        <Link href="/"  className='text-blue-500'> Home</Link>
      </div>
    </main>
  )
}