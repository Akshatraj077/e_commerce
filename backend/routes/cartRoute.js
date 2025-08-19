import express from 'express'
import { AddToCart, GetCartData, UpdateUserCart } from '../controllers/cartController.js'
import authUser from '../middleware/userAuth.js'

const cartRouter = express.Router()

cartRouter.post('/Add', authUser, AddToCart)
cartRouter.post('/Update', authUser, UpdateUserCart)
cartRouter.post('/Get', authUser, GetCartData)

export default cartRouter
