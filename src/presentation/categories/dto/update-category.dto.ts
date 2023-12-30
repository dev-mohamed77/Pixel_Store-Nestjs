import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  titleAr: string;

  @IsOptional()
  @IsString()
  titleEn: string;

  @IsOptional()
  @IsString()
  imageUrl: string;
}
