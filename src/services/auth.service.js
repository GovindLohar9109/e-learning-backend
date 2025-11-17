import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
import { generateAccessToken } from "../utils/authTokenAction.js";

const prisma=new PrismaClient();
export default class AuthService{
    static async refresh(refreshToken){
         
        try{
        if(!refreshToken)return {status:false,msg:"No Refresh Token Found"};
        const decoded=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        if(!decoded)return {status:false,msg:"Refresh Token Expired"}
        const newAccessToken=generateAccessToken({id:decoded.id,email:decoded.email});
      return {status:true,"accessToken":newAccessToken}
    }

    catch(err){
        return {status:false,msg:"Refresh Token Not Found"}
    }
}
}
