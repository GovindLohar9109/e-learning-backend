import express from "express";
import FeedbackController from "../controllers/feedback.controller.js";
const router = express.Router();
router.post("/feedbacks/:user_id", FeedbackController.addFeedback);
router.get("/feedbacks", FeedbackController.getAllFeedback);
export default router;
