import UserService from "../services/user.service.js";
import dotenv from "dotenv";
dotenv.config();
export default class UserController {
  static async userLogin(req, res) {
    try {
      const result = await UserService.userLogin(req.body);

      if (!result.status) {
        return res.status(200).send(result);
      }
     
      res.cookie("accessToken", result.accessToken, {
        maxAge:process.env.ACCESS_TOKEN_TIME,
      });
      return res.status(200).send({
        status: true,
        msg: result.msg,
        role: result.role,
      });
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }

  static async userRegister(req, res) {
    try {
      var data = req.body;
      var result = await UserService.userRegister(data);

      if (!result.status) return res.status(200).send(result);
      res.cookie("accessToken", result.accessToken, {
        maxAge: process.env.ACCESS_TOKEN_TIME
      });

      return res.status(200).send({
        status: true,
        msg: result.msg,
        role: result.role,
      });
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }
  static async getUser(req, res) {
    try {
      res.status(200).json(await UserService.getUser(req.user.id));
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }
  static async getUsersCount(_, res) {
    try {
      res.status(200).send(await UserService.getUsersCount());
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }
  static async userLogout(req, res) {
    try {
      res.clearCookie("accessToken");
      res.status(200).json({ status: true, msg: "Logout" });
    } catch (err) {
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }
}
