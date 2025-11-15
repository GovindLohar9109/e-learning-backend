import CourseService from "../services/course.service.js"
export default class CourseController {
    static async addCourse(req, res) {
        var data = req.body;
        var result = await CourseService.addCourse(data);
        res.status(200).send(result);
    }
    static async addToMyCourse(req, res) {
        
        var result = await CourseService.addToMyCourse(req.params);
        res.status(200).json(result);
    }
    static async deleteCourse(req, res) {
      
        var result = await CourseService.deleteCourse(req.params);
        res.status(200).json(result);
    }
    static async editCourse(req, res) {
        var result = await CourseService.editCourse(req.params.course_id, req.body);
        res.status(200).json(result);
    }
    static async getAllCourses(req, res) {
        console.log(req.params)
        var result = await CourseService.getAllCourses(req.params);
       
        res.status(200).json(result);
    }
   
    static async getCoursesDetailsById(req, res) {
        var result = await CourseService.getCoursesDetailsById(req.params);
        res.status(200).json(result);
    }
    static async getCoursesByLimit(req, res) {
        
        var result = await CourseService.getCoursesByLimit(req.params);
        res.status(200).json(result);
    }
    static async getMyAllCourses(req, res) {
        
        var result = await CourseService.getMyAllCourses(req.params);
        
        res.status(200).json(result);
    }
    static async removeMyCourse(req, res) {
        
        var result = await CourseService.removeMyCourse(req.params);
        res.status(200).json(result);
    }
    
    static async getCoursesCount(req, res) {
        
        return res.status(200).json(await CourseService.getCourseCount());
    }
}