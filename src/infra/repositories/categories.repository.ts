import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmRepositoryImp } from 'src/application/core/base/base_typeorm_repository';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/domain/entities/category.entity';
import { Category } from '../model/category.model';
import { ICategoriesRepository } from 'src/domain/repositories/categories.repository';

export class CategoriesRepositoryImp
  extends BaseTypeOrmRepositoryImp<CategoryEntity>
  implements ICategoriesRepository
{
  constructor(
    @InjectRepository(Category) private model: Repository<CategoryEntity>,
  ) {
    super(model);
  }
}
