import { Hono } from 'hono';
import { addBlogs, updateBlogs, getBlogs, getBlogById } from '../controllers';
import { vaildateToken } from '../middlewares/auth';

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.post('/', vaildateToken, addBlogs);
blogRouter.put('/:id', vaildateToken, updateBlogs);
blogRouter.get('/', vaildateToken, getBlogs);
blogRouter.get('/:id', vaildateToken, getBlogById);

export default blogRouter;
