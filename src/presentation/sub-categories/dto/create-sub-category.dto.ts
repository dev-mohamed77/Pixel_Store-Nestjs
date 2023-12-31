import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  titleAr: string;

  @IsNotEmpty()
  @IsString()
  titleEn: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
