import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ICategoriesRepository } from 'src/domain/repositories/categories.repository';
import { CategoryEntity } from 'src/domain/entities/category.entity';

export class CreateCategoryUseCase implements IBaseUseCase<CategoryEntity> {
  constructor(private repo: ICategoriesRepository) {}

  execute(param: CategoryEntity): Promise<CategoryEntity> {
    return this.repo.create(param);
  }
}
