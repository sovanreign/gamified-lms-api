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
      description:
        'Discover how God created the world with love and purpose. This module explores the beauty of His creation, teaching children to appreciate and care for the world around them.',
      imageUrl: 'module1.png',
    },
  });

  const module2 = await prisma.module.upsert({
    where: { name: 'First Day of Creation' },
    update: {},
    create: {
      name: 'First Day of Creation',
      description:
        'Learn about the first day of creation, when God created light, separating day from night, and bringing the world into existence.',
      imageUrl: 'module2.png',
    },
  });

  const module3 = await prisma.module.upsert({
    where: { name: 'Second Day of Creation' },
    update: {},
    create: {
      name: 'Second Day of Creation',
      description:
        'Discover how God created the sky and separated the waters, forming the heavens on the second day of creation.',
      imageUrl: 'module3.png',
    },
  });

  await prisma.lesson.upsert({
    where: { content: 'lesson1' },
    update: {},
    create: {
      name: 'In the Beginning God Created the World',
      description:
        "explores the story of creation, teaching how God made the earth, sky, seas, and all living things with love and purpose. This lesson helps children appreciate the beauty of God's creation and understand their special place in it. 🌍✨",
      content: 'lesson1',
      points: 10,
      moduleId: module1.id,
    },
  });
  await prisma.lesson.upsert({
    where: { content: 'lesson2' },
    update: {},
    create: {
      name: 'God Created Boys and Girls',
      description:
        " teaches that every child is made in God's image, special and loved just as they are. This lesson helps children appreciate their uniqueness, respect differences, and understand that God has a wonderful plan for each of them. 👦👧✨",
      content: 'lesson2',
      points: 10,
      moduleId: module1.id,
    },
  });
  await prisma.lesson.upsert({
    where: { content: 'lesson3' },
    update: {},
    create: {
      name: 'My Favorite Foods',
      description:
        ' explores the wonderful variety of foods God has provided. Children will learn to recognize healthy choices, appreciate the importance of nutrition, and understand how good food helps them grow strong and stay healthy. 🍎🥦🍞✨',
      content: 'lesson3',
      points: 10,
      moduleId: module1.id,
    },
  });

  await prisma.activity.upsert({
    where: { name: 'Count The Fruit' },
    update: {},
    create: {
      name: 'Count The Fruit',
      description: 'Lorem ipsum',
      imageUrl: 'ctf.png',
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
      imageUrl: 'ftml.png',
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
      imageUrl: 'ntc.png',
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
