import { PrismaClient } from "@prisma/client";
import { courseData, rolesData } from "../data.js";
import { generateHashPassword } from "../../utils/hashPassAction.js";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

export default class SeedInitial {

    async seedAll() {
        await prisma.$transaction(async (tx) => {

            
            const courseCount = await tx.courses.count();
            if (courseCount === 0) {
                await tx.courses.createMany({
                    data: courseData,
                    skipDuplicates: true
                });
            }

            
            await tx.roles.createMany({
                data: rolesData,
                skipDuplicates: true,
            });

            // Insert Admin user
            const adminCount = await tx.users.count();
            if (adminCount === 0) {

                const hash_pass = await generateHashPassword(process.env.ADMIN_PASSWORD);

                const user = await tx.users.create({
                    data: {
                        name: process.env.ADMIN_NAME,
                        email: process.env.ADMIN_EMAIL,
                        password: hash_pass,
                    }
                });

                const role = await tx.roles.findFirst({
                    where: { name: "Admin" }
                });

                await tx.user_roles.create({
                    data: {
                        user_id: user.id,
                        role_id: role.id,
                    }
                });
            }
        });

        
        await prisma.$disconnect();
    }
}


const seed = new SeedInitial();
seed.seedAll();
