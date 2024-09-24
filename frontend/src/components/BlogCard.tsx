import {
  FaRegBookmark,
  FaBookmark,
  FaRegHeart,
  FaHeart,
  FaRegComments,
  FaComments,
} from 'react-icons/fa';
import { useState } from 'react';

export const BlogCard = () => {
  const [isBookmarked, setBookmarked] = useState(false);
  const [isHearted, setHearted] = useState(false);
  const [isCommented, setCommented] = useState(false);

  return (
    <div className='flex flex-col w-full gap-4 justify-between mt-6 mx-auto px-4 md:px-0 md:w-4/5 lg:w-2/3'>
      <div className='flex flex-row w-full gap-4'>
        <div className='flex-1'>
          <div className='flex gap-2 items-center'>
            <p className='text-base md:text-lg font-normal text-gray-950'>
              Durgesh Dubey
            </p>
            <p className='text-sm font-normal text-gray-500'>Time</p>
          </div>
          <div className='flex flex-col gap-y-4 mt-2'>
            <h3 className='text-xl md:text-2xl lg:text-3xl font-bold'>
              Heading of the Title
            </h3>
            <p className='text-sm md:text-base lg:text-lg text-gray-900 line-clamp-2 md:line-clamp-3 lg:line-clamp-4'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos
              consequatur neque hic accusantium asperiores molestiae, mollitia
              laudantium odit nam, vitae ipsam distinctio, quasi officia!
              Eveniet minus unde repudiandae consequatur soluta!
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
