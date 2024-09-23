import { Hono } from 'hono';
import userRouter from './routes/auth.route';
import blogRouter from './routes/blog.route';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/health', (c) => {
  return c.json({ message: 'Server is healthy' });
});

export default app;
