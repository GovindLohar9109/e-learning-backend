import express from "express";
import CourseController from "../controllers/course.controller.js";
import authorized from "../middleware/authorized.middleware.js";
const router = express.Router();
router.get("/courses/count",authorized,CourseController.getCoursesCount);
router.get("/courses/limit/:limit", CourseController.getCoursesByLimit);
router.get("/courses/:course_id", CourseController.getCoursesDetailsById);
router.put("/courses/:course_id",authorized, CourseController.editCourse);
router.delete("/courses/:course_id",authorized,CourseController.deleteCourse);
router.get("/courses", CourseController.getAllCourses);
router.get("courses/limit/:limit",CourseController.getCoursesByLimit)
router.post("/mycourses/:course_id/:user_id", CourseController.addToMyCourse);
router.get("/mycourses/:user_id", CourseController.getMyAllCourses);
router.delete("/mycourses/:course_id/:user_id", CourseController.removeMyCourse);
export default router;
