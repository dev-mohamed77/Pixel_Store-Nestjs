import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOneByIdOptionModel } from 'src/application/core/model/option.model';
import { ProductEntity } from 'src/domain/entities/product.entity';
import { IProductRepository } from 'src/domain/repositories/product.repository';

export class GetProductByIDUseCase implements IBaseUseCase<ProductEntity> {
  constructor(private repo: IProductRepository) {}

  execute(
    option: FindOneByIdOptionModel<ProductEntity>,
  ): Promise<ProductEntity> {
    return this.repo.findById(option);
  }
}
