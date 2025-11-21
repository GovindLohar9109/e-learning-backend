import { PrismaClient } from "../prisma/generated/client.js";

import {
  generateHashPassword,
  comparePassword,
} from "../utils/hashPassAction.js";

import { generateAccessToken } from "../utils/authTokenAction.js";
import validation from "../validators/validation.js";

const prisma = new PrismaClient();

export default class UserService {
  static prisma = prisma;
  static async userRegister(data) {
    const resp = validation(data, false);
    if (resp.status == false) return resp;
    try {
      let user = await UserService.prisma.user.findFirst({
        where: { email: data.email },
      });

      if (!user) {
        let hash_pass = await generateHashPassword(data.password);
        data.password = hash_pass;
        user = await UserService.prisma.user.create({
          data: { ...data },
        });
        let role = await UserService.prisma.role.findFirst({
          where: { name: "User" },
        });
        await UserService.prisma.userRole.create({
          data: {
            user_id: user.id,
            role_id: role.id,
          },
        });

        return { status: true, msg: "User Registered" };
      } else {
        return { status: false, msg: "User Already Registered..." };
      }
    } catch (err) {
      return { status: false, msg: " Server Error..." };
    }
  }

  static async userLogin(data) {
    const resp = validation(data, true);
    if (!resp.status) return resp;

    try {
      const user = await UserService.prisma.user.findFirst({
        where: { email: data.email },
      });

      if (!user) {
        return { status: false, msg: "Incorrect email or password" };
      }

      const isPassMatch = await comparePassword(data.password, user.password);

      if (!isPassMatch) {
        return { status: false, msg: "Incorrect email or password " };
      }

      const userWithRole = await UserService.prisma.user.findFirst({
        where: { id: user.id },
        include: {
          user_roles: {
            include: {
              role: { select: { name: true } },
            },
          },
        },
      });

      const roleName = userWithRole.user_roles[0].role.name;

      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
      });

      return {
        status: true,
        accessToken,
        role: roleName,
        msg: "User Logged In successfully",
      };
    } catch (err) {
      return { status: false, msg: "Server Error" };
    }
  }
  static async getUsersCount() {
    try {
      return await UserService.prisma.user.count();
    } catch (err) {
      return { status: false, msg: "Server Error" };
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
      let userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: roles?.role?.name,
      };
      return userData;
    } catch (err) {
      return { status: false, msg: "Server Error" };
    }
  }
}
