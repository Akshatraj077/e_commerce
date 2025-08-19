import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'

// Placing using COD
const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body
        const orderData = {
            userId, 
            items, 
            amount,
            address,
            paymentMethod : 'COD',
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, {cartData:{}})

        res.json({success: true, message: 'Order Placed'})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

//user Order for frontend
const userOrders = async (req, res) => {
    try {
        
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true, orders})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

// Placing using Razorpay
const placeOrderRazor = async (req, res) => {
   
}

//All orders for admin
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

//Update status for admin 
const updateOrderStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message: 'Status Updated'})
    } catch (error) {
        console.log(error);
        res.json({success:false, messsage: error.message})
    }
}

export {placeOrder , placeOrderRazor, allOrders, userOrders, updateOrderStatus}