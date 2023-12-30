import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { CategoryEntity } from 'src/domain/entities/category.entity';
import { ICategoriesRepository } from 'src/domain/repositories/categories.repository';

export class DeleteOneCategoryUseCase implements IBaseUseCase<boolean> {
  constructor(private repo: ICategoriesRepository) {}

  execute(filter: Partial<CategoryEntity>): Promise<boolean> {
    return this.repo.deleteOne(filter);
  }
}
