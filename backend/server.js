import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongoDb.js'
import connectCloudinary from './config/cloudinary.js'
import UserRouter from './routes/userRoutes.js'
import ProductRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

//App config
const app = express()
const port = process.env.PORT || 4000
connectDb()
connectCloudinary()

//Middlewares
app.use(express.json())
app.use(cors())

//API endpoints
app.use('/Api/User', UserRouter)
app.use('/Api/Product', ProductRouter)
app.use('/Api/Cart', cartRouter)
app.use('/Api/Order', orderRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log('Server started on port: '+port);
})