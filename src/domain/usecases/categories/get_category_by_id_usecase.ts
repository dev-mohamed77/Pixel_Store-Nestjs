import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOneByIdOptionModel } from 'src/application/core/model/option.model';
import { CategoryEntity } from 'src/domain/entities/category.entity';
import { ICategoriesRepository } from 'src/domain/repositories/categories.repository';

export class GetCategoryByIDUseCase implements IBaseUseCase<CategoryEntity> {
  constructor(private repo: ICategoriesRepository) {}

  execute(
    option: FindOneByIdOptionModel<CategoryEntity>,
  ): Promise<CategoryEntity> {
    return this.repo.findById(option);
  }
}
