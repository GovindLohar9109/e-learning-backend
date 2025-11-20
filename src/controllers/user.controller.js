import UserService from "../services/user.service.js";

export default class UserController {
  static async userLogin(req, res) {
   
    try {
      const result = await UserService.userLogin(req.body);
      res.cookie("accessToken", result.accessToken, {
        maxAge: 4 * 60 * 60 * 1000,
      });
      return res.status(200).send({
        status: true,
        msg: result.msg,
        role: result.role,
      });
    } catch (err) {
        
        const statusCode=err.status || 500;
        const msg=err.message || "something is wrong please try again"
        res.status(statusCode).send({status:false,msg:err.message});
      
    }
  }

  static async userRegister(req, res) {
    try {
      var data = req.body;
      var result = await UserService.userRegister(data);

      if (!result.status) return res.status(200).send(result);
      res.cookie("accessToken", result.accessToken, {
        maxAge: 4 * 60 * 60 * 1000,
      });

      return res.status(200).send({
        status: true,
        msg: result.msg,
        role: result.role,
      });
    } catch (err) {
        const statusCode=err.status || 500;
        const msg=err.message || "something is wrong please try again"
        res.status(statusCode).send({status:false,msg:err.message})
    }
  }
  static async getUser(req, res) {
    try {
      res.status(200).json(await UserService.getUser(req.user.id));
    } catch (err) {
        const statusCode=err.status || 500;
        const msg=err.message || "something is wrong please try again"
        res.status(statusCode).send({status:false,msg:err.message})
    }
  }
  static async getUsersCount(_, res) {
    try {
      res.status(200).send(await UserService.getUsersCount());
    } catch (err) {
        const statusCode=err.status || 500;
        const msg=err.message || "something is wrong please try again"
        res.status(statusCode).send({status:false,msg:err.message})
    }
  }
  static async userLogout(req, res) {
    try {
      res.clearCookie("accessToken");
      res.status(200).json({ status: true, msg: "Logout" });
    } catch (err) {
        const statusCode=err.status || 500;
        const msg=err.message || "something is wrong please try again"
        res.status(statusCode).send({status:false,msg:err.message})
    }
  }
}