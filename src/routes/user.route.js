import express from "express";
import UserController from "../controllers/user.controller.js";
import authorized from "../middleware/authorized.middleware.js";
const router = express.Router();
router.post("/login", UserController.userLogin);
router.post("/register", UserController.userRegister);
router.get("/users/count",authorized, UserController.getUsersCount);
router.get("/users/:user_id", authorized,UserController.getUser);
router.post("/logout", UserController.userLogout);


export default router;