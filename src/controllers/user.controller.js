import UserService from "../services/user.service.js";
import { cookieOptions } from "../utils/authTokenAction.js";
export default class UserController {
    static async userLogin(req, res) {
        var data = req.body;
        var result = await UserService.userLogin(data);
        
        if(!result.status)return res.send(result);
        res.cookie("accessToken", result.accessToken)
        res.cookie("refreshToken", result.refreshToken,cookieOptions);
    
        return res.status(200).send({status:true,msg:result.msg,role:result.role});
    }
    static  async userRegister(req, res) {
       
        var data = req.body;
        var result =  await UserService.userRegister(data);
       
        if(!result.status)return res.send(result);
        res.cookie("accessToken", result.accessToken,{httpOnly:false,...cookieOptions});
        res.cookie("refreshToken", result.refreshToken,cookieOptions);
       
        return res.status(200).send({status:true,msg:result.msg,role:result.role});

    }
    static async getUser(req,res){
        
        res.status(200).json( await UserService.getUser(req.user.id));
    }
    static async getUsersCount(_, res) {
         res.send( await UserService.getUsersCount());
    }
    static async userLogout(req,res){
       
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
      
        res.status(200).json({status:true,msg:"Logout"})

    }
}