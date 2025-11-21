import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const accessToken = req.headers.authorization;
  
  if (!accessToken)
    return res.status(401).send({ status: false, msg: "Not authenticate" });
  try {
    const token=accessToken.split(" ")[1];
    const userInformation = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    if (!userInformation)
      return res
        .status(401)
        .send({ status: false, msg: "Access token expired" });

    req.user = userInformation;
    return next();
  } catch (err) {
    res.status(401).send({ status: false, msg: "Access token expired" });
  }
}
