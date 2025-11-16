import { PrismaClient } from "@prisma/client";
import { generateHashPassword, comparePassword } from "../utils/hashPassAction.js";
import {  generateAccessAndRefreshToken } from "../utils/authTokenAction.js";
import validation from "../validators/validation.js";
const prisma = new PrismaClient();

export default class UserService {
    static async userRegister(data) {
        const resp=validation(data);
        if(resp.status==false)return resp;
        try {
            var user = await prisma.users.findFirst({
                where: { email: data.email }
            })
            if (!user) {
                 
                const {accessToken,refreshToken}=generateAccessAndRefreshToken({email:data.email});
                var hash_pass = await generateHashPassword(data.password);
                data.password = hash_pass;
                user = await prisma.users.create({
                    data: {...data}
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
                return { status: true, accessToken,refreshToken,role:1,msg:"User Registered "};
            }
            else {
                return { status: false, msg: "User Already Registered..." };
            }
        }
        catch (err) {
            return { status: false, msg: err.message };
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
                    const {accessToken,refreshToken}=generateAccessAndRefreshToken({email:data.email});
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
                    return { status: true, accessToken,refreshToken,role:(role=="Admin")?2:1,msg:"User Logged In"};
                }
                else {
                    return { status: false, msg: "Incorrect User or Password" };
                }
            }
            else {
                return { status: false, msg: "Incorrect User or Password" };
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
    static async getUser(user_id) {
        try {
            const user= await prisma.users.findFirst({
                where:{id:Number(user_id)}
            });
            const roles = await prisma.user_roles.findFirst({
                    where: { user_id:Number(user_id) },
                    select: {
                        roles: {
                        select: {
                            name: true
                        }
                    }
                }
            });
            var userData={name:user.name,email:user.email,role:roles?.roles?.name}
            return userData;
        }
        catch (err) {
             throw new Error("Server Error...");
        }
    }
    
}