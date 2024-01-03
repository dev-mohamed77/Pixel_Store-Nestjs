import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmRepositoryImp } from 'src/application/core/base/base_typeorm_repository';
import { IProductRepository } from 'src/domain/repositories/product.repository';
import { Product } from '../model/product.model';
import { ProductEntity } from 'src/domain/entities/product.entity';
import { Repository } from 'typeorm/repository/Repository';

export class ProductRepositoryImp
  extends BaseTypeOrmRepositoryImp<ProductEntity>
  implements IProductRepository
{
  constructor(
    @InjectRepository(Product) private model: Repository<ProductEntity>,
  ) {
    super(model);
  }
}
