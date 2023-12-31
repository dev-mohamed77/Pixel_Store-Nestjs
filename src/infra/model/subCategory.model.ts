import { Column, ManyToOne } from 'typeorm';
import { BaseModel } from './base_model';
import { User } from './user.model';
import { UserEntity } from 'src/domain/entities/users.entity';
import { Category } from './category.model';
import { CategoryEntity } from 'src/domain/entities/category.entity';

export class SubCategory extends BaseModel {
  @Column({ type: 'varchar' })
  titleAr: string;

  @Column({ type: 'varchar' })
  titleEn: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  category: CategoryEntity;
}
