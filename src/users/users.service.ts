import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserDto } from './dto/response/user.dto';
import { hashSync } from 'bcryptjs';
import { TopUserDto } from './dto/response/top-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async create(input: CreateUserDto): Promise<UserDto> {
    const { password, ...data } = input;
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: hashSync(password, 10),
      },
    });

    return plainToInstance(UserDto, user);
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });

    return plainToInstance(UserDto, user);
  }

  async update(id: string, input: UpdateUserDto): Promise<UserDto> {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...input,
      },
    });

    return plainToInstance(UserDto, user);
  }

  async remove(id: string): Promise<UserDto> {
    const user = await this.prismaService.user.delete({
      where: {
        id,
      },
    });

    return plainToInstance(UserDto, user);
  }

  // Obtener los usuarios que ingresaron mayor cantidad de códigos (devolver id, name, dni)
  async topUser(): Promise<TopUserDto[]> {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        dni: true /*
        _count: {
          select: {
            code: true,
          },
        },*/,
      },
      orderBy: {
        code: {
          _count: 'desc',
        },
      },
      take: 5,
    });

    return plainToInstance(TopUserDto, users);
  }

  async sendEmail(): Promise<string> {
    const user = await this.prismaService.user.findFirst({
      select: {
        id: true,
        name: true,
        dni: true,
        code: true,
        _count: {
          select: {
            code: true,
          },
        },
      },
      orderBy: {
        code: {
          _count: 'desc',
        },
      },
    });

    console.log(user);

    let codes = '';

    for (let i = 0; i < user.code.length; i++) {
      codes += '■ ' + user.code[i].code + '\n';
    }

    return `Gracias por participar, eres el usuario con la mayor cantidad de códigos ingresados ya
    que cuentas con ${user._count.code} códigos, los que son:

    ${codes}

    `;
  }
}
