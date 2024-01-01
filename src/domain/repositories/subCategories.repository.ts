import IBaseRepository from 'src/application/core/base/base_repository';
import { SubCategoryEntity } from '../entities/subCategory.entity';

export abstract class ISubCategoriesRepository extends IBaseRepository<SubCategoryEntity> {}
