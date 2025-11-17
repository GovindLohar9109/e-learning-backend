// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import { courseData, rolesData } from "../data.js";
import { generateHashPassword } from "../../utils/hashPassAction.js";
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
        }
        finally {
            await prisma.$disconnect();
        }
    }
    async insertAdmin() {
        try {
            const count = await prisma.users.count();
            if (count == 0) {
                var hash_pass = await generateHashPassword("Gl12345678");
                const user = await prisma.users.create({
                    data: {
                        name: "Govind Lohar",
                        email: "govind123@gmail.com",
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
