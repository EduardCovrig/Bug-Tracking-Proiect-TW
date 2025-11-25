import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import 'dotenv/config'; // incarcam .env (DATABASE_URL, JWT_SECRET)

// Aici sunt niste date de test pentru baza de date, creand cateva date pentru fiecare tabela.

const prisma = new PrismaClient();
const saltRounds = 10; //asa sunt peste tot in proiect

async function main() {
  console.log('--- Starting Seeding Process ---');

  // --- STEP 0: Sterge datele vechi ---
  await prisma.projectMember.deleteMany({});
  await prisma.bug.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Old data cleared.');

  // --- STEP 1: Creeaza Utilizatori ---
  const eduardPassword = await bcrypt.hash('eduard123', saltRounds);
  const arthurPassword = await bcrypt.hash('arthur123', saltRounds);

  const eduard = await prisma.user.create({
    data: { username: 'Covrig Eduard', email: 'eduard@test.com', password: eduardPassword }
  });

  const arthur = await prisma.user.create({
    data: { username: 'Constantin Arthur', email: 'arthur@test.com', password: arthurPassword }
  });

  const dualCoreUser = await prisma.user.create({
    data: { username: 'Dual-Core', email: 'dualcore@test.com', password: arthurPassword }
  });

  console.log('3 users created.');

  // --- STEP 2: Creeaza Proiecte ---
  const mainProject = await prisma.project.create({
    data: {
      name: 'Bug Tracker App',
      description: 'Platforma pentru management bug-uri',
      repository: 'https://github.com/bug-tracker',
      created_by: eduard.id_user
    }
  });

  const dualProject = await prisma.project.create({
    data: {
      name: 'Dual-Core Project',
      description: 'Proiect secundar cu teste',
      repository: 'https://github.com/dual-core',
      created_by: dualCoreUser.id_user
    }
  });

  console.log('2 projects created.');

  // --- STEP 3: Adauga Membri in Proiecte ---
  await prisma.projectMember.createMany({
    data: [
      { id_user: eduard.id_user, id_project: mainProject.id_project, role: 'PM' },
      { id_user: arthur.id_user, id_project: mainProject.id_project, role: 'TST' },
      { id_user: dualCoreUser.id_user, id_project: dualProject.id_project, role: 'PM' }
    ]
  });

  console.log('Project memberships created.');

  // --- STEP 4: Creeaza Bug-uri ---
  await prisma.bug.createMany({
    data: [
      {
        id_project: mainProject.id_project,
        reported_by: arthur.id_user,
        assigned_to: eduard.id_user,
        severity: 'critical',
        priority: 'high',
        description: 'Logarea esueaza pe mobil.',
        commit_link: 'n/a',
        status: 'in_progress'
      },
      {
        id_project: mainProject.id_project,
        reported_by: eduard.id_user,
        severity: 'medium',
        priority: 'low',
        description: 'Erori la text input.',
        commit_link: 'n/a',
        status: 'open'
      },
      {
        id_project: dualProject.id_project,
        reported_by: arthur.id_user,
        assigned_to: dualCoreUser.id_user,
        severity: 'low',
        priority: 'medium',
        description: 'Imagine lipsa in dashboard.',
        commit_link: 'n/a',
        status: 'resolved'
      }
    ]
  });

  console.log('3 bugs created.');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('--- Seeding finished successfully ---');
  });
