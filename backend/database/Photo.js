import mongoose from 'mongoose';

const photoSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    imageURL: { type: String, required: true }
});

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;