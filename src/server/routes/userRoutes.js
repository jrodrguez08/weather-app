import express from 'express';
import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:email', userController.getUser);

userRouter.post('/register', userController.createUser);
userRouter.post('/login', userController.loginUser);

export default userRouter;
