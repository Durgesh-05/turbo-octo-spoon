import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCreateOutline } from 'react-icons/io5';
import { Avatar } from './BlogCard';
import { Link, useNavigate } from 'react-router-dom';
import { authAtom, AuthState } from '../store/atom';
import { ChangeEvent } from 'react';
import { Button } from './Button';
import { useSetRecoilState } from 'recoil';

interface AppBarProps {
  onSearch: (searchString: string) => void;
  authState: AuthState;
}

export const AppBar = ({ onSearch, authState }: AppBarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const setAuthState = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearch(value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className='flex items-center justify-between py-2 px-4 bg-white shadow-md w-full'>
      <div className='flex items-center gap-4'>
        <Link to='/'>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQowM3PIgYobhX2HUBt4o4ce4s-zbrcMk7jBA&s'
            alt='Logo'
            className='h-[40px] md:h-[50px] w-auto'
          />
        </Link>
        <div className='hidden md:flex items-center bg-gray-50 p-2 rounded-lg'>
          <CiSearch className='text-gray-400' />
          <input
            type='text'
            placeholder='Search...'
            className='ml-2 p-1 focus:outline-none bg-gray-50'
            onChange={searchHandler}
          />
        </div>
      </div>

      <div className='flex items-center gap-4 mt-2 md:mt-0'>
        {authState.isAuthenticated ? (
          <div className='relative'>
            <div className='flex items-center justify-center gap-4'>
              <Link className='flex items-center text-gray-400' to={'/create'}>
                <IoCreateOutline className='text-2xl' />
                <span className='hidden md:inline-block ml-2'>Write</span>
              </Link>
              <div onClick={toggleDropdown} className='cursor-pointer'>
                <Avatar name={String(authState.user?.name)} />
              </div>
            </div>

            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50'>
                <Link
                  to='/profile'
                  className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to={'/signin'}>
            <Button type='button' text='Login' className='w-full md:w-auto' />
          </Link>
        )}
      </div>
    </div>
  );
};
