import { SigninInput, SignupInput } from '@dragon_18/medium-common';
import axios from 'axios';
import { BACKEND_URL } from './utils';

export interface LoginDataProps {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  accessToken: string;
}
export const userRegistration = async ({
  name,
  email,
  password,
}: SignupInput): Promise<object | null> => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
      email,
      password,
      name,
    });

    if (res.status === 201) {
      const data: LoginDataProps = res.data.data;
      return data;
    }
    return null;
  } catch (e) {
    console.error('Failed to handle user reg ', e);
    return null;
  }
};

export const userLogin = async ({
  email,
  password,
}: SigninInput): Promise<LoginDataProps | null> => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
      email,
      password,
    });

    if (res.status === 200) {
      const { data } = res.data;
      return data;
    }
    return null;
  } catch (e) {
    console.error('Failed to handle user login ', e);
    return null;
  }
};

export const userProfile = async (
  user: LoginDataProps
): Promise<object | null> => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (res.status === 200) {
      return res.data.data;
    }
    return null;
  } catch (e) {
    console.error('Failed to create blog', e);
    return null;
  }
};
