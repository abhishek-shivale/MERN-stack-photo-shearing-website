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
photoRouter.post('/add-photo',verifyToken, async(req,res)=>{
    const { title, caption, imageURL} = req.body
    
    try {
        const URL = await Photo.findOne({imageURL})
        if(URL){
            return res.json({msg:'image already in database upload other'})
        }
        const NewPhoto = new Photo({title,caption,imageURL})
        await NewPhoto.save()
        res.json({msg:'photo added successfully!!'})
    } catch (err) {
        res.json(err)
    }
})
export{photoRouter}