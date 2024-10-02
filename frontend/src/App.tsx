import { Route, Routes } from 'react-router-dom';
import './App.css';
import {
  Blog,
  Blogs,
  CreateBlog,
  NotFound,
  Profile,
  Signin,
  Signup,
} from './pages';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authAtom, blogAtom, loadingAtom } from './store/atom';
import { useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from './api/utils';
import { useBlogs } from './hooks';

const App = () => {
  const setBlogs = useSetRecoilState(blogAtom);
  const [authState, setAuthState] = useRecoilState(authAtom);
  const { isLoading, blogs } = useBlogs();
  const setIsLoading = useSetRecoilState(loadingAtom);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog`);
        if (res.status === 200) {
          const { data } = res.data;
          setBlogs(data);
        }
      } catch (e) {
        console.error('Failed to fetch blogs', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [setBlogs, setIsLoading]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!user.accessToken) {
        setAuthState({
          user: null,
          isAuthenticated: false,
        });
      }
      setAuthState({
        user,
        isAuthenticated: true,
      });
    }
  }, []);

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Blogs isLoading={isLoading} blogs={blogs} authState={authState} />
        }
      />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/create' element={<CreateBlog />} />
      <Route path='/blog/:id' element={<Blog />} />
      <Route
        path='/profile'
        element={authState.isAuthenticated ? <Profile /> : <Signin />}
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
