import express from "express";
import { createdUser,loginUser,logoutUser,getAllUsers} from "../controllers/userController.js";
import { authorizeadmin,authenticate } from "../middlewares/authmiddleware.js";
const router=express.Router()

router.route("/").post(createdUser).get(authenticate,authorizeadmin,getAllUsers);
router.post('/auth',loginUser);
router.post('/logout',logoutUser);  
export default router;