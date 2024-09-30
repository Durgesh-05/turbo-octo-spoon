import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  FaRegBookmark,
  FaBookmark,
  FaRegHeart,
  FaHeart,
  FaRegComments,
  FaComments,
} from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { LoginDataProps } from '../api/auth';
import { BACKEND_URL, formattedTime } from '../api/utils';
import { AppBar } from '../components/AppBar';
import { BlogDetailSkeleton } from '../components/SkeletonLoader';
import { authAtom } from '../store/atom';
import CommentSection from '../components/CommentCard';

interface IconButtonProps {
  icon: any;
  activeIcon: any;
  count: number;
  isActive: boolean;
  onClick: () => void;
}
const IconButton = ({
  icon,
  activeIcon,
  count,
  isActive,
  onClick,
}: IconButtonProps) => (
  <div
    className='cursor-pointer text-xl flex gap-2 justify-center items-center'
    onClick={onClick}
  >
    {isActive ? activeIcon : icon}
    <span className='text-sm text-gray-400'>{count}</span>
  </div>
);

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [bookmarks, setBookmarks] = useState<number>(0);
  const [comments, setComments] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [hasBookmarked, setHasBookmarked] = useState<boolean>(false);
  const authState = useRecoilValue(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`);
        if (res.status === 200) {
          setBlog(res.data.data);
          setLikes(res.data.data.likes.length);
          setBookmarks(res.data.data.Bookmark.length);
          setComments(res.data.data.comments.length);
          // Check if the user is authenticated to set like/bookmark state
          if (authState.isAuthenticated) {
            setHasLiked(
              res.data.data.likes.some(
                (like: any) => like.userId === authState.user?.id
              )
            );
            setHasBookmarked(
              res.data.data.Bookmark.some(
                (bookmark: any) => bookmark.userId === authState.user?.id
              )
            );
          }
        } else {
          setError('Blog not found');
        }
      } catch (e) {
        setError('Failed to fetch blog');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id, authState]);

  const handleAction = async (type: string, apiUrl: string) => {
    const user: LoginDataProps = JSON.parse(
      String(localStorage.getItem('user'))
    );
    if (!user) {
      return navigate('/signin');
    }
    try {
      await axios.post(
        apiUrl,
        {},
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      if (type === 'like') {
        setLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
        setHasLiked((prev) => !prev);
      }
      if (type === 'bookmark') {
        setBookmarks((prev) => (hasBookmarked ? prev - 1 : prev + 1));
        setHasBookmarked((prev) => !prev);
      }
      if (type === 'comment') setComments((prev) => prev + 1);
    } catch (e) {
      console.error(`Failed to ${type} blog`, e);
    }
  };

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  return (
    <div className='flex flex-col items-center w-full px-4 md:px-0'>
      <AppBar onSearch={() => {}} authState={authState} />
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
          <IconButton
            icon={
              <FaRegBookmark className='text-gray-400 hover:text-blue-400' />
            }
            activeIcon={<FaBookmark className='text-blue-400' />}
            count={bookmarks}
            isActive={hasBookmarked}
            onClick={() =>
              handleAction(
                'bookmark',
                `${BACKEND_URL}/api/v1/blog/${id}/bookmark`
              )
            }
          />
          <IconButton
            icon={<FaRegHeart className='text-gray-400 hover:text-red-500' />}
            activeIcon={<FaHeart className='text-red-500' />}
            count={likes}
            isActive={hasLiked}
            onClick={() =>
              handleAction('like', `${BACKEND_URL}/api/v1/blog/${id}/like`)
            }
          />
          <IconButton
            icon={<FaRegComments className='text-gray-400' />}
            activeIcon={<FaComments className='text-gray-800' />}
            count={comments}
            isActive={false}
            onClick={() =>
              handleAction(
                'comment',
                `${BACKEND_URL}/api/v1/blog/${id}/comment`
              )
            }
          />
        </div>

        {/* Comment Section */}
        <CommentSection blogId={id!} authState={authState} />
      </div>
    </div>
  );
};

export default Blog;
