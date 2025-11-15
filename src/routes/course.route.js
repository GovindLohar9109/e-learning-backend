import express from "express";
import CourseController from "../controllers/course.controller.js";
const router = express.Router();


router.get("/courses/count", CourseController.getCoursesCount);
router.get("/courses/limit/:limit", CourseController.getCoursesByLimit);



router.get("/courses/:course_id", CourseController.getCoursesDetailsById);
router.put("/courses/:course_id", CourseController.editCourse);
router.delete("/courses/:course_id", CourseController.deleteCourse);
router.get("/courses", CourseController.getAllCourses);


router.post("/courses", CourseController.addCourse);


router.post("/mycourses/:course_id/:user_id", CourseController.addToMyCourse);
router.get("/mycourses/:user_id", CourseController.getMyAllCourses);
router.delete("/mycourses/:course_id/:user_id", CourseController.removeMyCourse);

export default router;
