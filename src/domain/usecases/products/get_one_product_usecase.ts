import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOneOptionModel } from 'src/application/core/model/option.model';
import { ProductEntity } from 'src/domain/entities/product.entity';
import { IProductRepository } from 'src/domain/repositories/product.repository';

export class GetOneProductUseCase implements IBaseUseCase<ProductEntity> {
  constructor(private repo: IProductRepository) {}

  execute(option: FindOneOptionModel<ProductEntity>): Promise<ProductEntity> {
    return this.repo.findOne(option);
  }
}
