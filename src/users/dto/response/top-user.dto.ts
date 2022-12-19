import { PartialType, PickType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { CreateUserDto } from '../request/create-user.dto';

export class TopUserDto extends PartialType(CreateUserDto) {
  @Expose()
  id: string;
}
