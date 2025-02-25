import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken.js'

const createdUser=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body
    if(!username || !email || !password){
        throw new Error("Please Fill all the required values.");
    }

    const userExist=await User.findOne({email});
        if(userExist) res.status(400).send("User Already exist");
    
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt) 

        const newUser=new User({username,email,password:hashedPassword})

        try{
          await newUser.save();

           createToken(res,newUser._id);

          res.status(201).json({
            _id:newUser._id,
            username:newUser.username,
            email:newUser.email,
            isAdmin:newUser.isAdmin,
          });
        }
        catch(err){
            res.status(400)
            throw new err("Invalid user data");
        }
});

const loginUser=asyncHandler(async(req,res)=>{
       const {email,password}=req.body;
       const existingUser=await User.findOne({email})
       if(existingUser){
              const isPassValid=await bcrypt.compare(password,existingUser.password)

              if(isPassValid){
                createToken(res,existingUser._id)

                res.status(201).json({
                  _id:existingUser._id,
                  username:existingUser.username,
                  email:existingUser.email,
                  isAdmin:existingUser.isAdmin,
                });
                return;
              }
       }
       res.status(401).json({ message: 'Invalid email or password' }); 
})

const logoutUser=asyncHandler(async(req,res)=>{
 res.cookie('jwt','',{
  httpOnly:true,
  expires:new Date(0),
 })

 res.status(200).json({message:"Logged out successfully"})
})

const getAllUsers=asyncHandler(async(req,res)=>{
  const users=await User.find({});
  res.json(users);
  
});



export {createdUser,loginUser,logoutUser,getAllUsers};