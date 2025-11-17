import express from "express";
import FeedbackController from "../controllers/feedback.controller.js";
import authorized from "../middleware/authorized.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/feedbacks/:user_id",authMiddleware, FeedbackController.addFeedback);
router.get("/feedbacks",FeedbackController.getAllFeedback);
export default router;