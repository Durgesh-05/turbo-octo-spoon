import { BlogCard } from '../components/BlogCard';

export const Blog = () => {
  return (
    <div className='flex flex-col items-center w-full px-4 md:px-0 gap-4'>
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
};
