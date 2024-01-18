import { IsOptional, IsString } from 'class-validator';

export class ProductBySubCategoryDto {
  @IsOptional()
  @IsString()
  titleAr: string;

  @IsOptional()
  @IsString()
  titleEn: string;
}
