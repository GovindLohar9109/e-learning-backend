import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
import { generateAccessToken } from "../utils/authTokenAction.js";

const prisma=new PrismaClient();
export default class AuthService{
    static async refresh(refreshToken){
        try{
        if(!refreshToken)return {status:false,msg:"No Refresh Token Found"};
        const decoded=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        if(!decoded)return {status:false,msg:"Expired Token"}
         const newAccessToken=generateAccessToken(decoded.email);
         return {status:true,"accessToken":newAccessToken}
    }

    catch(err){
        throw new Error("Not Token Found");
    }
}
}
