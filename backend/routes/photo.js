import express from 'express'
const photoRouter = express.Router()
photoRouter.use(express.json())
import Photo from '../database/Photo.js'
import { verifyToken } from '../middelware/verify.js'

photoRouter.get('/',verifyToken, async (req,res)=>{
    try{
        const response = await Photo.find({})
        res.json(response)
    }catch(err){
        res.json(err)
    }
})
photoRouter.post()