import { IsOptional, IsString } from 'class-validator';

export class UpdateSubCategoryDto {
  @IsOptional()
  @IsString()
  titleAr: string;

  @IsOptional()
  @IsString()
  titleEn: string;
}
