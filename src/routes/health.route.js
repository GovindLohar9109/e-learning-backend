import express  from "express";

const router=express.Router();

router.get("/api/health",(req,res)=>{
    res.status(200).send("Welcome to E-Learning-Management-System");
})

export default router;

