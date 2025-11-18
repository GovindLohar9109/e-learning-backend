import UserService from '../../services/user.service.js';
export default class UserController {
  static async userLogin(req, res) {
    try {
      var data = req.body;
      var result = await UserService.userLogin(data);
      res.send(result)
    } catch (err) {
      res.send(err.message);
    }
  }
  static async userRegister(req, res) {
    try {
      var data = req.body;
      var result = await UserService.userRegister(data);
      res.send(result);
    } catch (err) {
      res.send(err.message);
    }
  }
  static async getUsersCount(req, res) {
    try {
       res.send(await UserService.getUsersCount());
    } catch (err) {
       res.send(err.message);
    }
  }
}
