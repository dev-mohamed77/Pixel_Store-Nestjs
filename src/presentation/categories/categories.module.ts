import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/infra/model/category.model';
import { CategoriesRepositoryImp } from 'src/infra/repositories/categories.repository';
import { ICategoriesRepository } from 'src/domain/repositories/categories.repository';
import { CreateCategoryUseCase } from 'src/domain/usecases/categories/create_category_usecase';
import { GetManyCategoriesUseCase } from 'src/domain/usecases/categories/get_many_categories.usecase';
import { GetCategoryByIDUseCase } from 'src/domain/usecases/categories/get_category_by_id_usecase';
import { GetCategoriesUseCase } from 'src/domain/usecases/categories/get_categories_usecase';
import { GetOneCategoryUseCase } from 'src/domain/usecases/categories/get_one_category_usecase';
import { UpdateCategoryUseCase } from 'src/domain/usecases/categories/update_category_usecase';
import { DeleteCategoryUseCase } from 'src/domain/usecases/categories/delete_category_usecase';
import { DeleteOneCategoryUseCase } from 'src/domain/usecases/categories/delete_one_category_usecase';
import { CloudinaryService } from 'src/application/common/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CloudinaryService,
    {
      provide: CategoriesRepositoryImp,
      useClass: CategoriesRepositoryImp,
    },
    {
      provide: CreateCategoryUseCase,
      useFactory: (repo: ICategoriesRepository) => {
        return new CreateCategoryUseCase(repo);
      },
      inject: [CategoriesRepositoryImp],
    },
    {
      provide: GetManyCategoriesUseCase,
      useFactory: (repo: ICategoriesRepository) => {
        return new GetManyCategoriesUseCase(repo);
      },
      inject: [CategoriesRepositoryImp],
    },
    {
      provide: GetCategoryByIDUseCase,
      useFactory: (repo: ICategoriesRepository) => {
        return new GetCategoryByIDUseCase(repo);
      },
      inject: [CategoriesRepositoryImp],
    },
    {
      provide: GetCategoriesUseCase,
      useFactory: (repo: ICategoriesRepository) => {
        return new GetCategoriesUseCase(repo);
      },
      inject: [CategoriesRepositoryImp],
    },
    {
      provide: GetOneCategoryUseCase,
      useFactory: (repo: ICategoriesRepository) => {
        return new GetOneCategoryUseCase(repo);
      },
      inject: [CategoriesRepositoryImp],
    },
    {
      provide: UpdateCategoryUseCase,
      useFactory: (repo: ICategoriesRepository) => {
        return new UpdateCategoryUseCase(repo);
      },
      inject: [CategoriesRepositoryImp],
    },
    {
      provide: DeleteCategoryUseCase,
      useFactory: (repo: ICategoriesRepository) => {
        return new DeleteCategoryUseCase(repo);
      },
      inject: [CategoriesRepositoryImp],
    },
    {
      provide: DeleteOneCategoryUseCase,
      useFactory: (repo: ICategoriesRepository) => {
        return new DeleteOneCategoryUseCase(repo);
      },
      inject: [CategoriesRepositoryImp],
    },
  ],
})
export class CategoriesModule {}
