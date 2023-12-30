import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindAllOptionModel } from 'src/application/core/model/option.model';
import { CategoryEntity } from 'src/domain/entities/category.entity';
import { ICategoriesRepository } from 'src/domain/repositories/categories.repository';

export class GetCategoriesUseCase
  implements IBaseUseCase<[CategoryEntity[], number]>
{
  constructor(private repo: ICategoriesRepository) {}

  execute(
    option: FindAllOptionModel<CategoryEntity>,
  ): Promise<[CategoryEntity[], number]> {
    return this.repo.findAll(option);
  }
}
