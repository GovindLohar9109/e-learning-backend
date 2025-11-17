import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function resetRoles() {
  try {
    await prisma.roles.deleteMany();
    console.log('Roles Removed Successfully');
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

resetRoles();
