const express = require('express');
const userRouter = express.Router();
const {allUsers, registerUser, authUser} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

userRouter.get("/", protect, allUsers);
userRouter.post('/', registerUser);
userRouter.post('/login', authUser);

module.exports = userRouter;