import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserDto } from './dto/response/user.dto';
import { hashSync } from 'bcryptjs';

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
}