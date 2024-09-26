import { Link, useNavigate } from 'react-router-dom';
import { AppBar } from '../components/AppBar';
import { BlogCard } from '../components/BlogCard';
import { useBlogs } from '../hooks';
import { BlogCardSkeleton } from '../components/SkeletonLoader';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authAtom } from '../store/atom';

export const Blogs = () => {
  const { isLoading, blogs } = useBlogs();
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authAtom);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!user.accessToken) {
        navigate('/signin');
      }
      setAuthState({
        user,
        isAuthenticated: true,
      });
    }
  }, []);

  return (
    <div className='flex flex-col items-center w-full px-4 md:px-0 gap-4'>
      <AppBar />
      {isLoading ? (
        <div className='flex flex-col w-full gap-4 justify-between mt-6'>
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      ) : (
        blogs.map((blog: any) => (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            <BlogCard
              name={blog.author.name}
              title={blog.title}
              description={blog.description}
              createdAt={blog.createdAt}
            />
          </Link>
        ))
      )}
    </div>
  );
};
