import FeedbackService from "../services/feedback.service.js";
export default class FeedbackController {
    static async addFeedback(req, res) {
        var result = await FeedbackService.addFeedback(req.body.feedback,req.params.user_id);
        res.status(200).send(result);
    }
    static async getAllFeedback(req, res) {
        var result = await FeedbackService.getAllFeedback();
        res.status(200).json(result);
    }
}