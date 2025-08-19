import express from 'express'
import {addProduct, listProduct, removeProduct, singleProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const ProductRouter = express.Router()

ProductRouter.post('/Add', adminAuth, upload.fields([{name:'image1', maxCount:1}, {name:'image2', maxCount:1}, {name:'image3', maxCount:1}, {name:'image4', maxCount:1}]), addProduct)
ProductRouter.post('/Remove', adminAuth, removeProduct)
ProductRouter.post('/Single', singleProduct)
ProductRouter.get('/List', listProduct)

export default ProductRouter