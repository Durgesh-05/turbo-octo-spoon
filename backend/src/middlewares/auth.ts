import { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import { ApiResponse } from '../utils/apiResponse';
import { verify } from 'hono/jwt';
import { ApiError } from '../utils/apiError';

export const vaildateToken = async (c: Context, next: Next) => {
  try {
    const payload =
      c.req.header('authorization')?.split(' ')[1] || getCookie(c, 'token');
    if (!payload) {
      return c.json(new ApiResponse(null, 'Missing Authorization Header', 401));
    }

    const isTokenValid = await verify(payload, c.env.JWT_SECRET);
    if (!isTokenValid) {
      return c.json(new ApiResponse(null, 'Invalid token', 401));
    }
    c.set('user', payload);
    await next();
  } catch (e) {
    console.error('Failed to validate token', e);
    return c.json(new ApiError('Internal Server Error', 500));
  }
};
