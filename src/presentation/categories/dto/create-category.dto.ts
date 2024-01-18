import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  titleAr: string;

  @IsNotEmpty()
  @IsString()
  titleEn: string;
}
