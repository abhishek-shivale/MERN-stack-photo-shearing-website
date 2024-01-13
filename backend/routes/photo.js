import express from 'express'
const photoRouter = express.Router()
photoRouter.use(express.json())
import userModel from '../database/user.js'
import Photo from '../database/Photo.js'
import { verifyToken } from '../middelware/verify.js'

photoRouter.get('/', async (req,res)=>{
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
photoRouter.put('/liked-photo', verifyToken, async (req, res) => {
    const { userID, photoID } = req.body;

    try {
        const user = await userModel.findById(userID);
        
        if (!user) {
            return res.json({ msg: 'Try again, caught some error' });
        }

       const likedPhoto =  user.LikedPhoto.includes(photoID)
        if (likedPhoto) {
            return res.json({ msg: 'Photo already liked' });
        }

        user.LikedPhoto.push(photoID);
        await user.save();

        res.json({ msg: 'Photo liked successfully' });
    } catch (err) {
        console.error(err);
        res.json({ msg: 'Got an error', error: err.message });
    }
});
photoRouter.get('/like/:userID', verifyToken, async (req, res) => {
    const userID = req.params.userID;

    try {
        const user = await userModel.findById(userID);

        if (!user) {
            return res.json({ msg: 'User not found' });
        }

        const likedphotos = await Photo.find({ _id: { $in: user.LikedPhoto } });
        res.json({ likedphotos });
    } catch (error) {
        res.json({ msg: error.message });
    }
});

export{photoRouter}