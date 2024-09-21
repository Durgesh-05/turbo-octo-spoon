import { Context } from 'hono';

export const getBlogs = async (c: Context): Promise<Response> => {
  return c.json({ message: 'Blog Get Route' });
};

export const addBlogs = async (c: Context): Promise<Response> => {
  return c.json({ message: 'Blog Post Route' });
};

export const updateBlogs = async (c: Context): Promise<Response> => {
  return c.json({ message: 'Blog Put Route' });
};

export const getBlogById = async (c: Context): Promise<Response> => {
  return c.json({ message: 'Blog Id Get Route' });
};
