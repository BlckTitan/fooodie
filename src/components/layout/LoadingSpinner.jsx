import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
    <div className='w-full h-screen flex justify-center items-centers'>
        <Spinner animation="border" size='lg' variant='primary'/>;
    </div>
  )
}

export default LoadingSpinner;