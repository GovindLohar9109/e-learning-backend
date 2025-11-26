import { PrismaClient } from "../prisma/generated/client.js";
const prisma = new PrismaClient();
export default class CourseService {
  static prisma = prisma;
  static async addToMyCourse(course_id, user_id ) {
    course_id = Number(course_id);
    user_id = Number(user_id);
    try {
      let result = await CourseService.prisma.usersCourse.findFirst({
        where: { user_id: Number(user_id), course_id: Number(course_id) },
      });

      if (result) {
        const error = new Error('Course is already added...');
        error.status = 409;
        throw error;
      }

      result = await CourseService.prisma.usersCourse.create({
        data: { course_id, user_id },
      });
      return { status: true, msg: 'Course Added to My Course' };
    } catch (err) {
      throw err;
    }
  }

  static async addCourse(course) {
    try {
      await CourseService.prisma.course.create({
        data: course,
      });
      return { status: true, msg: 'Added new course' };
    } catch (err) {
      throw err;
    }
  }
  static async deleteCourse({ course_id }) {
    try {
      await CourseService.prisma.course.update({
        where: { id: Number(course_id) },
        data: { deleted_at: new Date() },
      });
      return { status: true, msg: 'Course Deleted...' };
    } catch (err) {
      throw err;
    }
  }
  static async editCourse(course_id, course) {
    try {
      await CourseService.prisma.course.update({
        where: { id: Number(course_id) },
        data: {
          name: course.name,
          duration: Number(course.duration),
          updated_at: new Date(),
        },
      });
      return { status: true, msg: 'Course Updated...' };
    } catch (err) {
      throw err;
    }
  }
  
  static async getCoursesCount() {
    try {
      var courseCount = await CourseService.prisma.course.count({
        where: { deleted_at: null },
      });
      return courseCount;
    } catch (err) {
      throw err;
    }
  }
  static async getAllCourses({limit,search}) {
    search = search?.replace(/"/g, '').trim();
    try {
      var result = await CourseService.prisma.course.findMany({
        where: {
          deleted_at: null,
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        take: Number(limit),
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
  static async getCoursesDetailsById({ course_id }) {
    try {
      var result = await CourseService.prisma.course.findFirst({
        where: { id: Number(course_id) },
      });

      return result;
    } catch (err) {
      throw err;
    }
  }
  static async getMyAllCourses(search, user_id) {
    search = search?.replace(/"/g, '').trim();
    try {
      const result = await CourseService.prisma.course.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
          deleted_at: null,
          users_courses: {
            some: {
              user_id: Number(user_id),
              deleted_at: null,
            },
          },
        },
      });

      return result;
    } catch (err) {
      throw err;
    }
  }
  static async removeMyCourse({ user_id, course_id }) {
    try {
      await CourseService.prisma.usersCourse.deleteMany({
        where: {
          user_id: Number(user_id),
          course_id: Number(course_id),
          deleted_at: null,
        },
      });

      return { status: true, msg: 'My Course Deleted...' };
    } catch (err) {
      throw err;
    }
  }
}