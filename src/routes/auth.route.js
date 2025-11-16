import express from "express";
import AuthController from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/refresh", AuthController.refresh);


export default router;