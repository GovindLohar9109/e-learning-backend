import { PrismaClient } from "../prisma/generated/client.js";
import {
  generateHashPassword,
  comparePassword,
} from '../utils/hashPassAction.js';
import { generateAccessToken } from '../utils/authTokenAction.js';

const prisma = new PrismaClient();
export default class UserService {
  static prisma = prisma;
  static async userRegister(data) {
    try {
      var user = await UserService.prisma.user.findFirst({
        where: { email: data.email },
      });

      if (!user) {
        var hash_pass = await generateHashPassword(data.password);
        data.password = hash_pass;
        user = await UserService.prisma.user.create({
          data: { ...data },
        });
        var role = await UserService.prisma.role.findFirst({
          where: { name: 'User' },
        });
        await UserService.prisma.userRole.create({
          data: {
            user_id: user.id,
            role_id: role.id,
          },
        });
        const accessToken = generateAccessToken({
          id: user.id,
          email: user.email,
        });
        return { status: true, accessToken, role: 1, msg: 'User Registered' };
      } else {
        const error = new Error('User Already Registered...');
        error.status = 409;
        throw error;
      }
    } catch (err) {
      throw err;
    }
  }
  static async userLogin(data) {
    try {
      const user = await UserService.prisma.user.findFirst({
        where: { email: data.email },
      });

      if (!user) {
        {
          const error = new Error('Incorrect email or password');
          error.status = 400;
          throw error;
        }
      }

      const isPassMatch = await comparePassword(data.password, user.password);

      if (!isPassMatch) {
        {
          const error = new Error('Incorrect email or password');
          error.status = 400;
          throw error;
        }
      }

      const userWithRole = await UserService.prisma.user.findFirst({
        where: { id: user.id },
        include: {
          user_roles: {
            include: {
              roles: { select: { name: true } },
            },
          },
        },
      });

      const roleName = userWithRole.user_roles[0].role.name;

      const accessToken = generateAccessToken({
        id: Number(user.id),
        email: user.email,
      });

      return {
        status: true,
        accessToken,
        role: roleName === 'Admin' ? 2 : 1,
        msg: 'User Logged In',
      };
    } catch (err) {
      throw err;
    }
  }

  static async getUsersCount() {
    try {
      return await UserService.prisma.user.count();
    } catch (err) {
      throw err;
    }
  }
  static async getUser(user_id) {
    try {
      const user = await UserService.prisma.user.findFirst({
        where: { id: Number(user_id) },
      });
      const roles = await UserService.prisma.userRole.findFirst({
        where: { user_id: Number(user_id) },
        select: {
          role: {
            select: {
              name: true,
            },
          },
        },
      });
      var userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: roles?.role?.name,
      };
      return userData;
    } catch (err) {
      throw err;
    }
  }
}
