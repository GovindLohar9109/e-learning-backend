import { PrismaClient } from '@prisma/client';
import { courseData, rolesData } from '../data.js';
import { generateHashPassword } from '../../utils/hashPassAction.js';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

export default class SeedInitial {
  async seedAll() {
    try {
      await prisma.$transaction(async (tx) => {
        for (const course of courseData) {
          await tx.courses.upsert({
            where: { name: course.name },
            update: course,
            create: course,
          });
        }

        for (const role of rolesData) {
          await tx.roles.upsert({
            where: { name: role.name },
            update: role,
            create: role,
          });
        }

        const hash_pass = await generateHashPassword(
          process.env.ADMIN_PASSWORD
        );
        const admin = await tx.users.upsert({
          where: { email: process.env.ADMIN_EMAIL },
          update: {
            name: process.env.ADMIN_NAME,
            password: hash_pass,
          },
          create: {
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hash_pass,
          },
        });

        const role = await tx.roles.findFirst({
          where: { name: 'Admin' },
        });

        await tx.user_roles.upsert({
          where: {
            user_id_role_id: {
              user_id: admin.id,
              role_id: role.id,
            },
          },
          update: {},
          create: {
            user_id: admin.id,
            role_id: role.id,
          },
        });
      });
    } catch (err) {
      console.error('Seeding Error:', err);
    } finally {
      await prisma.$disconnect();
    }
  }
}

const seed = new SeedInitial();
seed.seedAll();
