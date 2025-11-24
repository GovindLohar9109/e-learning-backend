import express from "express";
import CourseController from "../controllers/course.controller.js";

const router = express.Router();

router.get("/courses/count", CourseController.getCoursesCount);
router.get("/courses/limit", CourseController.getCoursesByLimit);
router.get("/courses/:course_id", CourseController.getCoursesDetailsById);
router.put("/courses/:course_id", CourseController.editCourse);
router.delete("/courses/:course_id", CourseController.deleteCourse);
router.get("/courses", CourseController.getAllCourses);
router.post("/courses/:course_id", CourseController.addToMyCourse);
router.get("/users/courses", CourseController.getMyAllCourses);
router.delete("/courses/:course_id",CourseController.removeMyCourse);
router.post("/courses",CourseController.addCourse);

export default router;