import { PrismaClient } from "@prisma/client";
import { generateHashPassword,comparePassword} from "../utils/hashPassAction.js";
import { generateAccessToken } from "../utils/authTokenAction.js";

const prisma = new PrismaClient();

export default class UserService {
  static prisma = prisma;
  static async userRegister(data) {
    
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
      } 
      else {
        const error= new Error( "User Already Registered..." );
        error.status=401;
        throw error;
      }
    } catch (err) {
      
       throw err;
    }
  }
  static async userLogin(data) {
  

    try {
      const user = await UserService.prisma.users.findFirst({
        where: { email: data.email },
      });

      if (!user) {
        { const error= new Error( "Incorrect User or Password" ); 
          error.status=401;
          throw error;
        }
      }

      const isPassMatch = await comparePassword(data.password, user.password);

      if (!isPassMatch) {
        { const error= new Error( "Incorrect User or Password" ); 
          error.status =401;
          throw error;
        }
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
        id: Number(user.id),
        email: user.email,
      });

      return {
        status: true,
        accessToken,
        role: roleName === "Admin" ? 2 : 1,
        msg: "User Logged In",
      };
    } catch (err) {
       throw err;
    }
  }

  static async getUsersCount() {
    try {
      return await UserService.prisma.users.count();
    } catch (err) {
     throw new Error("something is wrong please try again");
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
       throw new Error("something is wrong please try again");
    }
  }
}