import express from 'express'
import { placeOrder , placeOrderRazor, allOrders, userOrders, updateOrderStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/userAuth.js'

const orderRouter = express.Router()

//Admin routes
orderRouter.post('/ListAllOrder', adminAuth, allOrders)
orderRouter.post('/UpdateStatus', adminAuth, updateOrderStatus)

//User routes
orderRouter.post('/Place', authUser, placeOrder)
orderRouter.post('/Razor', authUser, placeOrderRazor)
orderRouter.post('/ListOrder', authUser, userOrders)

export default orderRouter