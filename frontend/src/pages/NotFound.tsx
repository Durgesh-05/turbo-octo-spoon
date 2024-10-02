import { Link } from 'react-router-dom';
import { FaFrown } from 'react-icons/fa';

export const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <FaFrown className='text-9xl text-gray-500' />
      <h1 className='text-5xl font-bold text-gray-800 mt-8'>404</h1>
      <p className='text-2xl text-gray-600 mt-4'>Oops! Page not found.</p>
      <Link
        to='/'
        className='mt-6 px-6 py-2 bg-gray-950 text-white rounded-md hover:bg-gray-900'
      >
        Go to Homepage
      </Link>
    </div>
  );
};
