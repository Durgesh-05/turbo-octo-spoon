import { initPrisma } from '../utils/prisma-utils';
import { ApiResponse } from '../utils/apiResponse';
import { sign } from 'hono/jwt';
import { setCookie } from 'hono/cookie';
import { ApiError } from '../utils/apiError';
import { Context } from 'hono';
import { siginInput, signupInput } from '@dragon_18/medium-common';

const generateAccessToken = async (
  id: string,
  name: string,
  email: string,
  c: Context
): Promise<string> => {
  return await sign({ id, email, name }, c.env.JWT_SECRET);
};

export const userSignup = async (c: Context): Promise<Response> => {
  try {
    const prisma = await initPrisma(c);
    const body = await c.req.json();
    const { success, error } = signupInput.safeParse(body);
    if (!success) {
      return c.json(new ApiResponse(error, 'Invalid Input', 400), 400);
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return c.json(new ApiResponse(null, 'User already exists', 409), 409);
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
      ),
      201
    );
  } catch (e) {
    console.error('Failed to Signup User ', e);
    return c.json(new ApiError('Internal Server Error', 500), 500);
  }
};

export const userSignin = async (c: Context): Promise<Response> => {
  const prisma = await initPrisma(c);
  try {
    const body = await c.req.json();
    const { success, error } = siginInput.safeParse(body);
    if (!success) {
      return c.json(new ApiResponse(error, 'Invalid Input', 400), 400);
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return c.json(new ApiResponse(null, 'User not found', 404), 404);
    }

    const isPasswordValid = user.password === body.password;
    if (!isPasswordValid) {
      return c.json(new ApiResponse(null, 'Invalid password', 401), 401);
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
      ),
      200
    );
  } catch (e) {
    console.error('Failed to Signin User ', e);
    return c.json(new ApiError('Internal Server Error', 500), 500);
  }
};
