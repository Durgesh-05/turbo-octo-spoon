import { Auth, Quote } from '../components';

export const Signin = () => {
  return (
    <div className='flex h-screen w-screen justify-center items-center '>
      <div className='flex h-2/3 w-2/3 bg-white shadow-lg border border-gray-100 rounded-xl'>
        <div className='w-1/2'>
          <Auth type={'Login'} />
        </div>
        <div className='w-1/2'>
          <Quote
            text={` "Log in to continue where you left off and make the most of your experience."`}
          />
        </div>
      </div>
    </div>
  );
};
