import { PrismaClient } from '@prisma/client';
import { passwordEncryption } from '../src/lib/password-encryption';

const prisma = new PrismaClient();

/**
 * Upserts a user safely by checking if a user already exists by `username` OR `uniqueId`.
 * If found, it updates the user; otherwise, it creates a new user.
 */
async function safeUpsertUser(data: any) {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: data.username }, { uniqueId: data.uniqueId }], // 🔥 Check both fields to avoid conflicts
    },
  });

  if (existingUser) {
    console.log(`✅ User "${data.username}" already exists. Updating...`);
    return prisma.user.update({
      where: { id: existingUser.id },
      data,
    });
  } else {
    console.log(`✨ Creating new user: ${data.username}`);
    return prisma.user.create({ data });
  }
}

async function main() {
  // 🔹 Seed Admin User
  const adminUser = await safeUpsertUser({
    email: 'admin@gmail.com',
    username: 'admin',
    password: await passwordEncryption('password'),
    role: 'Admin',
    firstName: 'Admin',
    age: 23,
    gender: 'Male',
    uniqueId: '24-0228',
  });

  // 🔹 Seed a Teacher
  const teacher1 = await safeUpsertUser({
    email: 'amelia.rose@example.com',
    username: 'amelia.rose',
    password: await passwordEncryption('password'),
    role: 'Teacher',
    firstName: 'Amelia',
    lastName: 'Rose',
    address: 'Pangasinan',
    age: 42,
    gender: 'Female',
    uniqueId: 'TS-2025-010',
  });

  // 🔹 Seed Students and Assign Teacher
  const students = [
    {
      username: 'aiden.kim',
      firstName: 'Aiden',
      lastName: 'Kim',
      age: 5,
      gender: 'Male',
      uniqueId: 'KS-2025-001',
    },
    {
      username: 'emma.jones',
      firstName: 'Emma',
      lastName: 'Jones',
      age: 5,
      gender: 'Female',
      uniqueId: 'KS-2025-002',
    },
    {
      username: 'lucas.brown',
      firstName: 'Lucas',
      lastName: 'Brown',
      age: 5,
      gender: 'Male',
      uniqueId: 'KS-2025-003',
    },
    {
      username: 'olivia.green',
      firstName: 'Olivia',
      lastName: 'Green',
      age: 5,
      gender: 'Female',
      uniqueId: 'KS-2025-004',
    },
    {
      username: 'mason.wilson',
      firstName: 'Mason',
      lastName: 'Wilson',
      age: 6,
      gender: 'Male',
      uniqueId: 'KS-2025-005',
    },
    {
      username: 'sophia.taylor',
      firstName: 'Sophia',
      lastName: 'Taylor',
      age: 6,
      gender: 'Female',
      uniqueId: 'KS-2025-006',
    },
    {
      username: 'ethan.davis',
      firstName: 'Ethan',
      lastName: 'Davis',
      age: 5,
      gender: 'Male',
      uniqueId: 'KS-2025-007',
    },
    {
      username: 'ava.miller',
      firstName: 'Ava',
      lastName: 'Miller',
      age: 5,
      gender: 'Female',
      uniqueId: 'KS-2025-008',
    },
    {
      username: 'noah.moore',
      firstName: 'Noah',
      lastName: 'Moore',
      age: 6,
      gender: 'Male',
      uniqueId: 'KS-2025-009',
    },
    {
      username: 'isabella.lee',
      firstName: 'Isabella',
      lastName: 'Lee',
      age: 5,
      gender: 'Female',
      uniqueId: 'KS-2025-010',
    },
  ];

  for (const student of students) {
    await safeUpsertUser({
      ...student,
      password: await passwordEncryption('password'),
      role: 'Student',
      teacherId: teacher1.id, // 🔥 Assign teacher
    });
  }

  // 🔹 Seed Modules
  const module1 = await prisma.module.upsert({
    where: { name: 'In the Beginning God Created the World' },
    update: {},
    create: {
      name: 'In the Beginning God Created the World',
      description: 'Discover how God created the world with love and purpose.',
      imageUrl: 'module1.png',
    },
  });

  const module2 = await prisma.module.upsert({
    where: { name: 'First Day of Creation' },
    update: {},
    create: {
      name: 'First Day of Creation',
      description:
        'Learn about the first day of creation, when God created light.',
      imageUrl: 'module2.png',
    },
  });

  const module3 = await prisma.module.upsert({
    where: { name: 'Second Day of Creation' },
    update: {},
    create: {
      name: 'Second Day of Creation',
      description: 'Learn about the second day of creation',
      imageUrl: 'module3.png',
    },
  });

  // 🔹 Seed Lessons
  const lessons = [
    {
      name: 'In the Beginning God Created the World',
      description: "Explores the story of creation and God's love.",
      content: 'lesson1',
      points: 10,
      moduleId: module1.id,
    },
    {
      name: 'God Created Boys and Girls',
      description: "Teaches that every child is special in God's image.",
      content: 'lesson2',
      points: 10,
      moduleId: module1.id,
    },
    {
      name: 'My Favorite Foods',
      description: 'Helps children learn about nutrition and food choices.',
      content: 'lesson3',
      points: 10,
      moduleId: module1.id,
    },
  ];

  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { content: lesson.content },
      update: {},
      create: lesson,
    });
  }

  // 🔹 Seed Activities
  const activities = [
    {
      name: 'Count The Fruit',
      description: 'Count the fruits to enhance basic math skills.',
      imageUrl: 'ctf.png',
      content: 'count-the-fruit',
      points: 10,
    },
    {
      name: 'Find The Missing Letter',
      description: 'Fill in the blanks to improve spelling skills.',
      imageUrl: 'ftml.png',
      content: 'find-the-missing-letter',
      points: 10,
    },
    {
      name: 'Name The Color',
      description: 'Identify colors to boost visual recognition.',
      imageUrl: 'ntc.png',
      content: 'name-the-color',
      points: 10,
    },
  ];

  for (const activity of activities) {
    await prisma.activity.upsert({
      where: { name: activity.name },
      update: {},
      create: activity,
    });
  }

  console.log('✅ DATA IMPORTED SUCCESSFULLY');
}

main()
  .catch((e) => {
    console.error('❌ ERROR SEEDING DATABASE:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
