import FeedbackService from "../services/feedback.service.js";
export default class FeedbackController {
    static async addFeedback(req, res) {
        var data = req.body;
        var result = await CourseService.addCourse(data);
        res.status(200).send(result);
    }
    static async getAllFeedback(req, res) {
        var result = await FeedbackService.getAllFeedback();
        res.status(200).json(result);
    }
}