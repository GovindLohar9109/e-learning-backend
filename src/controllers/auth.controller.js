import AuthService from "../services/auth.service.js";
import { cookieOptions } from "../utils/authTokenAction.js";

export default class AuthController{
    static refresh(req,res){
        const refreshToken=req.cookies?.refreshToken;
        const result=AuthService.refresh(refreshToken);
        if(!result.status){
            res.status(401).json(result);
            return ;
        }
        res.cookie("accessToken",result.accessToken,cookieOptions);
        res.status(200).json({msg:"New Access Token Generated"});
    }
}