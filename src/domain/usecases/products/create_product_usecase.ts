import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IProductRepository } from 'src/domain/repositories/product.repository';
import { ProductEntity } from 'src/domain/entities/product.entity';

export class CreateProductUseCase implements IBaseUseCase<ProductEntity> {
  constructor(private repo: IProductRepository) {}

  execute(param: ProductEntity): Promise<ProductEntity> {
    return this.repo.create(param);
  }
}
