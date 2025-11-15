import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default class CourseService {
    static async addCourse(course) {
        try {
            var result = await prisma.courses.create({
                data: course
            })
            return ({ status: true, msg: "Course Added..." });
        }
        catch (err) {
            return ({ status: false, msg: "Course Not Added..." + err });

        }
    }
    static async addToMyCourse({ course_id, user_id }) {
        course_id = Number(course_id);
        user_id = Number(user_id)
        try {
            await prisma.users_courses.create({
                data: { course_id, user_id },

            })

            return ({ status: true, msg: "Course Added to MyCourses ..." });
        }
        catch (err) {

            return ({ status: false, msg: "Courses is not Added..." });

        }
    }
    static async deleteCourse({ course_id }) {
       
        try {

            await prisma.courses.update({
                where: { id: Number(course_id) },
                data: { deleted_at: new Date() }
            })
            return ({ status: true, msg: "Course Deleted..." });
        }
        catch (err) {
            console.log(err)
            return ({ status: false, msg: "Course Not Deleted..." });

        }
    }
    static async editCourse(course_id, course) {
        
        try {
            await prisma.courses.update({
                where: { id: Number(course_id) },
                data: {
                    ...course,
                    updated_at: new Date()
                }
            })
            return ({ status: true, msg: "Course Update..." });
        }
        catch (err) {
            return ({ status: false, msg: "Course Not Updated..." });

        }
    }
    static async getAllCourses({ search }) {
        search = search?.replace(/"/g, "").trim();
        try {
            var result = await prisma.courses.findMany({
                where: {
                    deleted_at: null,
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                }
            })


            return (result);
        }
        catch (err) {
            return [];

        }
    }
    static async getCourseCount() {
        try {
            var courseCount = await prisma.courses.count({
                where: { deleted_at: null }
            });
            return (courseCount);
        }
        catch (err) {
            return (0);

        }
    }
    static async getCoursesByLimit(limit, search ) {
       
        search = search?.replace(/"/g, "").trim();


        try {
            var result = await prisma.courses.findMany({
                where: {
                    deleted_at: null,
                    name: {
                        contains: search,    
                        mode: "insensitive"
                    }
                },
                take: Number(limit)
            });
            

            return (result);
        }
        catch (err) {
            return [];

        }
    }
    static async getCoursesDetailsById({ course_id }) {
        try {
            var result = await prisma.courses.findFirst({
                where: { id: Number(course_id) }
            })
            console.log(result)
            return (result);
        }
        catch (err) {
            console.log(err)
            return {};

        }
    }
    static async getMyAllCourses(user_id,search) {
        search = search?.replace(/"/g, "").trim();
        try {
            const result = await prisma.courses.findMany({
                where: {
                    name: {
                        contains: search,    
                        mode: "insensitive"
                    },
                    deleted_at: null,
                    users_courses: {
                        some: {
                            user_id: Number(user_id),
                            deleted_at: null
                        }
                    }
                }
            });


            return (result);
        }
        catch (err) {
            console.log(err)
            return [];

        }
    }
    static async removeMyCourse({ user_id, course_id }) {

        try {
            await prisma.users_courses.delete({
                where: {
                    user_id_course_id: {
                        user_id: Number(user_id),
                        course_id: Number(course_id)
                    }
                }
            });


            return ({ status: true, msg: "MyCourse Deleted..." });
        }
        catch (err) {
            console.log(err);
            return ({ status: true, msg: "MyCourse Not Deleted..." });

        }
    }
}