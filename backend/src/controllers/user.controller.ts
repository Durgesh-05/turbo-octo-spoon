import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';

export const userSignup = async (c: Context): Promise<Response> => {
  const { user } = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  return c.json({ message: 'Signup route' });
};

export const userSignin = async (c: Context): Promise<Response> => {
  return c.json({ message: 'Signin route' });
};
