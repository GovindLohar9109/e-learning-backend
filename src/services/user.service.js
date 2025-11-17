import { PrismaClient } from "@prisma/client";
import { generateHashPassword, comparePassword } from "../utils/hashPassAction.js";
import { generateAuthToken } from "../utils/authTokenAction.js";
const prisma = new PrismaClient();
export default class UserService {
    static async userRegister(data) {
        try {
            var user = await prisma.users.findFirst({
                where: { email: data.email }
            })
            if (!user) {
                var hash_pass = await generateHashPassword(data.password);
                data.password = hash_pass;
                user = await prisma.users.create({
                    data: data
                })
                var role = await prisma.roles.findFirst({
                    where: { name: "User" }
                })
                await prisma.user_roles.create({
                    data: {
                        user_id: user.id,
                        role_id: role.id
                    }
                })
                var token = await generateAuthToken(data.email);
                user = { user_email:data.email ,user_name:data.name, user_role: "User" };
                return { status: true, msg: "User Registered...", token, user };
            }
            else {
                return { status: true, msg: "User Already Registered..." };
            }
        }
        catch (err) {
            return { status: false, msg: "Server Error" + err };
        }
    }
    static async userLogin(data) {
        try {
            var user = await prisma.users.findFirst({
                where: { email: data.email }
            })
            if (user) {
                var isPassMatch = await comparePassword(data.password, user.password)
                if (isPassMatch) {
                    var token = await generateAuthToken(data.email);
                    const userWithRole = await prisma.users.findFirst({
                        where: { id: user.id },
                        include: {
                            user_roles: {
                                include: {
                                    roles: {
                                        select: { name: true }
                                    },
                                },
                            },
                        },
                    });
                    var role = userWithRole.user_roles[0].roles.name;
                    user = { user_email: user.email, user_name: user.name, user_role: role };
                    return { status: true, msg: "User LoggedIn...", token, user: user };
                }
                else {
                    return { status: true, msg: "Incorrect User or Password" };
                }
            }
            else {
                return { status: true, msg: "Incorrect User or Password" };
            }
        }
        catch (err) {
            return { status: false, msg: "Server Error " + err };
        }
    }
    static async getUsersCount() {
        try {
            return await prisma.users.count();
        }
        catch (err) {
            return 0;
        }
    }
}