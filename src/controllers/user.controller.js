import UserService from "../services/user.service.js";
export default class UserController {
    static async userLogin(req, res) {
        var data = req.body;
        var result = await UserService.userLogin(data);
        res.status(200).send(result);
    }
    static async userRegister(req, res) {
        var data = req.body;
        var result = await UserService.userRegister(data);
        res.send(result);
    }
    static async userUpdate(req, res) {
        var data = req.body;
        var result = await UserService.userUpdate(data, req.params.user_id);
        res.send(result);
    }
    static async getUsersCount(req, res) {
        return res.send(await UserService.getUsersCount());
    }
}