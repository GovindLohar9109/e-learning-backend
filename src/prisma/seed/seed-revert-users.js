import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function resetUsers() {
  try {
    await prisma.users.deleteMany();
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
}

resetUsers();
