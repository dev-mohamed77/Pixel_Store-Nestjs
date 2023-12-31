import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOneOptionModel } from 'src/application/core/model/option.model';
import { SubCategoryEntity } from 'src/domain/entities/subCategory.entity';
import { ISubCategoriesRepository } from 'src/domain/repositories/subCategories.repository';

export class GetOneSubCategoryUseCase
  implements IBaseUseCase<SubCategoryEntity>
{
  constructor(private repo: ISubCategoriesRepository) {}

  execute(
    option: FindOneOptionModel<SubCategoryEntity>,
  ): Promise<SubCategoryEntity> {
    return this.repo.findOne(option);
  }
}
