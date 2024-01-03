import { ProductEntity } from 'src/domain/entities/product.entity';
import { BaseModel } from './base_model';
import { CategoryEntity } from 'src/domain/entities/category.entity';
import { SubCategoryEntity } from 'src/domain/entities/subCategory.entity';
import { UserEntity } from 'src/domain/entities/users.entity';
import { Column, ManyToOne } from 'typeorm';
import { User } from './user.model';
import { SubCategory } from './subCategory.model';
import { Category } from './category.model';

export class Product extends BaseModel implements ProductEntity {
  @Column({ type: 'varchar' })
  titleAr: string;

  @Column({ type: 'varchar' })
  titleEn: string;
  @Column({ type: 'varchar' })
  descriptionAr: string;

  @Column({ type: 'varchar' })
  descriptionEn: string;

  @Column({ type: 'varchar' })
  coverImage: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  sold: number;

  @Column({ type: 'varchar' })
  sku: string;

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  subCategoryId: string;

  @Column({ type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => SubCategory, { onDelete: 'CASCADE' })
  subCategory: SubCategoryEntity;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  category: CategoryEntity;
}
