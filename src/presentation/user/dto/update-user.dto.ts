import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto {
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
