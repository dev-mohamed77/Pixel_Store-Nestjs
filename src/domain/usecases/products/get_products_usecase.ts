import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindAllOptionModel } from 'src/application/core/model/option.model';
import { ProductEntity } from 'src/domain/entities/product.entity';
import { IProductRepository } from 'src/domain/repositories/product.repository';

export class GetProductsUseCase
  implements IBaseUseCase<[ProductEntity[], number]>
{
  constructor(private repo: IProductRepository) {}

  execute(
    option: FindAllOptionModel<ProductEntity>,
  ): Promise<[ProductEntity[], number]> {
    return this.repo.findAll(option);
  }
}
