import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import 'dotenv/config'; // Incarca DATABASE_URL si JWT_SECRET

const prisma = new PrismaClient();
const saltRounds = 10;

async function main() {
  console.log('--- Starting Seeding Process ---');

  // 1. --- HASHING PAROLE ---
  const hashedPassword = await bcrypt.hash('password123', saltRounds);
  const tstPassword = await bcrypt.hash('tester123', saltRounds);
  
  // Sterge datele vechi
  await prisma.projectMember.deleteMany({});
  await prisma.bug.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Cleaned up previous data.');

  // 2. --- CREEAZA UTILIZATORI ---
  // PM: Project Manager (Creatorul proiectului principal)
  const pmEduard = await prisma.user.create({
    data: {
      username: 'Covrig Eduard',
      email: 'eduard@pm.com',
      password: hashedPassword,
    },
  });

  // TST: Tester (Membru al proiectului principal)
  const tstArthur = await prisma.user.create({
    data: {
      username: 'Constantin Arthur',
      email: 'arthur@tst.com',
      password: tstPassword,
    },
  });

  // User simplu (Creatorul proiectului secundar)
  const dualCore = await prisma.user.create({
    data: {
      username: 'DualCore Test',
      email: 'dualcore@test.com',
      password: tstPassword,
    },
  });
  
  console.log('3 Users created.');

  // 3. --- CREEAZA PROIECTE ---
  const projectApp = await prisma.project.create({
    data: {
      name: 'Bug Tracker App',
      description: 'Platforma de management a bug-urilor.',
      repository: 'https://github.com/bug-tracker',
      created_by: pmEduard.id_user, // Eduard este Creatorul
    },
  });
  
  const projectLegacy = await prisma.project.create({
    data: {
      name: 'Legacy System',
      description: 'Sistem vechi, plin de erori.',
      repository: 'https://github.com/legacy',
      created_by: dualCore.id_user, // DualCore este Creatorul
    },
  });
  
  console.log('2 Projects created.');

  // 4. --- ADAUGARE MEMBRI (ROL) ---
  
  // Eduard (Creator) este setat explicit ca PM in proiectul sau
  await prisma.projectMember.create({
    data: {
      id_user: pmEduard.id_user,
      id_project: projectApp.id_project,
      role: 'PM',
    },
  });
  
  // Arthur este setat ca Tester (TST)
  await prisma.projectMember.create({
    data: {
      id_user: tstArthur.id_user,
      id_project: projectApp.id_project,
      role: 'TST',
    },
  });

  console.log('Memberships created.');

  // 5. --- CREEAZA BUG-URI ---
  
  // Bug 1: Raportat de Arthur, Alocat lui Eduard (PM)
  await prisma.bug.create({
    data: {
      id_project: projectApp.id_project,
      reported_by: tstArthur.id_user,
      assigned_to: pmEduard.id_user, // Bug alocat PM-ului
      severity: 'critical',
      priority: 'high',
      description: 'Logarea esueaza pe mobil.',
      commit_link: 'n/a',
      status: 'in_progress',
    },
  });

  // Bug 2: Raportat de Eduard (PM), Niciun asignat
  await prisma.bug.create({
    data: {
      id_project: projectApp.id_project,
      reported_by: pmEduard.id_user,
      severity: 'medium',
      priority: 'low',
      description: 'Erori de scriere la text.',
      commit_link: 'n/a',
      status: 'open',
    },
  });
  
  // Bug 3: Bug pentru Legacy System, raportat de Arthur (TST)
  await prisma.bug.create({
    data: {
      id_project: projectLegacy.id_project,
      reported_by: tstArthur.id_user,
      severity: 'low',
      priority: 'low',
      description: 'O imagine nu se incarca.',
      commit_link: 'n/a',
      status: 'resolved',
    },
  });

  console.log('3 Bugs created.');
  
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('--- Seeding finished successfully. ---');
  });