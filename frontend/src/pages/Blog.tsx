import { Link } from 'react-router-dom';
import { AppBar } from '../components/AppBar';
import { BlogCard } from '../components/BlogCard';
import { useBlogs } from '../hooks';

export const Blog = () => {
  const { isLoading, blogs } = useBlogs();
  console.log(isLoading);
  console.log(blogs);

  if (isLoading) {
    return <div>Loading .....</div>;
  }

  return (
    <div className='flex flex-col items-center w-full px-4 md:px-0 gap-4'>
      <AppBar />
      {blogs.map((blog: any) => (
        <Link to={`/blog/${blog.id}`} key={blog.id}>
          <BlogCard
            name={blog.author.name}
            title={blog.title}
            description={blog.description}
            createdAt={blog.createdAt}
          />
        </Link>
      ))}
    </div>
  );
};
