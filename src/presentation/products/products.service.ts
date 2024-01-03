import { BadRequestException, Injectable } from '@nestjs/common';

import { I18nContext, I18nService } from 'nestjs-i18n';
import { CreateProductUseCase } from 'src/domain/usecases/products/create_product_usecase';
import { DeleteOneProductUseCase } from 'src/domain/usecases/products/delete_one_products_usecase';
import { DeleteProductUseCase } from 'src/domain/usecases/products/delete_product_usecase';
import { GetManyProductsUseCase } from 'src/domain/usecases/products/get_many_products.usecase';
import { GetOneProductUseCase } from 'src/domain/usecases/products/get_one_product_usecase';
import { GetProductByIDUseCase } from 'src/domain/usecases/products/get_product_by_id_usecase';
import { GetProductsUseCase } from 'src/domain/usecases/products/get_products_usecase';
import { UpdateProductUseCase } from 'src/domain/usecases/products/update_product_usecase';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from 'src/domain/entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import slugify from 'slugify';
import { CloudinaryService } from 'src/application/common/cloudinary/cloudinary.service';

@Injectable()
export class ProductService {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private getProductByIdUseCase: GetProductByIDUseCase,
    private getProductsUseCase: GetProductsUseCase,
    private getManyProductsUseCase: GetManyProductsUseCase,
    private getOneProductUseCase: GetOneProductUseCase,
    private updateProductUseCase: UpdateProductUseCase,
    private deleteProductUseCase: DeleteProductUseCase,
    private deleteOneProductUseCase: DeleteOneProductUseCase,
    private i18nService: I18nService,
    private cloudianryService: CloudinaryService,
  ) {}

  async createProductService(
    userId: string,
    image: Express.Multer.File,
    createProductDto: CreateProductDto,
  ) {
    if (!image) {
      throw new BadRequestException(
        this.i18nService.t('events.imageRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const imageUrl = await this.cloudianryService.uploadImage(
      image,
      'Products',
    );

    // Generate a product SKU using the name, price, and a random suffix

    const prefix = createProductDto.titleEn.replace(/\s+/g, '-').toLowerCase();
    const suffix = Math.random().toString(36).substr(2, 4).toUpperCase();
    const sku = `${prefix}-${slugify(createProductDto.titleEn)}-${suffix}`;

    const Product = new ProductEntity({
      titleAr: createProductDto.titleAr,
      titleEn: createProductDto.titleEn,
      descriptionAr: createProductDto.descriptionAr,
      descriptionEn: createProductDto.descriptionEn,
      slug: slugify(createProductDto.titleEn),
      price: createProductDto.price,
      quantity: createProductDto.quantity,
      userId: userId,
      categoryId: createProductDto.categoryId,
      subCategoryId: createProductDto.subCategoryId,
      coverImage: imageUrl.url,
      sku: sku,
      user: {
        id: userId,
      },
      category: {
        id: createProductDto.categoryId,
      },
      subCategory: {
        id: createProductDto.subCategoryId,
      },
    });
    return this.createProductUseCase.execute(Product);
  }

  getProductService(limit: string, page: string) {
    return this.getProductsUseCase.execute({
      pagination: {
        limit: !limit ? parseInt(limit) : null,
        page: !page ? parseInt(page) : null,
      },
      relation: {
        user: true,
        category: true,
        subCategory: true,
      },
      select: {
        user: {
          id: true,
          email: true,
          name: true,
        },
        category: {
          id: true,
          titleAr: true,
          titleEn: true,
          imageUrl: true,
        },
        subCategory: {
          id: true,
          titleAr: true,
          titleEn: true,
        },
      },
    });
  }

  getManyProductService(
    limit: string,
    page: string,
    filter: Partial<ProductEntity>,
  ) {
    return this.getManyProductsUseCase.execute({
      filter: filter,
      pagination: {
        limit: !limit ? parseInt(limit) : null,
        page: !page ? parseInt(page) : null,
      },
      relation: {
        user: true,
        category: true,
        subCategory: true,
      },
      select: {
        user: {
          id: true,
          email: true,
          name: true,
        },
        category: {
          id: true,
          titleAr: true,
          titleEn: true,
          imageUrl: true,
        },
        subCategory: {
          id: true,
          titleAr: true,
          titleEn: true,
        },
      },
    });
  }

  async getProductByIdService(id: string): Promise<ProductEntity> {
    if (!id) {
      throw new BadRequestException(
        this.i18nService.t('events.idRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const result = await this.getProductByIdUseCase.execute({
      id: id,
      relation: {
        user: true,
        category: true,
        subCategory: true,
      },
      select: {
        user: {
          id: true,
          email: true,
          name: true,
        },
        category: {
          id: true,
          titleAr: true,
          titleEn: true,
          imageUrl: true,
        },
        subCategory: {
          id: true,
          titleAr: true,
          titleEn: true,
        },
      },
    });

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.noIdProduct', {
          args: { id },
          lang: I18nContext.current().lang,
        }),
      );
    }

    return result;
  }

  async getOneProductService(
    params: Partial<ProductEntity>,
  ): Promise<ProductEntity> {
    const result = await this.getOneProductUseCase.execute({
      params,
      relation: {
        user: true,
        category: true,
        subCategory: true,
      },
      select: {
        user: {
          id: true,
          email: true,
          name: true,
        },
        category: {
          id: true,
          titleAr: true,
          titleEn: true,
          imageUrl: true,
        },
        subCategory: {
          id: true,
          titleAr: true,
          titleEn: true,
        },
      },
    });

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.ProductNotExist', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return result;
  }

  async updateProductService(id: string, updateProductDto: UpdateProductDto) {
    if (!id) {
      throw new BadRequestException(
        this.i18nService.t('events.idRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const result = await this.updateProductUseCase.execute({
      id: id,
      params: updateProductDto,
      relation: {
        user: true,
        category: true,
        subCategory: true,
      },
      select: {
        user: {
          id: true,
          email: true,
          name: true,
        },
        category: {
          id: true,
          titleAr: true,
          titleEn: true,
          imageUrl: true,
        },
        subCategory: {
          id: true,
          titleAr: true,
          titleEn: true,
        },
      },
    });

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.noIdProduct', {
          args: { id },
          lang: I18nContext.current().lang,
        }),
      );
    }

    return result;
  }

  async updateProductImageService(id: string, image: Express.Multer.File) {
    if (!image) {
      throw new BadRequestException(
        this.i18nService.t('events.imageRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const imageUrl = await this.cloudianryService.uploadImage(
      image,
      'category',
    );

    const product = new ProductEntity({
      coverImage: imageUrl.url,
      updatedAt: new Date(Date.now()),
    });

    return this.updateProductUseCase.execute({
      id: id,
      params: product,
      relation: {
        user: true,
        category: true,
        subCategory: true,
      },
      select: {
        user: {
          id: true,
          email: true,
          name: true,
        },
        category: {
          id: true,
          titleAr: true,
          titleEn: true,
          imageUrl: true,
        },
        subCategory: {
          id: true,
          titleAr: true,
          titleEn: true,
        },
      },
    });
  }

  async deleteProductService(id: string): Promise<[boolean, string]> {
    if (!id) {
      throw new BadRequestException(
        this.i18nService.t('events.idRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const result = await this.deleteProductUseCase.execute(id);

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.noIdProduct', {
          args: { id },
          lang: I18nContext.current().lang,
        }),
      );
    }

    return [
      result,
      this.i18nService.t('events.deleteProductSuccessfully', {
        lang: I18nContext.current().lang,
      }),
    ];
  }

  async deleteOneProductService(
    params: Partial<ProductEntity>,
  ): Promise<[boolean, string]> {
    const result = await this.deleteOneProductUseCase.execute(params);

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.ProductNotExist', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return [
      result,
      this.i18nService.t('events.deleteProductSuccessfully', {
        lang: I18nContext.current().lang,
      }),
    ];
  }
}
