import BaseEntity from 'src/application/core/base/base_entity';
import { UserEntity } from './users.entity';
import { CategoryEntity } from './category.entity';

export class SubCategoryEntity extends BaseEntity {
  titleAr?: string;
  titleEn?: string;
  slug: string;
  userId?: string;
  categoryId?: string;
  user?: UserEntity; // many to one
  category?: CategoryEntity; // many to one

  constructor(params: Partial<SubCategoryEntity>) {
    super();
    Object.assign(this, params);
  }
}
