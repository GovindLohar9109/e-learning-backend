import express from 'express';
import UserController from "../controllers/user.controller.js"

const router = express.Router();

router.post('/login', UserController.userLogin);
router.post('/register', UserController.userRegister);


export default router;
