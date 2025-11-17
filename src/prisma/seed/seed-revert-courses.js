import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function resetCourses() {
  try {
    await prisma.courses.deleteMany();
    console.log("Courses Removed Successfully");
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

resetCourses();