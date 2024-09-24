import { Context } from 'hono';
import { ApiResponse } from '../utils/apiResponse';
import { ApiError } from '../utils/apiError';
import { initPrisma } from '../utils/prisma-utils';
import { createBlogInput, updateBlogInput } from '@dragon_18/medium-common';

export const getBlogs = async (c: Context): Promise<Response> => {
  try {
    const prisma = await initPrisma(c);
    const blogs = await prisma.post.findMany({
      include: {
        author: { select: { name: true } },
        likes: true,
        comments: true,
      },
    });

    return c.json(
      new ApiResponse(blogs, 'Blogs fetched successfully', 200),
      200
    );
  } catch (e) {
    console.error('Failed to fetch blogs:', e);
    return c.json(new ApiError('Internal Server Error', 500), 500);
  }
};

export const addBlogs = async (c: Context): Promise<Response> => {
  try {
    const prisma = await initPrisma(c);
    const body = await c.req.json();
    const { id } = c.get('user');
    const { success, error } = createBlogInput.safeParse(body);
    if (!success) {
      return c.json(new ApiResponse(error.errors, 'Invalid input', 400), 400);
    }

    const { title, description } = body;

    const createdBlog = await prisma.post.create({
      data: {
        title,
        description,
        authorId: id,
        published: true,
      },
    });

    return c.json(
      new ApiResponse(
        {
          id: createdBlog.id,
          title: createdBlog.title,
          description: createdBlog.description,
          authorId: createdBlog.authorId,
          createdAt: createdBlog.createdAt,
        },
        'Blog added successfully',
        201
      ),
      201
    );
  } catch (e) {
    console.error('Failed to add blog:', e);
    return c.json(new ApiError('Internal Server Error', 500), 500);
  }
};

export const updateBlogs = async (c: Context): Promise<Response> => {
  const id = c.req.param('id');

  try {
    const prisma = await initPrisma(c);
    const body = await c.req.json();
    const { id } = c.get('user');

    const { success, error } = updateBlogInput.safeParse(body);
    if (!success) {
      return c.json(new ApiResponse(error.errors, 'Invalid input', 400), 400);
    }

    const updatedBlog = await prisma.post.update({
      where: { id },
      data: {
        ...body,
        authorId: id,
      },
    });

    return c.json(
      new ApiResponse(
        {
          id: updatedBlog.id,
          title: updatedBlog.title,
          description: updatedBlog.description,
          updatedAt: updatedBlog.updatedAt,
        },
        'Blog updated successfully',
        200
      ),
      200
    );
  } catch (e) {
    console.error('Failed to update blog:', e);
    return c.json(new ApiError('Internal Server Error', 500), 500);
  }
};

export const getBlogById = async (c: Context): Promise<Response> => {
  const id = c.req.param('id');
  try {
    const prisma = await initPrisma(c);
    const blog = await prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { name: true } },
        likes: true,
        comments: true,
      },
    });

    if (!blog) {
      return c.json(new ApiResponse(null, 'Blog not found', 404), 404);
    }

    return c.json(new ApiResponse(blog, 'Blog fetched successfully', 200), 200);
  } catch (error) {
    console.error('Failed to fetch blog by ID:', error);
    return c.json(new ApiError('Internal Server Error', 500), 500);
  }
};
