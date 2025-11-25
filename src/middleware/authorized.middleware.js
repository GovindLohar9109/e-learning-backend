import { PrismaClient } from '../prisma/generated/client.js';
const prisma = new PrismaClient();
export default async function authorized(req, res, next) {
  try {
    if (!req.user) {
      const err = new Error('Unauthorized User');
      err.status = 401;
      throw err;
    }
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
    if (role == 'Admin') next();

    const err = new Error('Unauthorized User');
    err.status = 401;
    throw err;
  } catch (err) {
    throw err;
  }
}
