import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordDTO {
  @IsNotEmpty()
  @IsString()
  password: string;
}
