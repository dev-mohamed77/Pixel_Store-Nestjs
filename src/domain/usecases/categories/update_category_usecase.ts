import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UpdateOptionModel } from 'src/application/core/model/option_typeorm.model';
import { ICategoriesRepository } from 'src/domain/repositories/categories.repository';
import { CategoryEntity } from 'src/domain/entities/category.entity';

export class UpdateCategoryUseCase implements IBaseUseCase<CategoryEntity> {
  constructor(private repo: ICategoriesRepository) {}

  execute(param: UpdateOptionModel<CategoryEntity>): Promise<CategoryEntity> {
    return this.repo.update(param);
  }
}
