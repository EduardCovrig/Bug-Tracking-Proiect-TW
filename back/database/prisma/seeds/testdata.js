//DO npx prisma migrate reset before running

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const eduard = await prisma.user.create({
    data: {
      username: 'eduard',
      email: 'eduard@example.com',
      password: '1234',
    },
  });

  const arthur = await prisma.user.create({
    data: {
      username: 'arthur',
      email: 'arthur@example.com',
      password: 'abcd',
    },
  });

  const maria = await prisma.user.create({
    data: {
      username: 'maria',
      email: 'maria@example.com',
      password: 'pass',
    },
  });

  const bugTracker = await prisma.project.create({
    data: {
      name: 'BugTracker',
      description: 'Sistem de gestionare bug-uri',
      repository: 'https://github.com/eduard/bugtracker',
      created_by: eduard.id_user,
      members: {
        create: [
          { id_user: eduard.id_user, role: 'PM' },
          { id_user: arthur.id_user, role: 'TST' },
        ],
      },
    },
  });

  const mobileApp = await prisma.project.create({
    data: {
      name: 'MobileApp',
      description: 'Aplicație mobilă demo',
      repository: 'https://github.com/maria/mobileapp',
      created_by: maria.id_user,
      members: {
        create: [{ id_user: maria.id_user, role: 'PM' }],
      },
    },
  });

  await prisma.bug.createMany({
    data: [
      {
        id_project: bugTracker.id_project,
        reported_by: arthur.id_user,
        assigned_to: eduard.id_user,
        severity: 'high',
        priority: 'high',
        description: 'Login page fails when password is empty',
        commit_link: 'https://github.com/eduard/bugtracker/commit/abcd1234',
        status: 'open',
      },
      {
        id_project: bugTracker.id_project,
        reported_by: eduard.id_user,
        assigned_to: arthur.id_user,
        severity: 'medium',
        priority: 'low',
        description: 'Button color not following theme',
        commit_link: 'https://github.com/eduard/bugtracker/commit/efgh5678',
        status: 'in_progress',
      },
      {
        id_project: mobileApp.id_project,
        reported_by: maria.id_user,
        assigned_to: null,
        severity: 'critical',
        priority: 'high',
        description: 'Crash on startup iOS 17',
        commit_link: 'https://github.com/maria/mobileapp/commit/ijkl9999',
        status: 'open',
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
