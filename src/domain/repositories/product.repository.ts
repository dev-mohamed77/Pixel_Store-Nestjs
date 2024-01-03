import IBaseRepository from 'src/application/core/base/base_repository';
import { ProductEntity } from 'src/domain/entities/product.entity';

export abstract class IProductRepository extends IBaseRepository<ProductEntity> {}
