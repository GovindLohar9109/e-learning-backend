import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function authorized(req, res, next) {
  
  if (!req.user)
    return res.status(401).json({ status: true, msg: "Unauthorized User" });
  try {
    const userWithRole = await prisma.users.findFirst({
      where: { id: Number(req.user.id) },
      include: {
        user_roles: {
          include: {
            roles: {
              select: { name: true },
            },
          },
        },
      },
    });
    var role = userWithRole.user_roles[0].roles.name;
    if (role == "Admin") return next();
    return res.status(401).json({ status: false, msg: "Authorized User" });
  } catch (err) {
    console.log(err)
    return res.status(401).json({ status: false, msg: "Unauthorized User" });
  }
}
