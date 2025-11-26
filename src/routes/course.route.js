import express from "express";
import CourseController from "../controllers/course.controller.js";

const router = express.Router();

router.get("/courses/:course_id", CourseController.getCoursesDetailsById);
router.get("/courses", CourseController.getAllCourses);
router.post("/courses/:course_id", CourseController.addToMyCourse);
router.get("/users/courses", CourseController.getMyAllCourses);
router.delete("/courses/:course_id",CourseController.removeMyCourse);


export default router;
