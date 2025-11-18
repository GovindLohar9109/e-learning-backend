import { PrismaClient } from "@prisma/client";
import { courseData, rolesData } from "../data.js";
import { generateHashPassword } from "../../utils/hashPassAction.js";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

export default class SeedInitial {
  async insertDefaultCoursesData() {
    try {
      const count = await prisma.courses.count();
     
      if (count === 0) {
        await prisma.courses.createMany({
          data: courseData,
          skipDuplicates: true
        });
        
      } else {
        
      }
    } catch (err) {
      
    }
  }

  async insertRoles() {
    try {
      await prisma.roles.createMany({
        data: rolesData,
        skipDuplicates: true
      });
      
    } catch (err) {
      
    }
  }

  async insertAdmin() {
    try {
      const count = await prisma.users.count();
      if (count === 0) {
        const hash_pass = await generateHashPassword(process.env.ADMIN_PASSWORD);

        const user = await prisma.users.create({
          data: {
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hash_pass
          }
        });

        const role = await prisma.roles.findFirst({
          where: { name: "Admin" }
        });

        await prisma.user_roles.create({
          data: {
            user_id: user.id,
            role_id: role.id
          }
        });

       
      } else {
        
      }
    } catch (err) {
      
    }
  }
}

// Run seed
const seed = new SeedInitial();

async function main() {
  try {
    await seed.insertDefaultCoursesData();
    await seed.insertRoles();
    await seed.insertAdmin();
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect(); // disconnect only once
  }
}

main();