import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  titleAr: string;

  @IsNotEmpty()
  @IsString()
  titleEn: string;

  @IsNotEmpty()
  @IsString()
  descriptionAr: string;

  @IsNotEmpty()
  @IsString()
  descriptionEn: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  quantity: number;

  @IsNotEmpty()
  @IsUUID()
  subCategoryId: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
