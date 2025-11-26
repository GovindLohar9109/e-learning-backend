import express from 'express';
import userRoute from './user.route.js';
import courseRoute from './course.route.js';
import adminRoute from "./admin.route.js";
import userAuthorization from '../middleware/userAuthorization.middleware.js';



const router = express.Router();

router.use('/auth', userRoute);   // if i write users then it will be only for user but admin can also login that is why i kept common name auth by checking on other website
router.use('/courses', courseRoute);
router.use('/admin',userAuthorization, adminRoute);

export default router;
