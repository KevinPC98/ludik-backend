import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { CodesModule } from './codes/codes.module';

@Module({
  imports: [UsersModule, CodesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
