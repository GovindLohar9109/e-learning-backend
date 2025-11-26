import express from "express";
import CourseController from "../controllers/course.controller.js";
import UserController from "../controllers/user.controller.js";
const router = express.Router();

router.get("/courses/count", CourseController.getCoursesCount);
router.get('/users/count', UserController.getUsersCount);
router.post("/courses",CourseController.addCourse);
router.put("/courses/:course_id", CourseController.editCourse);
router.delete("/courses/:course_id", CourseController.deleteCourse); 


export default router;