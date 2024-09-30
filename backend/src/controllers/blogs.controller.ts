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
        Bookmark: true,
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
        Bookmark: true,
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

export const likePost = async (c: Context): Promise<Response> => {
  const postId = c.req.param('id');
  const { id: userId } = c.get('user');

  try {
    const prisma = await initPrisma(c);
    const existingLike = await prisma.like.findFirst({
      where: { postId, userId },
    });

    if (existingLike) {
      return c.json(new ApiResponse(null, 'Post already liked', 400), 400);
    }

    const like = await prisma.like.create({
      data: { postId, userId },
    });

    return c.json(new ApiResponse(like, 'Post liked successfully', 201), 201);
  } catch (error) {
    console.error('Failed to like post:', error);
    return c.json(new ApiError('Internal Server Error', 500), 500);
  }
};

export const commentOnPost = async (c: Context): Promise<Response> => {
  const postId = c.req.param('id');
  const { id: userId } = c.get('user');
  const body = await c.req.json();

  try {
    const prisma = await initPrisma(c);
    const { content } = body;

    if (!content) {
      return c.json(new ApiResponse(null, 'Comment cannot be empty', 400), 400);
    }

    const comment = await prisma.comment.create({
      data: {
        postId,
        userId,
        content,
      },
    });

    return c.json(
      new ApiResponse(comment, 'Comment added successfully', 201),
      201
    );
  } catch (error) {
    console.error('Failed to add comment:', error);
    return c.json(new ApiError('Internal Server Error', 500), 500);
  }
};

export const bookmarkPost = async (c: Context): Promise<Response> => {
  const postId = c.req.param('id');
  const { id: userId } = c.get('user');

  try {
    const prisma = await initPrisma(c);
    const existingBookmark = await prisma.bookmark.findFirst({
      where: { postId, userId },
    });

    if (existingBookmark) {
      return c.json(new ApiResponse(null, 'Post already bookmarked', 400), 400);
    }

    const bookmark = await prisma.bookmark.create({
      data: { postId, userId },
    });

    return c.json(
      new ApiResponse(bookmark, 'Post bookmarked successfully', 201),
      201
    );
  } catch (error) {
    console.error('Failed to bookmark post:', error);
    return c.json(new ApiError('Internal Server Error', 500), 500);
  }
};

export const removeBookmark = async (c: Context): Promise<Response> => {
  const postId = c.req.param('id');
  const { id: userId } = c.get('user');

  try {
    const prisma = await initPrisma(c);
    const bookmark = await prisma.bookmark.findFirst({
      where: { postId, userId },
    });

    if (!bookmark) {
      return c.json(new ApiResponse(null, 'Bookmark not found', 404), 404);
    }
    await prisma.bookmark.delete({
      where: { id: bookmark.id },
    });

    return c.json(
      new ApiResponse(null, 'Bookmark removed successfully', 200),
      200
    );
  } catch (error) {
    console.error('Failed to remove bookmark:', error);
    return c.json(new ApiError('Internal Server Error', 500), 500);
  }
};

export const getCommentsForPost = async (c: Context): Promise<Response> => {
  const postId = c.req.param('id');

  try {
    const prisma = await initPrisma(c);
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: { select: { name: true } },
      },
    });

    if (!comments || comments.length === 0) {
      return c.json(new ApiResponse([], 'No comments found', 404), 404);
    }

    return c.json(
      new ApiResponse(comments, 'Comments fetched successfully', 200),
      200
    );
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return c.json(new ApiError('Internal Server Error', 500), 500);
  }
};
