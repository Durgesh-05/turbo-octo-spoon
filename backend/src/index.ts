import { Hono } from 'hono';
import {
  addBlogs,
  getBlogById,
  getBlogs,
  updateBlogs,
  userSignin,
  userSignup,
} from './controllers';

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

app.post('/api/v1/blog', addBlogs);

app.put('/api/v1/blog', updateBlogs);

app.get('/api/v1/blog', getBlogs);

app.get('/api/v1/blog/:id', getBlogById);

export default app;
