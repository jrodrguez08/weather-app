const express = require('express');
const userService = require('../services/userService');

const userRouter = express.Router();

userRouter.get('/', userService.getAllUsers);
userRouter.get('/:id', userService.getUser);

userRouter.post('/', userService.createUser);

module.exports = userRouter;
