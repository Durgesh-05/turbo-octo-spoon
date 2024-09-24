import { CiSearch } from 'react-icons/ci';
import { IoCreateOutline } from 'react-icons/io5';

import { Avatar } from './BlogCard';

export const AppBar = () => {
  return (
    <div className='flex items-center justify-between py-1 px-4 bg-white shadow-md w-full'>
      <div className='flex items-center gap-4'>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQowM3PIgYobhX2HUBt4o4ce4s-zbrcMk7jBA&s'
          alt='Logo'
          className='h-16 w-full mr-3'
        />
        <div className='flex justify-center items-center bg-gray-50'>
          <CiSearch />
          <input
            type='text'
            placeholder='Search...'
            className=' rounded-lg p-2 focus:outline-none bg-gray-50'
          />
        </div>
      </div>

      <div className='flex items-center justify-center gap-4 mr-4'>
        <button className='flex items-center justify-center text-gray-400 mr-4 '>
          <IoCreateOutline className='mr-2 text-2xl' />
          <span>Write</span>
        </button>
        <Avatar name='DD' />
      </div>
    </div>
  );
};
