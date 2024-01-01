import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UpdateOptionModel } from 'src/application/core/model/option_typeorm.model';
import { SubCategoryEntity } from 'src/domain/entities/subCategory.entity';
import { ISubCategoriesRepository } from 'src/domain/repositories/subCategories.repository';

export class UpdateSubCategoryUseCase
  implements IBaseUseCase<SubCategoryEntity>
{
  constructor(private repo: ISubCategoriesRepository) {}

  execute(
    param: UpdateOptionModel<SubCategoryEntity>,
  ): Promise<SubCategoryEntity> {
    return this.repo.update(param);
  }
}
