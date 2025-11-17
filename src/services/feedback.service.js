import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default class FeedbackService {
  static async addFeedback(feedback, user_id) {
    try {
      await prisma.feedbacks.create({
        data: { message: feedback, user_id: Number(user_id) },
      });
      return { status: true, msg: "Feedback Added..." };
    } catch (err) {
      return { status: false, msg: "Feedback Not Added..." + err };
    }
  }
  static async getAllFeedback() {
    try {
      const result = await prisma.feedbacks.findMany({
        where: {
          deleted_at: null,
        },
        select: {
          message: true,
        },
      });

      return result;
    } catch (err) {
      return [];
    }
  }
}
