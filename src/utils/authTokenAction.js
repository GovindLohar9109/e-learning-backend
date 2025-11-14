import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function generateAuthToken(user_email){
    var key=process.env.JWT_SECRET_KEY +"#"+user_email;
    try{
        var token=jwt.sign({user_email},key);
        return token;
    }
    catch(err){
        return "";
    }
}


export async function verifyAuthToken(user_email,token){
    var key=process.env.JWT_SECRET_KEY +"#"+user_email;
    try{
        var isTokenMatch= jwt.verify(token,key);
        return isTokenMatch;
    }
    catch(err){
        return false;
    }
}