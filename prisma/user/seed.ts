import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { datatype, internet, name } from 'faker';
import { hashSync } from 'bcryptjs';

//Crear un seed que llene la tabla con 100 registros de usuarios en distintas fechas de creación (created_at).

const prisma = new PrismaClient();

async function main() {
  Logger.log('seeding...');

  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        name: name.firstName(),
        lastName: name.lastName(),
        dni: datatype.uuid(),
        email: internet.email(),
        createdAt: datatype.datetime(),
        password: hashSync(internet.password(), 10),
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
