import { CiSearch } from 'react-icons/ci';
import { IoCreateOutline } from 'react-icons/io5';

import { Avatar } from './BlogCard';
import { Link } from 'react-router-dom';
import { AuthState } from '../store/atom';
import { ChangeEvent } from 'react';
import { Button } from './Button';

interface AppBarProps {
  onSearch: (searchString: string) => void;
  authState: AuthState;
}

export const AppBar = ({ onSearch, authState }: AppBarProps) => {
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearch(value);
  };
  return (
    <div className='flex items-center justify-between py-1 px-4 bg-white shadow-md w-full'>
      <div className='flex items-center gap-4'>
        <Link to='/'>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQowM3PIgYobhX2HUBt4o4ce4s-zbrcMk7jBA&s'
            alt='Logo'
            className='h-16 w-full mr-3'
          />
        </Link>
        <div className='flex justify-center items-center bg-gray-50'>
          <CiSearch />
          <input
            type='text'
            placeholder='Search...'
            className=' rounded-lg p-2 focus:outline-none bg-gray-50'
            onChange={searchHandler}
          />
        </div>
      </div>

      {authState.isAuthenticated ? (
        <div className='flex items-center justify-center gap-4 mr-4'>
          <Link
            className='flex items-center justify-center text-gray-400 mr-4 '
            to={'/create'}
          >
            <IoCreateOutline className='mr-2 text-2xl' />
            <span>Write</span>
          </Link>
          <Avatar name={String(authState.user?.name)} />
        </div>
      ) : (
        <Link to={'/signin'}>
          <Button type='button' text='Login' />
        </Link>
      )}
    </div>
  );
};
