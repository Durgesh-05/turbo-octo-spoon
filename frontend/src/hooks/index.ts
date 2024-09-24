import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../api/utils';
import { LoginDataProps } from '../api/auth';

export const useBlogs = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const user: LoginDataProps = JSON.parse(
          String(localStorage.getItem('user'))
        );
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });

        if (res.status === 200) {
          const { data } = res.data;
          setBlogs(data);
        }
      } catch (e) {
        console.error('failed to fetch Blogs ', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { isLoading, blogs };
};
