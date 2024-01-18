import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindAllOptionModel } from 'src/application/core/model/option.model';
import { SubCategoryEntity } from 'src/domain/entities/subCategory.entity';
import { ISubCategoriesRepository } from 'src/domain/repositories/subCategories.repository';

export class GetSubCategoriesUseCase
  implements IBaseUseCase<[SubCategoryEntity[], number]>
{
  constructor(private repo: ISubCategoriesRepository) {}

  execute(
    option: FindAllOptionModel<SubCategoryEntity>,
  ): Promise<[SubCategoryEntity[], number]> {
    return this.repo.findAll(option);
  }
}
