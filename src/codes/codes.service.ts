import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCodeDto } from './dto/request/create-code.dto';
import { CodeDto } from './dto/response/code.dto';
import { UpdateCodeDto } from './dto/request/update-code.dto';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CodesService {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateCodeDto, idUser: string): Promise<CodeDto> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: idUser,
      },
    });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const code = await this.prismaService.code.create({
      data: {
        ...input,
        user: {
          connect: {
            id: idUser,
          },
        },
      },
    });

    return plainToInstance(CodeDto, code);
  }

  async findOne(id: string): Promise<CodeDto> {
    const code = await this.prismaService.code.findFirst({
      where: {
        id,
      },
    });

    if (!code) {
      throw new NotFoundException('User does not exist');
    }

    return plainToInstance(CodeDto, code);
  }

  async update(id: string, input: UpdateCodeDto): Promise<CodeDto> {
    const code = await this.prismaService.code.update({
      data: {
        ...input,
      },
      where: {
        id,
      },
    });

    return plainToInstance(CodeDto, code);
  }

  async remove(id: string): Promise<CodeDto> {
    const code = await this.prismaService.code.delete({
      where: {
        id,
      },
    });

    return plainToInstance(CodeDto, code);
  }
}
