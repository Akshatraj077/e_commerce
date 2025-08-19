import mongoose from 'mongoose'

const connectDb = async () => {
    mongoose.connection.on('connected', () => {
        console.log('DB connected');
    })
    
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/e-comPractice`);
    } catch (err) {
        console.error('Failed to connect:', err);
    }
}

export default connectDb