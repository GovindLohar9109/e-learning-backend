import express from "express";
import FeedbackController from "../controllers/feedback.controller.js";
import authorized from "../middleware/authorized.middleware.js";
const router = express.Router();
router.post("/feedbacks/:user_id",authorized, FeedbackController.addFeedback);
router.get("/feedbacks", FeedbackController.getAllFeedback);
export default router;