import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordLoggedUserDto {
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
