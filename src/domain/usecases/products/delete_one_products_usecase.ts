import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IProductRepository } from 'src/domain/repositories/product.repository';
import { ProductEntity } from 'src/domain/entities/product.entity';

export class DeleteOneProductUseCase implements IBaseUseCase<boolean> {
  constructor(private repo: IProductRepository) {}

  execute(filter: Partial<ProductEntity>): Promise<boolean> {
    return this.repo.deleteOne(filter);
  }
}
