import express, { request } from 'express'
import mongoose from 'mongoose';
import cors from "cors";
import authRouter  from './routes/auth.js'
const app = express()

mongoose.connect(`mongodb+srv://abhishekshivale21:niAcNvZX9eNR2mkS@cluster0.m1ovjoj.mongodb.net/Photo-sharing`)

app.use(express.json())

app.use(cors());

 app.use('/auth', authRouter)

app.listen(3000,()=>{
    console.log('Server Started on 3000');
})