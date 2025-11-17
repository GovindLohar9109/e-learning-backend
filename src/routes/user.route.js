import express from "express";
import UserController from "../src/controllers/userController.js";
const router = express.Router();
router.post("/login", UserController.userLogin);
router.post("/register", UserController.userRegister);
router.get("/count", UserController.getUsersCount);
export default router;