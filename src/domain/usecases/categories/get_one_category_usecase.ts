import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOneOptionModel } from 'src/application/core/model/option.model';
import { ICategoriesRepository } from 'src/domain/repositories/categories.repository';
import { CategoryEntity } from 'src/domain/entities/category.entity';

export class GetOneCategoryUseCase implements IBaseUseCase<CategoryEntity> {
  constructor(private repo: ICategoriesRepository) {}

  execute(option: FindOneOptionModel<CategoryEntity>): Promise<CategoryEntity> {
    return this.repo.findOne(option);
  }
}
