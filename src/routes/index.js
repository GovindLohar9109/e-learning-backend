import express from "express";
import userReducer from "./userRoute.js"
const router=express.Router();
router.use("/",userReducer);
export default router;
