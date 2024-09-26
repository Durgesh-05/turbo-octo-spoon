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
import { useRecoilValue } from 'recoil';
import { authAtom } from '../store/atom';

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const authState = useRecoilValue(authAtom);

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

  const handleBookmark = async () => {
    const user: LoginDataProps = JSON.parse(
      String(localStorage.getItem('user'))
    );
    if (!user) return;

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog/${id}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (res.status === 200) {
        console.log('Bookmarked');
      }
    } catch (e) {
      console.error('Failed to bookmark blog', e);
    }
  };

  const handleLike = async () => {
    const user: LoginDataProps = JSON.parse(
      String(localStorage.getItem('user'))
    );
    if (!user) return;

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (res.status === 200) {
        console.log('Liked');
      }
    } catch (e) {
      console.error('Failed to like blog', e);
    }
  };

  const handleComment = async () => {
    const user: LoginDataProps = JSON.parse(
      String(localStorage.getItem('user'))
    );
    if (!user) return;

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog/${id}/comment`,
        { content: 'Great post!' },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (res.status === 201) {
        console.log('Commented');
      }
    } catch (e) {
      console.error('Failed to comment on blog', e);
    }
  };

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  const handleSearch = (searchString: string) => {
    console.log(searchString);
  };

  return (
    <div className='flex flex-col items-center w-full px-4 md:px-0'>
      <AppBar onSearch={() => handleSearch('Test')} />
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
          <div className='cursor-pointer text-xl' onClick={handleBookmark}>
            {blog.Bookmark.some(
              (props: any) => props.userId === authState.user?.id
            ) ? (
              <div className='cursor-pointer text-xl flex gap-2 justify-center items-center'>
                <FaBookmark className='text-blue-400'></FaBookmark>
                <span className='text-sm text-gray-400'>
                  {blog.Bookmark.length}
                </span>
              </div>
            ) : (
              <div className='cursor-pointer text-xl flex gap-2 justify-center items-center'>
                <FaRegBookmark className='text-gray-400 hover:text-blue-400'></FaRegBookmark>
                <span className='text-sm text-gray-400'>
                  {blog.Bookmark.length}
                </span>
              </div>
            )}
          </div>
          <div className='cursor-pointer text-xl' onClick={handleLike}>
            {blog.likes.some(
              (props: any) => props.userId === authState.user?.id
            ) ? (
              <div className='cursor-pointer text-xl flex gap-2 justify-center items-center'>
                <FaHeart className='text-red-500'></FaHeart>
                <span className='text-sm text-gray-400'>
                  {blog.likes.length}
                </span>
              </div>
            ) : (
              <div className='cursor-pointer text-xl flex gap-2 justify-center items-center'>
                <FaRegHeart className='text-gray-400 hover:text-red-500'></FaRegHeart>
                <span className='text-sm text-gray-400'>
                  {blog.likes.length}
                </span>
              </div>
            )}
          </div>
          <div className='cursor-pointer text-xl' onClick={handleComment}>
            {blog.comments.some(
              (props: any) => props.userId === authState.user?.id
            ) ? (
              <div className='cursor-pointer text-xl flex gap-2 justify-center items-center'>
                <FaComments className='text-gray-800'></FaComments>
                <span className='text-sm text-gray-400'>
                  {blog.comments.length}
                </span>
              </div>
            ) : (
              <div className='cursor-pointer text-xl flex gap-2 justify-center items-center'>
                <FaRegComments className='text-gray-400'></FaRegComments>
                <span className='text-sm text-gray-400'>
                  {blog.comments.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
