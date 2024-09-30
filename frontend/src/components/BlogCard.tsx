import { useMemo } from 'react';
import { formattedTime } from '../api/utils';
import { FaBookmark, FaComments, FaHeart } from 'react-icons/fa';

interface BlogCardProps {
  name: string;
  title: string;
  description: string;
  createdAt: string;
  like: string[];
  comment: string[];
  bookmark: string[];
}

export const BlogCard = ({
  title,
  description,
  name,
  createdAt,
  like,
  comment,
  bookmark,
}: BlogCardProps) => {
  return (
    <div className='flex flex-col w-full gap-4 justify-between mt-6 mx-auto px-4 md:px-0 md:w-[55%] '>
      <div className='flex flex-col'>
        <div className='flex gap-2 items-center'>
          <Avatar name={name} />
          <p className='text-base md:text-lg font-normal text-gray-950'>
            {name}
          </p>
          <p className='text-sm font-normal text-gray-500'>
            {formattedTime(createdAt)}
          </p>
        </div>
        <div className='flex flex-col gap-y-4 mt-2'>
          <h3 className='text-xl md:text-2xl lg:text-4xl font-extrabold text-gray-950'>
            {title}
          </h3>
          <p className='text-sm md:text-base lg:text-lg text-gray-900 line-clamp-2 md:line-clamp-3 lg:line-clamp-4'>
            {description}
          </p>
        </div>

        <div className='flex gap-6 mt-4 justify-start'>
          <div className='cursor-pointer text-xl flex gap-2 justify-center items-center'>
            <FaBookmark className='text-gray-400'></FaBookmark>
            <span className='text-sm text-gray-400'>{bookmark.length}</span>
          </div>
          <div className='cursor-pointer text-xl flex gap-2 justify-center items-center'>
            <FaHeart className='text-gray-400'></FaHeart>
            <span className='text-sm text-gray-400'>{like.length}</span>
          </div>
          <div className='cursor-pointer text-xl flex gap-2 justify-center items-center'>
            <FaComments className='text-gray-400'></FaComments>
            <span className='text-sm text-gray-400'>{comment.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Avatar = ({ name }: { name: string }) => {
  const splitValue: string[] = name.split(' ');
  const finalValue: string = useMemo(() => {
    return splitValue
      .map((word: string) => word.charAt(0).toUpperCase())
      .join()
      .replace(',', '');
  }, [name, splitValue]);

  return (
    <div className=' inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-200'>
      <span className='font-medium text-gray-900 dark:text-gray-900 text-xs'>
        {finalValue}
      </span>
    </div>
  );
};
