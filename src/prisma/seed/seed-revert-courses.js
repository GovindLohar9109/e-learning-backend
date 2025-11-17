import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function resetCourses() {
  try {
    await prisma.courses.deleteMany();
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
}

resetCourses();
