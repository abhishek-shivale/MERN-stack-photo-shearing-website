import express from 'express'
import bcrypt from 'bcrypt'
const authRouter = express.Router()
authRouter.use(express.json()); 
import jwt from "jsonwebtoken";
import userModel from '../database/user.js';

authRouter.post('/register', async(req,res)=>{
    const {username,password} = req.body
    const user = await userModel.findOne({username})
    if(user){
        res.json({msg:'already registered please login'})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new userModel({username,password:hashedPassword})
    await newUser.save()
    res.json({msg:'your account has been created successfully'})
})
authRouter.post('/login',async(req,res)=>{
    const {username,password} = req.body
    const user = await userModel.findOne({username})
    if(!user){
       res.json({msg:'Account not found'})
    }
    const isvalid = await bcrypt.compare(password,user.password)
    if(isvalid){
        const token = jwt.sign({id: user._id},'secret')
        res.json({token,useID:user._id})
    }
})


export default authRouter
