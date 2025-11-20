import { PrismaClient } from "@prisma/client";
import { courseData, rolesData } from "../data.js"; 
import { generateHashPassword } from "../../utils/hashPassAction.js";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

class SeedInitial {
  async insertDefaultCoursesData() {
     try { const count = await prisma.courses.count();
       if (count === 0) { 
        
        await prisma.courses.createMany(
          { data: courseData, 
            skipDuplicates: true
          }
        ); 
      } 
        else { } 
      } catch (err) {} 
    }

  async insertRoles() {
    try {
    
      await prisma.roles.createMany({
        data: rolesData,
        skipDuplicates: true,
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
            password: hash_pass,
          },
        });

        const role = await prisma.roles.findFirst({
          where: { name: "Admin" },
        });

        await prisma.user_roles.create({
          data: {
            user_id: Number(user.id),
            role_id: Number(role.id),
          },
        });
      }
    } catch (err) {
      
    }
  }
}

async function main() {
  const seed = new SeedInitial();

  try {
    await seed.insertDefaultCoursesData();
    await seed.insertRoles();
    await seed.insertAdmin();
  } catch (err) {
    
  } finally {
    await prisma.$disconnect();
  }
}

main();


