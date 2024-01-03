import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/infra/model/product.model';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CloudinaryModule } from 'src/application/common/cloudinary/cloudinary.module';
import { UserModule } from '../user/user.module';
import { ProductRepositoryImp } from 'src/infra/repositories/products.repository';
import { CreateProductUseCase } from 'src/domain/usecases/products/create_product_usecase';
import { IProductRepository } from 'src/domain/repositories/product.repository';
import { GetManyProductsUseCase } from 'src/domain/usecases/products/get_many_products.usecase';
import { GetProductByIDUseCase } from 'src/domain/usecases/products/get_product_by_id_usecase';
import { GetProductsUseCase } from 'src/domain/usecases/products/get_products_usecase';
import { GetOneProductUseCase } from 'src/domain/usecases/products/get_one_product_usecase';
import { UpdateProductUseCase } from 'src/domain/usecases/products/update_product_usecase';
import { DeleteProductUseCase } from 'src/domain/usecases/products/delete_product_usecase';
import { DeleteOneProductUseCase } from 'src/domain/usecases/products/delete_one_products_usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    MulterModule.register({
      storage: diskStorage({
        filename(req, file, callback) {
          callback(null, `${Date.now()} + ${file.originalname}`);
        },
      }),
    }),
    CloudinaryModule,
    UserModule,
  ],
  controllers: [ProductsController],
  providers: [
    ProductService,
    {
      provide: ProductRepositoryImp,
      useClass: ProductRepositoryImp,
    },
    {
      provide: CreateProductUseCase,
      useFactory: (repo: IProductRepository) => {
        return new CreateProductUseCase(repo);
      },
      inject: [ProductRepositoryImp],
    },
    {
      provide: GetManyProductsUseCase,
      useFactory: (repo: IProductRepository) => {
        return new GetManyProductsUseCase(repo);
      },
      inject: [ProductRepositoryImp],
    },
    {
      provide: GetProductByIDUseCase,
      useFactory: (repo: IProductRepository) => {
        return new GetProductByIDUseCase(repo);
      },
      inject: [ProductRepositoryImp],
    },
    {
      provide: GetProductsUseCase,
      useFactory: (repo: IProductRepository) => {
        return new GetProductsUseCase(repo);
      },
      inject: [ProductRepositoryImp],
    },
    {
      provide: GetOneProductUseCase,
      useFactory: (repo: IProductRepository) => {
        return new GetOneProductUseCase(repo);
      },
      inject: [ProductRepositoryImp],
    },
    {
      provide: UpdateProductUseCase,
      useFactory: (repo: IProductRepository) => {
        return new UpdateProductUseCase(repo);
      },
      inject: [ProductRepositoryImp],
    },
    {
      provide: DeleteProductUseCase,
      useFactory: (repo: IProductRepository) => {
        return new DeleteProductUseCase(repo);
      },
      inject: [ProductRepositoryImp],
    },
    {
      provide: DeleteOneProductUseCase,
      useFactory: (repo: IProductRepository) => {
        return new DeleteOneProductUseCase(repo);
      },
      inject: [ProductRepositoryImp],
    },
  ],
})
export class ProductsModule {}
