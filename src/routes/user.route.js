import express from "express";
import UserController from "../controllers/user.controller.js";
const router = express.Router();
router.post("/login", UserController.userLogin);
router.post("/register", UserController.userRegister);
router.get("/users/count", UserController.getUsersCount);
router.get("/users/:user_id", UserController.getUser);
router.post("/logout", UserController.userLogout);


export default router;