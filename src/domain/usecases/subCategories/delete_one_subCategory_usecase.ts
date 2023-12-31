import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { SubCategoryEntity } from 'src/domain/entities/subCategory.entity';
import { ISubCategoriesRepository } from 'src/domain/repositories/subCategories.repository';

export class DeleteOneSubCategoryUseCase implements IBaseUseCase<boolean> {
  constructor(private repo: ISubCategoriesRepository) {}

  execute(filter: Partial<SubCategoryEntity>): Promise<boolean> {
    return this.repo.deleteOne(filter);
  }
}
