import { SigninInput, SignupInput } from '@dragon_18/medium-common';
import axios from 'axios';
import { BACKEND_URL } from './constant';
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
      const { data } = res.data;
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
}: SigninInput): Promise<object | null> => {
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
