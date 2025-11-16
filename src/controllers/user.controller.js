import UserService from "../../services/user.service.js";
export default class UserController {
    static async userLogin(req, res) {
        var data = req.body;
        var result = await UserService.userLogin(data);
        res.send(result);
    }
    static async userRegister(req, res) {
        var data = req.body;
        var result = await UserService.userRegister(data);
        res.send(result);
    }
    static async getUsersCount(req, res) {
        return  res.send(await UserService.getUsersCount());
    }
}