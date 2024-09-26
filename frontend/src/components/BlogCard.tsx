import {
  FaRegBookmark,
  FaBookmark,
  FaRegHeart,
  FaHeart,
  FaRegComments,
  FaComments,
} from 'react-icons/fa';
import { useMemo, useState } from 'react';
import { formattedTime } from '../api/utils';

interface BlogCardProps {
  name: string;
  title: string;
  description: string;
  createdAt: string;
}
export const BlogCard = ({
  title,
  description,
  name,
  createdAt,
}: BlogCardProps) => {
  const [isBookmarked, setBookmarked] = useState(false);
  const [isHearted, setHearted] = useState(false);
  const [isCommented, setCommented] = useState(false);

  return (
    <div className='flex flex-col w-full gap-4 justify-between mt-6 mx-auto px-4 md:px-0 md:w-[55%] '>
      <div className='flex flex-row w-full gap-4'>
        <div className='flex-1'>
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
            <div
              className='cursor-pointer text-xl '
              onClick={() => setBookmarked(!isBookmarked)}
            >
              {isBookmarked ? (
                <FaBookmark className='text-blue-400 ' />
              ) : (
                <FaRegBookmark className='text-gray-400 hover:text-blue-400' />
              )}
            </div>
            <div
              className='cursor-pointer text-xl '
              onClick={() => setHearted(!isHearted)}
            >
              {isHearted ? (
                <FaHeart className='text-red-500' />
              ) : (
                <FaRegHeart className='text-gray-400 hover:text-red-500' />
              )}
            </div>
            <div
              className='cursor-pointer text-xl '
              onClick={() => setCommented(!isCommented)}
            >
              {isCommented ? (
                <FaComments className='text-gray-800' />
              ) : (
                <FaRegComments className='text-gray-400' />
              )}
            </div>
          </div>
        </div>
        <div className='w-32 md:w-40 lg:w-48'>
          <img
            src='https://miro.medium.com/v2/resize:fit:786/format:webp/1*IPn6YG_9vnMs3vktlz1x5A.png'
            alt='image'
            className='w-full h-32 md:h-40 lg:h-48 object-cover'
          />
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
