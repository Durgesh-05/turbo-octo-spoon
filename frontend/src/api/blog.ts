import { CreateBlogInput, UpdateBlogInput } from '@dragon_18/medium-common';
import axios from 'axios';
import { BACKEND_URL } from './utils';
import { LoginDataProps } from './auth';

export const createBlog = async (
  user: LoginDataProps,
  { title, description }: CreateBlogInput
): Promise<object | null> => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );

    if (res.status === 201) {
      const blogData = res.data.data;
      return blogData;
    }
    return null;
  } catch (e) {
    console.error('Failed to create blog', e);
    return null;
  }
};

export const updateBlog = async (
  id: string,
  user: LoginDataProps,
  { title, description }: UpdateBlogInput
): Promise<object | null> => {
  try {
    const res = await axios.put(
      `${BACKEND_URL}/api/v1/blog/${id}`,
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );

    if (res.status === 200) {
      const blogData = res.data.data;
      return blogData;
    }
    return null;
  } catch (e) {
    console.error('Failed to update blog', e);
    return null;
  }
};

export const likeBlog = async (
  id: string,
  user: LoginDataProps
): Promise<object | null> => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/blog/${id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );

    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (e) {
    console.error('Failed to like blog', e);
    return null;
  }
};

export const commentOnBlog = async (
  id: string,
  user: LoginDataProps,
  content: string
): Promise<object | null> => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/blog/${id}/comment`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );

    if (res.status === 201) {
      return res.data;
    }
    return null;
  } catch (e) {
    console.error('Failed to comment on blog', e);
    return null;
  }
};

export const bookmarkBlog = async (
  id: string,
  user: LoginDataProps
): Promise<object | null> => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/blog/${id}/bookmark`,
      {},
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );

    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (e) {
    console.error('Failed to bookmark blog', e);
    return null;
  }
};
