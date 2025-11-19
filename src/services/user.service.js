import { PrismaClient } from "@prisma/client";
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
      var user = await UserService.prisma.users.findFirst({
        where: { email: data.email },
      });

      if (!user) {
        var hash_pass = await generateHashPassword(data.password);
        data.password = hash_pass;
        user = await UserService.prisma.users.create({
          data: { ...data },
        });
        var role = await UserService.prisma.roles.findFirst({
          where: { name: "User" },
        });
        await UserService.prisma.user_roles.create({
          data: {
            user_id: user.id,
            role_id: role.id,
          },
        });
        const accessToken = generateAccessToken({
          id: user.id,
          email: user.email,
        });
        return { status: true, accessToken, role: 1, msg: "User Registered" };
      } else {
        return { status: false, msg: "User Already Registered..." };
      }
    } catch (err) {
      return { status: false, msg: "Internal Server Error..." };
    }
  }
  static async userLogin(data) {
    const resp = validation(data, true);
    if (!resp.status) return resp;

    try {
      const user = await UserService.prisma.users.findFirst({
        where: { email: data.email },
      });

      if (!user) {
        return { status: false, msg: "Incorrect User or Password" };
      }

      const isPassMatch = await comparePassword(data.password, user.password);

      if (!isPassMatch) {
        return { status: false, msg: "Incorrect User or Password" };
      }

      const userWithRole = await UserService.prisma.users.findFirst({
        where: { id: user.id },
        include: {
          user_roles: {
            include: {
              roles: { select: { name: true } },
            },
          },
        },
      });

      const roleName = userWithRole.user_roles[0].roles.name;

      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
      });

      return {
        status: true,
        accessToken,
        role: roleName === "Admin" ? 2 : 1,
        msg: "User Logged In",
      };
    } catch (err) {
      return { status: false, msg: "Server Error" };
    }
  }

  static async getUsersCount() {
    try {
      return await UserService.prisma.users.count();
    } catch (err) {
      return { status: false, msg: "Server Error" };
    }
  }
  static async getUser(user_id) {
    try {
      const user = await UserService.prisma.users.findFirst({
        where: { id: Number(user_id) },
      });
      const roles = await UserService.prisma.user_roles.findFirst({
        where: { user_id: Number(user_id) },
        select: {
          roles: {
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
        role: roles?.roles?.name,
      };
      return userData;
    } catch (err) {
      return { status: false, msg: "Server Error" };
    }
  }
}