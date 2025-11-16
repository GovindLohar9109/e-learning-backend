import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();


router.post("/login", UserController.userLogin);
router.post("/register", UserController.userRegister);
router.get("/users/count", UserController.getUsersCount);
router.put("/users/:user_id", UserController.userUpdate);


export default router;