import { CategoryEntity } from 'src/domain/entities/category.entity';
import { BaseModel } from './base_model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.model';
import { UserEntity } from 'src/domain/entities/users.entity';

@Entity()
export class Category extends BaseModel implements CategoryEntity {
  @Column({ type: 'varchar' })
  titleAr: string;

  @Column({ type: 'varchar' })
  titleEn: string;

  @Column({ type: 'varchar' })
  categorySlug: string;

  @Column({ type: 'varchar' })
  imageUrl: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;
}
