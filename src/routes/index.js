import express from 'express';
import userRoute from './user.route.js';
import courseRoute from './course.route.js';
import adminRoute from "./admin.route.js";


const router = express.Router();

router.use('/user', userRoute);
router.use('/course', courseRoute);
router.use('/admin', adminRoute);

export default router;
