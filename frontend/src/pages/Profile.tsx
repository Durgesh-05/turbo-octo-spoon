import { useEffect, useState } from 'react';
import { userProfile } from '../api/auth';
import { AppBar, ProfileSkeleton } from '../components';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../store/atom';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const [profileData, setProfileData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const authState = useRecoilValue(authAtom);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const profileDataResponse = await userProfile(user);
        if (profileDataResponse != null) {
          setProfileData(profileDataResponse);
          setIsLoading(false);
        }
      }
    };

    fetchProfileData();
  }, []);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className='bg-white'>
      <AppBar authState={authState} onSearch={() => {}} />
      <div className='min-h-screen flex flex-col items-center justify-center  p-6'>
        <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl border border-gray-200'>
          <div className='flex items-center space-x-4'>
            <div className='w-16 h-16 rounded-full bg-gray-500 flex items-center justify-center text-2xl font-bold text-white'>
              {profileData.name[0]}
            </div>
            <div>
              <h2 className='text-2xl font-semibold text-gray-800'>
                {profileData.name}
              </h2>
              <p className='text-gray-600'>{profileData.email}</p>
            </div>
          </div>
          <div className='mt-6'>
            <h3 className='text-xl font-semibold text-gray-800'>Bookmarks</h3>
            <ul className='mt-2 space-y-2'>
              {profileData.Bookmark.map((bookmark: any) => (
                <Link to={`/blog/${bookmark.post.id}`} key={bookmark.id}>
                  <li className='bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition duration-200'>
                    <p className='text-gray-800 font-medium'>
                      {bookmark.post.title}
                    </p>
                    <p className='text-gray-600 text-sm'>
                      {bookmark.post.description.substring(0, 100)}...
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className='mt-6'>
            <h3 className='text-xl font-semibold text-gray-800'>Liked Posts</h3>
            <ul className='mt-2 space-y-2'>
              {profileData.likedPost.map((liked: any) => (
                <Link to={`/blog/${liked.post.id}`} key={liked.id}>
                  <li className='bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition duration-200'>
                    <p className='text-gray-800 font-medium'>
                      {liked.post.title}
                    </p>
                    <p className='text-gray-600 text-sm'>
                      {liked.post.description.substring(0, 100)}...
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className='mt-6'>
            <h3 className='text-xl font-semibold text-gray-800'>Comments</h3>
            <ul className='mt-2 space-y-2'>
              {profileData.commentedPost.map((comment: any) => (
                <Link to={`/blog/${comment.post.id}`} key={comment.id}>
                  <li className='bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition duration-200'>
                    <p className='text-gray-800'>
                      {comment.content.substring(0, 100)}...
                    </p>
                    <span className='text-sm text-gray-500'>
                      Posted on:{' '}
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
