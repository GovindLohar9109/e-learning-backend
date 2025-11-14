import express from "express";
import userReducer from "./user.route.js"
const router=express.Router();


router.use("/",userReducer);




export default router;

