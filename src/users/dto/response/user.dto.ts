import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  name: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  dni: string;
}
