import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { authAtom } from '../store/atom';
import { AppBar, BlogCardSkeleton, BlogCard } from '../components';

export const Blogs = ({ isLoading, blogs }: any) => {
  const [authState, setAuthState] = useRecoilState(authAtom);
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!user.accessToken) {
        setAuthState({
          user: null,
          isAuthenticated: false,
        });
      }
      setAuthState({
        user,
        isAuthenticated: true,
      });
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setFilteredBlogs(blogs);
    }
  }, [isLoading, blogs]);

  const filteredSearch = (searchString: string) => {
    if (searchString) {
      const filtered = blogs.filter((blog: any) =>
        blog.title.toLowerCase().includes(searchString.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  };

  return (
    <div className='flex flex-col items-center w-full px-4 md:px-0 gap-4'>
      <AppBar onSearch={filteredSearch} authState={authState} />
      {isLoading ? (
        <div className='flex flex-col w-full gap-4 justify-between mt-6'>
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      ) : (
        filteredBlogs.map((blog: any) => (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            <BlogCard
              like={blog.likes}
              comment={blog.comments}
              bookmark={blog.Bookmark}
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
