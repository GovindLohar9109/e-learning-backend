import express from "express";
import CourseController from "../controllers/course.controller.js";
import authorized from "../middleware/authorized.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/courses/count", authorized, CourseController.getCoursesCount);
router.get("/courses/limit", CourseController.getCoursesByLimit);
router.get("/courses/:course_id", CourseController.getCoursesDetailsById);
router.put("/courses/:course_id", authorized, CourseController.editCourse);
router.delete("/courses/:course_id", authorized, CourseController.deleteCourse);
router.get("/courses", CourseController.getAllCourses);
router.post("/courses/:course_id", CourseController.addToMyCourse);
router.get("/courses", CourseController.getMyAllCourses);
router.delete("/courses/:course_id",CourseController.removeMyCourse);
router.post("/courses",authorized,upload.single("thumbnailImage"),CourseController.addCourse);

export default router;
