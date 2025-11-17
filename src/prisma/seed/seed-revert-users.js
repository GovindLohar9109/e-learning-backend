import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function resetUsers() {
  try {
    await prisma.users.deleteMany();
    console.log('User Removed Successfully');
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

resetUsers();
