import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateLoggedUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsPhoneNumber('EG')
  phone: string;

  @IsOptional()
  @IsString()
  country: string;
}
