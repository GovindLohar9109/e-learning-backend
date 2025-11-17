import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function resetRoles() {
  try {
    await prisma.roles.deleteMany();
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
}

resetRoles();
