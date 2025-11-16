// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import { courseData, rolesData } from "../data.js";
import {generateHashPassword} from "../../utils/hashPassAction.js"
import dotenv from "dotenv"
dotenv.config();
const prisma = new PrismaClient();
export default class SeedInitial {
    async insertDefaultCoursesData() {
        try {
            var count = await prisma.courses.count();
            if (count == 0) {
                await prisma.courses.createMany({
                    data: courseData,
                    skipDuplicates:true
                })
            }
        } catch (err) {
            console.error("  Courses already added...");
        } finally {
            await prisma.$disconnect();
        }
    }
    async insertRoles() {
        try {
            await prisma.roles.createMany({
                data: rolesData,
                skipDuplicates: true
            })
        }
        catch (err) {
            console.log("Roles already added...");
        }
        finally {
            await prisma.$disconnect();
        }
    }
    async insertAdmin() {
        try {
            const count = await prisma.users.count();
            if (count == 0) {
                var hash_pass = await generateHashPassword(process.env.ADMIN_PASSWORD);
                const user = await prisma.users.create({
                    data: {
                        name:process.env.ADMIN_NAME,
                        email:process.env.ADMIN_EMAIL,
                        password: hash_pass,
                    }
                })
                var role = await prisma.roles.findFirst({
                    where: { name: "Admin" }
                });
                user = await prisma.user_roles.create({
                    data: {
                        user_id: user.id,
                        role_id: role.id,
                    }
                })
            }
        }
        catch (err) {
        }
        finally {
            await prisma.$disconnect();
        }
    }
}
// call method explicitly
const seed = new SeedInitial();
async function main() {
    await seed.insertDefaultCoursesData();
    await seed.insertRoles();
    await seed.insertAdmin();
}
main();
