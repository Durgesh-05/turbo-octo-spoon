import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/health', (c) => {
  return c.json({ message: 'Server is healthy' });
});

app.post('/api/v1/signup', (c) => {
  const { user } = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  return c.json({ message: 'Signup route' });
});

app.post('/api/v1/signin', (c) => {
  return c.json({ message: 'Signin route' });
});

app.post('/api/v1/blog', (c) => {
  return c.json({ message: 'Blog Post Route' });
});

app.put('/api/v1/blog', (c) => {
  return c.json({ message: 'Blog Put Route' });
});

app.get('/api/v1/blog', (c) => {
  return c.json({ message: 'Blog Get Route' });
});

app.get('/api/v1/blog/:id', (c) => {
  return c.json({ message: 'Blog Id Get Route' });
});

export default app;
