import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password:{type: String, required:true},
    LikedPhoto: [{type: mongoose.Schema.Types.ObjectId, ref:"Photo"}]
})

const userModel = mongoose.model('User',userSchema)

export default userModel