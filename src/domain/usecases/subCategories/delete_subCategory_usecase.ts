import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISubCategoriesRepository } from 'src/domain/repositories/subCategories.repository';

export class DeleteSubCategoryUseCase implements IBaseUseCase<boolean> {
  constructor(private repo: ISubCategoriesRepository) {}

  execute(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}
