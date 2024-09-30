import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Blog, Blogs, CreateBlog, Signin, Signup } from './pages';
import { useSetRecoilState } from 'recoil';
import { blogAtom, loadingAtom } from './store/atom';
import { useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from './api/utils';
import { useBlogs } from './hooks';

const App = () => {
  const setBlogs = useSetRecoilState(blogAtom);
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
  return (
    <Routes>
      <Route path='/' element={<Blogs isLoading={isLoading} blogs={blogs} />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/create' element={<CreateBlog />} />
      <Route path='/blog/:id' element={<Blog />} />
    </Routes>
  );
};

export default App;
