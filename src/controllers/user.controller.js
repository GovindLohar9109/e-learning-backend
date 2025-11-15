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
    

    static async getUser(req,res){
        
         res.status(200).json(await UserService.getUser(req.params.user_id));
    }
    static async getUsersCount(req, res) {
         res.send(await UserService.getUsersCount());
    }
}