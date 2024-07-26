import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
    <div className='container w-full h-screen flex justify-center items-center'>
        <Spinner animation="border" size='xl' variant='primary'/>;
    </div>
  )
}

export default LoadingSpinner;