import jwt from "jsonwebtoken";
export default function authMiddleware(req, res, next) {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken)
    return res.status(401).send({ status: false, msg: "Not authenticate" });
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded)
      return res
        .status(401)
        .send({ status: false, msg: "Access token expired" });

    req.user = decoded;
    return next();
  } catch (err) {
    res.status(401).send({ status: false, msg: "Access token expired" });
  }
}
