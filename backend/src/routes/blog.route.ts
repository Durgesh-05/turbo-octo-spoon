import { Hono } from 'hono';
import { addBlogs, updateBlogs, getBlogs, getBlogById } from '../controllers';
import { vaildateToken } from '../middlewares/auth';
import {
  bookmarkPost,
  commentOnPost,
  getCommentsForPost,
  likePost,
  removeBookmark,
} from '../controllers/blogs.controller';

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.post('/', vaildateToken, addBlogs);
blogRouter.put('/:id', vaildateToken, updateBlogs);
blogRouter.get('/', getBlogs);
blogRouter.get('/:id', vaildateToken, getBlogById);
blogRouter.post('/:id/like', vaildateToken, likePost);
blogRouter.post('/:id/comment', vaildateToken, commentOnPost);
blogRouter.get('/:id/comment', getCommentsForPost);
blogRouter.post('/:id/bookmark', vaildateToken, bookmarkPost);
blogRouter.delete('/:id/bookmark', vaildateToken, removeBookmark);

export default blogRouter;
