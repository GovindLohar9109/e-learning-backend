import { PrismaClient } from "../prisma/generated/client.js";
const prisma = new PrismaClient();
export default async function authorized(req, res, next) {
  if (!req.user)
    return res.status(401).json({ status: false, msg: "Unauthorized user" });
  try {
    const userWithRole = await prisma.user.findFirst({
      where: { id: Number(req.user.id) },
      include: {
        user_roles: {
          include: {
            role: {
              select: { name: true },
            },
          },
        },
      },
    });
    var role = userWithRole.user_roles[0].role.name;
    if (role == "Admin") return next();
    return res.status(401).json({ status: false, msg: "Unauthorized user" });
  } catch (err) {
    return res.status(401).json({ status: false, msg: "Unauthorized user" });
  }
}
