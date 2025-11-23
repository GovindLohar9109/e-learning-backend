import CourseService from "../services/course.service.js";
export default class CourseController {
  static async addCourse(req, res) {
    try {
      const thumbnailImage = req.file ? req.file.filename : null;
      req.body.image_url = thumbnailImage;
      let result = await CourseService.addCourse(req.body);
      console
      return res.send(result);
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }

  static async addToMyCourse(req, res) {
    try {
      let result = await CourseService.addToMyCourse(req.params.course_id,req.user.id);
      return res.send(result);
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }
  static async deleteCourse(req, res) {
    try {
      let result = await CourseService.deleteCourse(req.params);
      res.status(200).json(result);
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }
  static async editCourse(req, res) {
    try {
      let result = await CourseService.editCourse(
        req.params.course_id,
        req.body,
      );
      res.json(result);
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }
  static async getAllCourses(req, res) {
    try {
      let result = await CourseService.getAllCourses(req.query);

      res.status(200).json(result);
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }
  static async getCoursesDetailsById(req, res) {
    try {
      let result = await CourseService.getCoursesDetailsById(req.params);
      res.status(200).json(result);
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }
  static async getCoursesByLimit(req, res) {
  
    try {
      let result = await CourseService.getCoursesByLimit(req.query);
      res.status(200).json(result);
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }
  static async getMyAllCourses(req, res) {
    try {
      let result = await CourseService.getMyAllCourses(req.query.search,req.user.id);
      res.status(200).json(result);
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }
  static async removeMyCourse(req, res) {
    try {
      let result = await CourseService.removeMyCourse(req.params.course_id,req.user.id);
      res.status(200).json(result);
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }
  static async getCoursesCount(req, res) {
    try {
      return res.status(200).json(await CourseService.getCoursesCount());
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }
}
