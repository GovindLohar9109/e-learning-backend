import { PrismaClient } from "../prisma/generated/client.js";

const prisma = new PrismaClient(); 
export default class CourseService {
  static prisma = prisma;
  static async addToMyCourse({ course_id, user_id }) {
    course_id = Number(course_id);
    user_id = Number(user_id);
    try {
      let result = await CourseService.prisma.usersCourse.findFirst({
        where: { user_id: Number(user_id), course_id: Number(course_id) },
      });

      if (result) {
        return { status: false, msg: "Course is already added..." };
      }

      result = await CourseService.prisma.usersCourse.create({
        data: { course_id:Number(course_id), user_id:Number(user_id) },
      });
      return { status: true, msg: "Course Added to My Course" };
    } catch (err) {
      return { status: false, msg: "Server Error" };
    }
  }

  static async addCourse(course) {
    course.duration=Number(course.duration)
    try {
      await CourseService.prisma.course.create({
        data: course,
      });
      
      return { status: true, msg: "Added new course" };
    } catch (err) {
      
      return { status: false, msg: "Server Error" };
    }
  }
  static async deleteCourse({ course_id }) {
    try {
      await CourseService.prisma.course.update({
        where: { id: Number(course_id) },
        data: { deleted_at: new Date() },
      });
      return { status: true, msg: "Course Deleted..." };
    } catch (err) {
      return { status: false, msg: "Server Error" };
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
      return { status: true, msg: "Course Update..." };
    } catch (err) {
      return { status: false, msg: "Server Error" };
    }
  }
  static async getAllCourses({ search }) {
    search = search?.replace(/"/g, "").trim();
    try {
      var result = await CourseService.prisma.course.findMany({
        where: {
          deleted_at: null,
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      });

      return result;
    } catch (err) {
      return { status: false, msg: "Server Error" };
    }
  }
  static async getCoursesCount() {
    try {
      var courseCount = await CourseService.prisma.course.count({
        where: { deleted_at: null },
      });
      return courseCount;
    } catch (err) {
      return { status: false, msg: "Server Error" };
    }
  }
  static async getCoursesByLimit(limit, search) {
    search = search?.replace(/"/g, "").trim();
    try {
      var result = await CourseService.prisma.course.findMany({
        where: {
          deleted_at: null,
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        take: Number(limit),
      });
      return result;
    } catch (err) {
      return { status: false, msg: "Server Error" };
    }
  }
  static async getCoursesDetailsById({ course_id }) {
    try {
      var result = await CourseService.prisma.course.findFirst({
        where: { id: Number(course_id) },
      });

      return result;
    } catch (err) {
      return { status: false, msg: "Server Error" };
    }
  }
  static async getMyAllCourses(user_id, search) {
  
    search = search?.replace(/"/g, "").trim();
    try {
      const result = await CourseService.prisma.course.findMany({
        where: {
          name: {
            contains: search,
            mode: "insensitive",
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
      
      return { status: false, msg: "Server Error" };
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

      return { status: true, msg: "My Course Deleted..." };
    } catch (err) {
      return { status: false, msg: "Server Error" };
    }
  }
}
