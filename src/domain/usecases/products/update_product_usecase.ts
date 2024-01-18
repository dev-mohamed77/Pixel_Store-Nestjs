import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UpdateOptionModel } from 'src/application/core/model/option_typeorm.model';
import { IProductRepository } from 'src/domain/repositories/product.repository';
import { ProductEntity } from 'src/domain/entities/product.entity';

export class UpdateProductUseCase implements IBaseUseCase<ProductEntity> {
  constructor(private repo: IProductRepository) {}

  execute(param: UpdateOptionModel<ProductEntity>): Promise<ProductEntity> {
    return this.repo.update(param);
  }
}
