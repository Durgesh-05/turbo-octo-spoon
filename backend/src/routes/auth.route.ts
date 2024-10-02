import { Hono } from 'hono';
import { userProfile, userSignin, userSignup } from '../controllers';
import { vaildateToken } from '../middlewares/auth';
const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post('/signup', userSignup);
userRouter.post('/signin', userSignin);
userRouter.get('/profile', vaildateToken, userProfile);

export default userRouter;
