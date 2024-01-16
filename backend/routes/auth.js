import express from 'express'
import bcrypt from 'bcrypt'
const authRouter = express.Router()
authRouter.use(express.json()); 
import jwt from "jsonwebtoken";
import userModel from '../database/user.js';

authRouter.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
        const user = await userModel.findOne({ username });
  
      if (user) {
        return res.json({ msg: 'Already registered, please login' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({ username, password: hashedPassword });
      await newUser.save();
    return res.json({ msg: 'Your account has been created successfully' });
    } catch (error) {
      console.error(error);
      return res.json({ msg: 'Internal Server Error' });
    }
  });
  
authRouter.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await userModel.findOne({ username });
  
      if (!user) {
        return res.status(404);
      }
  
      const isvalid = await bcrypt.compare(password, user.password);
  
      if (isvalid) {
        const token = jwt.sign({ id: user._id }, 'secret');
        return res.json({ msg: 'Wait for login', token, userID: user._id });
      } else {
        return res.status(404)
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  });
  


export default authRouter
