import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCodeDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  code: string;
}
