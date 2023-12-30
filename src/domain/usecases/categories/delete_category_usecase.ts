import { ICategoriesRepository } from 'src/domain/repositories/categories.repository';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';

export class DeleteCategoryUseCase implements IBaseUseCase<boolean> {
  constructor(private repo: ICategoriesRepository) {}

  execute(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}
