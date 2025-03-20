import express from 'express'
import { loginUser,registerUser,adminlogin, loginAgent, registerAgent } from '../controllers/userController.js'

const userRouter=express.Router();


userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminlogin)
userRouter.post('/agent',loginAgent)
userRouter.post('/agentregister',registerAgent)



export default userRouter;