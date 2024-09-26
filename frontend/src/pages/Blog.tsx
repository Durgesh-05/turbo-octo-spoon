import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../api/utils';
import { LoginDataProps } from '../api/auth';
import { AppBar } from '../components/AppBar';
import { BlogDetailSkeleton } from '../components/SkeletonLoader';
import {
  FaRegBookmark,
  FaBookmark,
  FaRegHeart,
  FaHeart,
  FaRegComments,
  FaComments,
} from 'react-icons/fa';
import { formattedTime } from '../api/utils';

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setBookmarked] = useState(false);
  const [isHearted, setHearted] = useState(false);
  const [isCommented, setCommented] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const user: LoginDataProps = JSON.parse(
          String(localStorage.getItem('user'))
        );
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });

        if (res.status === 200) {
          setBlog(res.data.data);
        } else {
          setError('Blog not found');
        }
      } catch (e) {
        console.error('Failed to fetch blog by ID: ', e);
        setError('Failed to fetch blog');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  return (
    <div className='flex flex-col items-center w-full px-4 md:px-0'>
      <AppBar />
      <div className='flex flex-col w-full md:w-[55%] mx-auto gap-4 mt-6'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-950'>
          {blog?.title}
        </h1>
        <div className='flex items-center gap-2 mb-4'>
          <p className='text-base md:text-lg font-semibold text-gray-950'>
            {blog?.author.name}
          </p>
          <p className='text-sm md:text-base font-normal text-gray-500'>
            {formattedTime(blog?.createdAt)}
          </p>
        </div>
        <p className='text-md md:text-lg lg:text-xl text-gray-900'>
          {blog?.description}
        </p>

        <div className='flex gap-6 mt-6 justify-start'>
          <div
            className='cursor-pointer text-xl'
            onClick={() => setBookmarked(!isBookmarked)}
          >
            {isBookmarked ? (
              <FaBookmark className='text-blue-400' />
            ) : (
              <FaRegBookmark className='text-gray-400 hover:text-blue-400' />
            )}
          </div>
          <div
            className='cursor-pointer text-xl'
            onClick={() => setHearted(!isHearted)}
          >
            {isHearted ? (
              <FaHeart className='text-red-500' />
            ) : (
              <FaRegHeart className='text-gray-400 hover:text-red-500' />
            )}
          </div>
          <div
            className='cursor-pointer text-xl'
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
    </div>
  );
};

export default Blog;
