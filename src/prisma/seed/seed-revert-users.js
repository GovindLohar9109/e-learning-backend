import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function resetUsers() {
  try {
    await prisma.users.deleteMany();
    console.log('User Removed Successfully');
  } catch (err) {
    throw new Error("Failed Reset Users")
  } finally {
    await prisma.$disconnect();
  }
}

resetUsers();
