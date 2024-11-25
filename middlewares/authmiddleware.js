import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

const authenticate=asyncHandler(async(req,res,next)=>{
    let token;

    token=req.cookies.jwt

    if(token){
        try{
           const decoded=jwt.verify(token,process.env.JWT_SECRET)
           req.user=await User.findById(decoded.userId).select('-password');
           next();
        }
        catch(error){
         res.status(401);
         throw new Error("Not authorzed,token is invalid")
        }
    }else{
        res.status(401);
        throw new Error("Not authorzed,no token")
    }
})

const authorizeadmin=asyncHandler(async(req,res,next)=>{
   if(req.user && req.user.isAdmin){
    next();
   }
   else{
    res.status(401).send("not auhtorized as an admin");
   }
})

const authorizemoderator=asyncHandler(async(req,res,next)=>{
    if(req.user && req.user.isModerator){
     next();
    }
    else{
     res.status(401).send("not auhtorized as an admin");
    }
 })

export {authenticate,authorizeadmin,authorizemoderator};