import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOneByIdOptionModel } from 'src/application/core/model/option.model';
import { SubCategoryEntity } from 'src/domain/entities/subCategory.entity';
import { ISubCategoriesRepository } from 'src/domain/repositories/subCategories.repository';

export class GetSubCategoryByIDUseCase
  implements IBaseUseCase<SubCategoryEntity>
{
  constructor(private repo: ISubCategoriesRepository) {}

  execute(
    option: FindOneByIdOptionModel<SubCategoryEntity>,
  ): Promise<SubCategoryEntity> {
    return this.repo.findById(option);
  }
}
