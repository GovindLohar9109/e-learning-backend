import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function resetCourses() {
  try {
    await prisma.courses.deleteMany();
    console.log('Courses Removed Successfully');
  } catch (err) {
    throw new Error("Failed Reset Courses")
  } finally {
    await prisma.$disconnect();
  }
}

resetCourses();
