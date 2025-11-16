import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateAccessToken = (payload) => {
  return  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: process.env.ACCESS_TOKEN_TIME }
  );
};
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{ expiresIn: process.env.REFRESH_TOKEN_TIME }
  );
};

export const cookieOptions = {
  httpOnly: true,
  secure: true, 
};

export  function generateAccessAndRefreshToken(email){
    const accessToken= generateAccessToken(email);
    const refreshToken= generateRefreshToken(email);
    return {
        accessToken,refreshToken
    }
}


