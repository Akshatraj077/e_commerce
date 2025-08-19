import express from 'express'
import {LoginUser, RegisterUser, AdminLogin} from '../controllers/userController.js'

const UserRouter = express.Router()

UserRouter.post('/Register', RegisterUser)
UserRouter.post('/Login', LoginUser)
UserRouter.post('/AdminLogin', AdminLogin)

export default UserRouter