import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const generateAccessToken = (user) => {
  return jwt.sign(
   user,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_TIME }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    user,
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_TIME }
  );
};

export const cookieOptions = {
  httpOnly: true,
  secure: true, 
};

export function generateAccessAndRefreshToken(email){
    const accessToken=generateAccessToken(email);
    const refreshToken=generateRefreshToken(email);
    return {
        accessToken,refreshToken
    }
}


