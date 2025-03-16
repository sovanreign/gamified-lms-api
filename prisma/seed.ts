import { PrismaClient } from '@prisma/client';
import { passwordEncryption } from '../src/lib/password-encryption';

const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      username: 'admin',
      password: await passwordEncryption('password'),
      role: 'Admin',
      firstName: 'Admin',
      age: 23,
      gender: 'Male',
      uniqueId: '24-0228',
    },
  });

  const module1 = await prisma.module.upsert({
    where: { name: 'In the Beginning God Created the World' },
    update: {},
    create: {
      name: 'In the Beginning God Created the World',
      description: 'Lorem ipsum',
      imageUrl: 'module1.png',
    },
  });

  await prisma.lesson.upsert({
    where: { content: 'lesson1' },
    update: {},
    create: {
      name: 'Lesson 1',
      description: 'Lorem ipsum dolor set amit',
      content: 'lesson1',
      points: 10,
      moduleId: module1.id,
    },
  });
  await prisma.lesson.upsert({
    where: { content: 'lesson2' },
    update: {},
    create: {
      name: 'Lesson 2',
      description: 'Lorem ipsum dolor set amit',
      content: 'lesson2',
      points: 10,
      moduleId: module1.id,
    },
  });

  const module2 = await prisma.module.upsert({
    where: { name: 'First Day of Creation' },
    update: {},
    create: {
      name: 'First Day of Creation',
      description: 'Lorem ipsum',
      imageUrl: 'module2.png',
    },
  });

  await prisma.activity.upsert({
    where: { name: 'Count The Fruit' },
    update: {},
    create: {
      name: 'Count The Fruit',
      description: 'Lorem ipsum',
      imageUrl: 'module.png',
      content: 'count-the-fruit',
      points: 10,
    },
  });
  await prisma.activity.upsert({
    where: { name: 'Find The Missing Letter' },
    update: {},
    create: {
      name: 'Find The Missing Letter',
      description: 'Lorem ipsum',
      imageUrl: 'module.png',
      content: 'find-the-missing-letter',
      points: 10,
    },
  });
  await prisma.activity.upsert({
    where: { name: 'Name The Color' },
    update: {},
    create: {
      name: 'Name The Color',
      description: 'Lorem ipsum',
      imageUrl: 'module.png',
      content: 'name-the-color',
      points: 10,
    },
  });

  console.log('DATA IMPORTED SUCCESSFULLY');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
