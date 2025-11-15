import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default class CourseService {
    static async addFeedback(feedback) {
        try {
             await prisma.feedbacks.create({
                data: feedback
            })
            return ({ status: true, msg: "Feedback Added..." });
        }
        catch (err) {
            return ({ status: false, msg: "Feedback Not Added..." + err });       
    }
    }    
    static async getAllFeedback() {       
        try {
            var result = await prisma.feedbacks.findMany({
                where: {
                    deleted_at: null,
                }
            })
            return (result);
        }
        catch (err) {
            return [];       
        }
    }
}