import { UserRole } from '../const.js';
import { PrismaClient } from '../prisma/generated/client.js';
const prisma = new PrismaClient();
export default async function userAuthorization(req, res, next) {
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
    if (role == UserRole.ADMIN) {
      // if user is admin
      next();
    } else {
      // if user is only simple user then he does not have access to use admin functionality
      const err = new Error('Unauthorized User');
      err.status = 401;
      throw err;
    }
  } catch (err) {
    throw err;
  }
}
