import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

export default class ReverseSeedInitial {
  async seedAll() {
    try{
    await prisma.$transaction(async (tx) => {
      await tx.courses.deleteMany();
      await tx.roles.deleteMany();
      await tx.users.deleteMany();
    });
    await prisma.$disconnect();
  }
  catch(err){
    throw new Error("Failed to Rever Seeding");
  }
  }
}
const seed = new SeedInitial();
seed.seedAll();
