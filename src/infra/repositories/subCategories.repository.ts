import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmRepositoryImp } from 'src/application/core/base/base_typeorm_repository';
import { SubCategoryEntity } from 'src/domain/entities/subCategory.entity';
import { ISubCategoriesRepository } from 'src/domain/repositories/subCategories.repository';
import { SubCategory } from '../model/subCategory.model';
import { Repository } from 'typeorm';

export class SubCategoriesRepository
  extends BaseTypeOrmRepositoryImp<SubCategoryEntity>
  implements ISubCategoriesRepository
{
  constructor(
    @InjectRepository(SubCategory) private model: Repository<SubCategoryEntity>,
  ) {
    super(model);
  }
}
