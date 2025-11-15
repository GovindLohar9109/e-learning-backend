import express from "express";
import userRoute from "./user.route.js"
import courseRoute from "./course.route.js"
import feedbackRoute from "./feedback.route.js"
const router=express.Router();


router.use("/",userRoute);
router.use("/",courseRoute);
router.use("/",feedbackRoute);




export default router;

