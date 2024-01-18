import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from 'src/infra/model/subCategory.model';
import { SubCategoriesRepositoryImp } from 'src/infra/repositories/subCategories.repository';
import { CreateSubCategoryUseCase } from 'src/domain/usecases/subCategories/create_subCategory_usecase';
import { ISubCategoriesRepository } from 'src/domain/repositories/subCategories.repository';
import { GetManySubCategoriesUseCase } from 'src/domain/usecases/subCategories/get_many_subCategories.usecase';
import { GetSubCategoryByIDUseCase } from 'src/domain/usecases/subCategories/get_subCategory_by_id_usecase';
import { GetSubCategoriesUseCase } from 'src/domain/usecases/subCategories/get_subCategories_usecase';
import { GetOneSubCategoryUseCase } from 'src/domain/usecases/subCategories/get_one_subCategory_usecase';
import { UpdateSubCategoryUseCase } from 'src/domain/usecases/subCategories/update_subCategory_usecase';
import { DeleteSubCategoryUseCase } from 'src/domain/usecases/subCategories/delete_subCategory_usecase';
import { DeleteOneSubCategoryUseCase } from 'src/domain/usecases/subCategories/delete_one_subCategory_usecase';
import { SubCategoriesByCategoryController } from './sub-categories-by-category.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory]), UserModule],
  controllers: [SubCategoriesController, SubCategoriesByCategoryController],
  providers: [
    SubCategoriesService,
    {
      provide: SubCategoriesRepositoryImp,
      useClass: SubCategoriesRepositoryImp,
    },
    {
      provide: CreateSubCategoryUseCase,
      useFactory: (repo: ISubCategoriesRepository) => {
        return new CreateSubCategoryUseCase(repo);
      },
      inject: [SubCategoriesRepositoryImp],
    },
    {
      provide: GetManySubCategoriesUseCase,
      useFactory: (repo: ISubCategoriesRepository) => {
        return new GetManySubCategoriesUseCase(repo);
      },
      inject: [SubCategoriesRepositoryImp],
    },
    {
      provide: GetSubCategoryByIDUseCase,
      useFactory: (repo: ISubCategoriesRepository) => {
        return new GetSubCategoryByIDUseCase(repo);
      },
      inject: [SubCategoriesRepositoryImp],
    },
    {
      provide: GetSubCategoriesUseCase,
      useFactory: (repo: ISubCategoriesRepository) => {
        return new GetSubCategoriesUseCase(repo);
      },
      inject: [SubCategoriesRepositoryImp],
    },
    {
      provide: GetOneSubCategoryUseCase,
      useFactory: (repo: ISubCategoriesRepository) => {
        return new GetOneSubCategoryUseCase(repo);
      },
      inject: [SubCategoriesRepositoryImp],
    },
    {
      provide: UpdateSubCategoryUseCase,
      useFactory: (repo: ISubCategoriesRepository) => {
        return new UpdateSubCategoryUseCase(repo);
      },
      inject: [SubCategoriesRepositoryImp],
    },
    {
      provide: DeleteSubCategoryUseCase,
      useFactory: (repo: ISubCategoriesRepository) => {
        return new DeleteSubCategoryUseCase(repo);
      },
      inject: [SubCategoriesRepositoryImp],
    },
    {
      provide: DeleteOneSubCategoryUseCase,
      useFactory: (repo: ISubCategoriesRepository) => {
        return new DeleteOneSubCategoryUseCase(repo);
      },
      inject: [SubCategoriesRepositoryImp],
    },
  ],
})
export class SubCategoriesModule {}
