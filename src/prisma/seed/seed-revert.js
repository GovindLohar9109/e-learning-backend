import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function resetSeed() {
  try {
    await prisma.users.deleteMany();
    await prisma.roles.deleteMany();
    await prisma.courses.deleteMany();
    console.log("Seed data reverted successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

resetSeed();
