import { useRecoilValue } from 'recoil';
import { blogAtom, loadingAtom } from '../store/atom';

export const useBlogs = () => {
  const blogs = useRecoilValue(blogAtom);
  const isLoading = useRecoilValue(loadingAtom);
  return { blogs, isLoading };
};
