import { Button } from './Button';
import { Input } from './Input';

export const Auth = ({ type }: { type: string }) => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      {type === 'Login' && (
        <div className='bg-white h-auto w-full  p-8 flex flex-col gap-6 justify-center'>
          <div className='flex flex-col gap-1 text-center'>
            <h2 className='font-bold text-4xl'>Welcome Back! Please Sign In</h2>
            <p className='text-gray-500'>Not Registered Yet? Register</p>
          </div>
          <form className='flex flex-col gap-4'>
            <Input
              type='email'
              placeholder='me@example.com'
              name='email'
              label='Email'
            />
            <Input
              type='password'
              placeholder='*******'
              name='password'
              label='Password'
            />
            <Button text='Sign In' type='submit' className='mt-4' />
          </form>
        </div>
      )}
      {type === 'Register' && (
        <div className='bg-white h-auto w-full  p-8 flex flex-col gap-6 justify-center'>
          <div className='flex flex-col gap-1 text-center'>
            <h2 className='font-bold text-4xl'>Create an account</h2>
            <p className='text-gray-500'>Already have an account? Login</p>
          </div>
          <form className='flex flex-col gap-4'>
            <Input
              type='text'
              placeholder='Durgesh Dubey'
              name='name'
              label='Username'
            />
            <Input
              type='email'
              placeholder='me@example.com'
              name='email'
              label='Email'
            />
            <Input
              type='password'
              placeholder='*******'
              name='password'
              label='Password'
            />
            <Button text='Sign Up' type='submit' className='mt-4' />
          </form>
        </div>
      )}
    </div>
  );
};
