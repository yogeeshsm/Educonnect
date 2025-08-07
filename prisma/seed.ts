import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  // Create departments
  const departments = await Promise.all([
    prisma.department.upsert({
      where: { code: 'CSE' },
      update: {},
      create: {
        name: 'Computer Science and Engineering',
        code: 'CSE',
        description: 'Department of Computer Science and Engineering',
      },
    }),
    prisma.department.upsert({
      where: { code: 'ECE' },
      update: {},
      create: {
        name: 'Electronics and Communication Engineering',
        code: 'ECE',
        description: 'Department of Electronics and Communication Engineering',
      },
    }),
    prisma.department.upsert({
      where: { code: 'ME' },
      update: {},
      create: {
        name: 'Mechanical Engineering',
        code: 'ME',
        description: 'Department of Mechanical Engineering',
      },
    }),
    prisma.department.upsert({
      where: { code: 'CE' },
      update: {},
      create: {
        name: 'Civil Engineering',
        code: 'CE',
        description: 'Department of Civil Engineering',
      },
    }),
    prisma.department.upsert({
      where: { code: 'EE' },
      update: {},
      create: {
        name: 'Electrical Engineering',
        code: 'EE',
        description: 'Department of Electrical Engineering',
      },
    }),
  ]);

  // Create semesters
  const semesters = await Promise.all([
    prisma.semester.upsert({
      where: { number: 1 },
      update: {},
      create: {
        number: 1,
        name: '1st Semester',
      },
    }),
    prisma.semester.upsert({
      where: { number: 2 },
      update: {},
      create: {
        number: 2,
        name: '2nd Semester',
      },
    }),
    prisma.semester.upsert({
      where: { number: 3 },
      update: {},
      create: {
        number: 3,
        name: '3rd Semester',
      },
    }),
    prisma.semester.upsert({
      where: { number: 4 },
      update: {},
      create: {
        number: 4,
        name: '4th Semester',
      },
    }),
    prisma.semester.upsert({
      where: { number: 5 },
      update: {},
      create: {
        number: 5,
        name: '5th Semester',
      },
    }),
    prisma.semester.upsert({
      where: { number: 6 },
      update: {},
      create: {
        number: 6,
        name: '6th Semester',
      },
    }),
    prisma.semester.upsert({
      where: { number: 7 },
      update: {},
      create: {
        number: 7,
        name: '7th Semester',
      },
    }),
    prisma.semester.upsert({
      where: { number: 8 },
      update: {},
      create: {
        number: 8,
        name: '8th Semester',
      },
    }),
  ]);

  // Create subjects for CSE department
  const cseSubjects = await Promise.all([
    prisma.subject.upsert({
      where: { code: 'CS101' },
      update: {},
      create: {
        name: 'Introduction to Computer Science',
        code: 'CS101',
        departmentId: departments[0].id,
        semesterId: semesters[0].id,
        description: 'Fundamentals of computer science and programming',
      },
    }),
    prisma.subject.upsert({
      where: { code: 'CS201' },
      update: {},
      create: {
        name: 'Data Structures and Algorithms',
        code: 'CS201',
        departmentId: departments[0].id,
        semesterId: semesters[1].id,
        description: 'Study of data structures and algorithm design',
      },
    }),
    prisma.subject.upsert({
      where: { code: 'CS301' },
      update: {},
      create: {
        name: 'Database Management Systems',
        code: 'CS301',
        departmentId: departments[0].id,
        semesterId: semesters[2].id,
        description: 'Database design and management',
      },
    }),
  ]);

  // Create admin user
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@studyhub.com' },
    update: {},
    create: {
      email: 'admin@studyhub.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create sample student user
  const studentPassword = await hashPassword('student123');
  const student = await prisma.user.upsert({
    where: { email: 'student@studyhub.com' },
    update: {},
    create: {
      email: 'student@studyhub.com',
      name: 'Student User',
      password: studentPassword,
      role: 'STUDENT',
    },
  });

  console.log('Seed data created successfully!');
  console.log('Admin user: admin@studyhub.com / admin123');
  console.log('Student user: student@studyhub.com / student123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });