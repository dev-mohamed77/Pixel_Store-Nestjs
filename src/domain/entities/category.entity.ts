import BaseEntity from 'src/application/core/base/base_entity';
import { UserEntity } from './users.entity';

export class CategoryEntity extends BaseEntity {
  titleAr?: string;
  titleEn?: string;
  categorySlug?: string;
  imageUrl?: string;
  user?: UserEntity;

  constructor(params: Partial<CategoryEntity>) {
    super();
    Object.assign(this, params);
  }
}
