import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { RolesApp } from 'src/application/config/enum/roles_enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber('EG')
  phone: string;

  @IsNotEmpty()
  @IsEnum(RolesApp)
  role: RolesApp;
}
