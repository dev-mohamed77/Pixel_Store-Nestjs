import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { SubCategoryEntity } from 'src/domain/entities/subCategory.entity';
import { ISubCategoriesRepository } from 'src/domain/repositories/subCategories.repository';

export class CreateSubCategoryUseCase
  implements IBaseUseCase<SubCategoryEntity>
{
  constructor(private repo: ISubCategoriesRepository) {}

  execute(param: SubCategoryEntity): Promise<SubCategoryEntity> {
    return this.repo.create(param);
  }
}
