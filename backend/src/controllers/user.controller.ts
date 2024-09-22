import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { ApiResponse } from '../utils/apiResponse';
import { sign } from 'hono/jwt';
import { setCookie } from 'hono/cookie';

const generateAccessToken = async (
  id: string,
  name: string,
  email: string,
  c: any
): Promise<string> => {
  return await sign({ id, email, name }, c.env.JWT_SECRET);
};

export const userSignup = async (c: any): Promise<Response> => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (existingUser) {
    return c.json(new ApiResponse(null, 'User already exists', 409));
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });

  return c.json(
    new ApiResponse(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      'User Registered Successfully',
      201
    )
  );
};

export const userSignin = async (c: any): Promise<Response> => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    return c.json(new ApiResponse(null, 'User not found', 404));
  }

  const isPasswordValid = user.password === body.password;
  if (!isPasswordValid) {
    return c.json(new ApiResponse(null, 'Invalid password', 401));
  }

  const accessToken = await generateAccessToken(
    user.id,
    user.name,
    user.email,
    c
  );
  setCookie(c, 'token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  return c.json(
    new ApiResponse(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        accessToken,
      },
      'User LoggedIn Successfully',
      200
    )
  );
};
