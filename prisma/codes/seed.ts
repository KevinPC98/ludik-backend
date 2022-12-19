import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { datatype, internet, lorem, name } from 'faker';

const prisma = new PrismaClient();

// Crear un seed que llene la tabla con 1000 registros de codigos aleatorios en distintos usuarios.

async function main() {
  Logger.log('seeding...');

  const users = await prisma.user.findMany({});

  for (let i = 0; i < 20; i++) {
    const random = Math.floor(Math.random() * users.length);
    await prisma.code.create({
      data: {
        code: lorem.text(),
        user: {
          connect: {
            id: users[random].id,
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    Logger.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
