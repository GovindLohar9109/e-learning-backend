import express from "express";
import userRoute from "./user.route.js";
import courseRoute from "./course.route.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();
router.use("/", userRoute);
router.use("/", authMiddleware, courseRoute);

export default router;
