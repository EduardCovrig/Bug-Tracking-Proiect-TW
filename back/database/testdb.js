import 'dotenv/config'; // încarcă variabilele din .env
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Creează un user nou
  const user = await prisma.user.create({
    data: {
      username: 'eduard',
      email: 'eduard@test.com',
      password: '1234',
    },
  });

  console.log('User creat:', user);

  const users = await prisma.user.findMany();
  console.log('Toți userii:', users);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
