import { Auth, Quote } from '../components';

export const Signup = () => {
  return (
    <div className='flex h-screen w-screen justify-center items-center '>
      <div className='flex h-2/3 w-2/3 bg-white shadow-lg border border-gray-100 rounded-xl'>
        <div className='w-1/2'>
          <Auth type={'Register'} />
        </div>
        <div className='w-1/2'>
          <Quote
            text={` "Create your account and become part of something amazing. Let's grow
        together!"`}
          />
        </div>
      </div>
    </div>
  );
};
