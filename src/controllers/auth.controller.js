import AuthService from "../services/auth.service.js";

export default class AuthController{
    static refresh(req,res){
        try{
        const refreshToken=req.cookies?.refreshToken;
        const result=AuthService.refresh(refreshToken);
        if(result.status==false)return res.status(401).json(result);
        console.log(result)
        res.cookie("accessToken",result.accessToken);
        res.status(200).send({status:true,msg:"Access Token Generated"});
    }
    catch(err){
       
    }
    }
}