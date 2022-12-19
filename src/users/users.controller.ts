import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserDto } from './dto/response/user.dto';
import { TopUserDto } from './dto/response/top-user.dto';
import { plainToInstance } from 'class-transformer';

//CRUD (create, read, update y delete) de users (campos: id, name, lastname, dni, email, password, created_at, updated_at)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.remove(id);
  }

  @Get()
  topUser(): Promise<TopUserDto[]> {
    return this.usersService.topUser();
  }

  //Crear un endpoint para enviar un correo al usuario con la mayor cantidad de códigos.
  @Post('send')
  sendEnail(): Promise<string> {
    return this.usersService.sendEmail();
  }
}
