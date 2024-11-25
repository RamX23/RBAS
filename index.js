import path from 'path'
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes.js"
import connctdb from './config/db.js'

dotenv.config();
const Port=process.env.Port || 5000;

connctdb(); 

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use('/api/users',userRoutes);




app.listen(Port, () => console.log(`Server is running on port: ${Port}`));