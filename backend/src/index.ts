import { Hono } from 'hono';
import {
  addBlogs,
  getBlogById,
  getBlogs,
  updateBlogs,
  userSignin,
  userSignup,
} from './controllers';
import { vaildateToken } from './middlewares/auth';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/health', (c) => {
  return c.json({ message: 'Server is healthy' });
});

app.post('/api/v1/signup', userSignup);

app.post('/api/v1/signin', userSignin);

app.post('/api/v1/blog', vaildateToken, addBlogs);

app.put('/api/v1/blog', vaildateToken, updateBlogs);

app.get('/api/v1/blog', vaildateToken, getBlogs);

app.get('/api/v1/blog/:id', vaildateToken, getBlogById);

export default app;
