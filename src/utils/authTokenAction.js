import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function generateAccessToken(email){
   try{
        var accessToken=jwt.sign({email},process.env.ACCESS_TOKEN_SECRET);
        return accessToken;
    }
    catch(err){
        throw new Error("Server Error")
    }
}
export async function generateRefreshToken(email){
   try{
        var refreshToken=jwt.sign({email},process.env.REFRESH_TOKEN_SECRET);
        return refreshToken;
    }
    catch(err){
        throw new Error("Server Error")
    }
}

export function getCookiePayload(){
    return {
        httpOnly:true,
        secure:true
    }
}
