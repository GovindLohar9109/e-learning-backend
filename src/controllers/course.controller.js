import CourseService from '../services/course.service.js';
export default class CourseController {
  static async addCourse(req, res) {
    try {
      var result = await CourseService.addCourse(req.body);
      return res.status(201).send(result);
    } catch (err) {
      const statusCode = err.status || 500;
      const message = err.message || 'something is wrong please try again';
      res.status(statusCode).send({ status: false, msg: message });
    }
  }

  static async addToMyCourse(req, res) {
    try {
      var result = await CourseService.addToMyCourse(req.params);
      return res.status(201).send(result);
    } catch (err) {
      const statusCode = err.status || 500;
      const message = err.message || 'something is wrong please try again';
      res.status(statusCode).send({ status: false, msg: message });
    }
  }
  static async deleteCourse(req, res) {
    try {
      var result = await CourseService.deleteCourse(req.params);
      res.status(200).send(result);
    } catch (err) {
      const statusCode = err.status || 500;
      const message = err.message || 'something is wrong please try again';
      res.status(statusCode).send({ status: false, msg: message });
    }
  }
  static async editCourse(req, res) {
    try {
      var result = await CourseService.editCourse(
        req.params.course_id,
        req.body
      );
      res.status(200).send(result);
    } catch (err) {
      const statusCode = err.status || 500;
      const message = err.message || 'something is wrong please try again';
      res.status(statusCode).send({ status: false, msg: message });
    }
  }
  static async getAllCourses(req, res) {
    try {
      var result = await CourseService.getAllCourses(req.query);
     res.status(200).send(result);
    } catch (err) {
      const statusCode = err.status || 500;
      const message = err.message || 'something is wrong please try again';
      res.status(statusCode).send({ status: false, msg: message });
    }
  }
  static async getCoursesDetailsById(req, res) {
    try {
      var result = await CourseService.getCoursesDetailsById(req.params);
      res.status(200).send(result);
    } catch (err) {
      const statusCode = err.status || 500;
      const message = err.message || 'something is wrong please try again';
      res.status(statusCode).send({ status: false, msg: message });
    }
  }
  static async getCoursesByLimit(req, res) {
    try {
      var result = await CourseService.getCoursesByLimit(
        req.params.limit,
        req.query.search
      );
      res.status(200).send(result);
    } catch (err) {
      const statusCode = err.status || 500;
      const message = err.message || 'something is wrong please try again';
      res.status(statusCode).send({ status: false, msg: message });
    }
  }
  static async getMyAllCourses(req, res) {
    try {
      var result = await CourseService.getMyAllCourses(
        req.params.user_id,
        req.query.search
      );
      res.status(200).send(result);
    } catch (err) {
      const statusCode = err.status || 500;
      const message = err.message || 'something is wrong please try again';
      res.status(statusCode).send({ status: false, msg: message });
    }
  }
  static async removeMyCourse(req, res) {
    try {
      var result = await CourseService.removeMyCourse(req.params);
      res.status(200).send(result);
    } catch (err) {
      const statusCode = err.status || 500;
      const message = err.message || 'something is wrong please try again';
      res.status(statusCode).send({ status: false, msg: message });
    }
  }
  static async getCoursesCount(_, res) {
    try {
      return res.status(200).send(await CourseService.getCoursesCount());
    } catch (err) {
      const statusCode = err.status || 500;
      const message = err.message || 'something is wrong please try again';
      res.status(statusCode).send({ status: false, msg: message });
    }
  }
}
