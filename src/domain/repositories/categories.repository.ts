import { BaseTypeOrmRepository } from 'src/application/core/base/base_typeorm_repository';
import { CategoryEntity } from '../entities/category.entity';

export abstract class ICategoriesRepository extends BaseTypeOrmRepository<CategoryEntity> {}
