import mongoose from "mongoose";

const connectdb=async()=>{
    try{
       await mongoose.connect('mongodb+srv://admin:9850196991@login.ovc0xx7.mongodb.net/RBAC')
       console.log("successfully connected to db!")
    }
    catch(err){
        console.error(`error occured while connecting to db: ${err.message}`); 
        process.exit(1);
    }
}

export default connectdb;