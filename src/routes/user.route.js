import express from 'express';
import UserController from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', UserController.userLogin);
router.post('/register', UserController.userRegister);
router.get('/users', authMiddleware, UserController.getUser);

export default router;
