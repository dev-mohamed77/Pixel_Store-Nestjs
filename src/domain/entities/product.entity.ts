import BaseEntity from 'src/application/core/base/base_entity';
import { UserEntity } from './users.entity';
import { SubCategoryEntity } from './subCategory.entity';
import { CategoryEntity } from './category.entity';

export class ProductEntity extends BaseEntity {
  titleAr?: string;
  titleEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  coverImage?: string;
  slug?: string;
  price?: number;
  quantity?: number;
  sold?: number;
  sku?: string;
  isAvailable?: boolean;
  userId?: string; // uuid
  subCategoryId?: string; // uuid
  categoryId?: string; // uuid
  user?: UserEntity; // Many to one
  subCategory?: SubCategoryEntity; // many to one
  category?: CategoryEntity; // Many to one

  constructor(params: Partial<ProductEntity>) {
    super();
    Object.assign(this, params);
  }
}
