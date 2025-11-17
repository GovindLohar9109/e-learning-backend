import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
<<<<<<< Updated upstream
export async function generateAuthToken(user_email) {
  var key = process.env.JWT_SECRET_KEY;
  try {
    var token = jwt.sign({ user_email }, key);
    return token;
  } catch (err) {
    throw new Error(`Token Generate Failed...`);
  }
}
export async function verifyAuthToken(user_email, token) {
  var key = process.env.JWT_SECRET_KEY + '#' + user_email;
  try {
    var isTokenMatch = jwt.verify(token, key);
    return isTokenMatch;
  } catch (err) {
    return false;
  }
}
=======
export const generateAccessToken = (payload) => {
  return  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: process.env.ACCESS_TOKEN_TIME }
  );
};

>>>>>>> Stashed changes
