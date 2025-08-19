import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//Route for user login
const LoginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        //valid user checks
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success: false, message: "user dosen't exists"})
        }
        const ismatch = await bcrypt.compare(password, user.password)

        //logging in user
        if(ismatch){
            const token = createToken(user._id)
            res.json({success:true, token})
        } else {
            res.json({success:false, message: "inavlid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({success: true, message: error.message})       
    }
}

//Route for user registration
const RegisterUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        //valid user checks
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success: false, message: "user already exists"})
        }
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "please enter valid email"})
        }
        if(password.length < 8){
            return res.json({success: false, message: "please enter strong pass"})
        }
        
        //hasing password and creating user
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success: true, token})

    } catch (error) {
        console.log(error);
        res.json({success: true, message: error.message})       
    }
}

//Route for admin login
const AdminLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success: false, message:"Invalid admin credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: true, message: error.message})  
    }
}

export {LoginUser, RegisterUser, AdminLogin}