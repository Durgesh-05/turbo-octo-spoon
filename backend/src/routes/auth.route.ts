import { Hono } from 'hono';
import { userSignin, userSignup } from '../controllers';

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post('/signup', userSignup);
userRouter.post('/signin', userSignin);

export default userRouter;
