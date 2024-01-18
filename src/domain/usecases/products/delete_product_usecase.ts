import { IProductRepository } from 'src/domain/repositories/product.repository';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';

export class DeleteProductUseCase implements IBaseUseCase<boolean> {
  constructor(private repo: IProductRepository) {}

  execute(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}
