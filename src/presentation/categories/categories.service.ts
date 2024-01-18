import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { DeleteOneCategoryUseCase } from 'src/domain/usecases/categories/delete_one_category_usecase';
import { DeleteCategoryUseCase } from 'src/domain/usecases/categories/delete_category_usecase';
import { UpdateCategoryUseCase } from 'src/domain/usecases/categories/update_category_usecase';
import { GetOneCategoryUseCase } from 'src/domain/usecases/categories/get_one_category_usecase';
import { GetManyCategoriesUseCase } from 'src/domain/usecases/categories/get_many_categories.usecase';
import { GetCategoriesUseCase } from 'src/domain/usecases/categories/get_categories_usecase';
import { GetCategoryByIDUseCase } from 'src/domain/usecases/categories/get_category_by_id_usecase';
import { CreateCategoryUseCase } from 'src/domain/usecases/categories/create_category_usecase';
import { CategoryEntity } from 'src/domain/entities/category.entity';
import slugify from 'slugify';
import { CloudinaryService } from 'src/application/common/cloudinary/cloudinary.service';

@Injectable()
export class CategoriesService {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private getCategoryByIdUseCase: GetCategoryByIDUseCase,
    private getCategoriesUseCase: GetCategoriesUseCase,
    private getManyCategoriesUseCase: GetManyCategoriesUseCase,
    private getOneCategoryUseCase: GetOneCategoryUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
    private deleteOneCategoryUseCase: DeleteOneCategoryUseCase,
    private i18nService: I18nService,
    private cloudianryService: CloudinaryService,
  ) {}

  async createCategoryService(
    createCategoryDto: CreateCategoryDto,
    image: Express.Multer.File,
    userId: string,
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
      'category',
    );

    const category = new CategoryEntity({
      titleAr: createCategoryDto.titleAr,
      titleEn: createCategoryDto.titleEn,
      imageUrl: imageUrl.url,
      categorySlug: slugify(createCategoryDto.titleEn),
      user: {
        id: userId,
      },
    });
    return this.createCategoryUseCase.execute(category);
  }

  getCategoriesService(limit: string, page: string) {
    return this.getCategoriesUseCase.execute({
      pagination: {
        limit: !limit ? parseInt(limit) : null,
        page: !page ? parseInt(page) : null,
      },
      relation: {
        user: true,
      },
      select: {
        user: {
          name: true,
          email: true,
          role: true,
        },
      },
    });
  }

  getManyCategoriesService(
    limit: string,
    page: string,
    filter: Partial<CategoryEntity>,
  ) {
    return this.getManyCategoriesUseCase.execute({
      filter: filter,
      pagination: {
        limit: !limit ? parseInt(limit) : null,
        page: !page ? parseInt(page) : null,
      },
      relation: {
        user: true,
      },
      select: {
        user: {
          name: true,
          email: true,
          role: true,
        },
      },
    });
  }

  async getCategoryByIdService(id: string) {
    if (!id) {
      throw new BadRequestException(
        this.i18nService.t('events.idRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const result = await this.getCategoryByIdUseCase.execute({
      id: id,
      relation: {
        user: true,
      },
      select: {
        user: {
          name: true,
          email: true,
          role: true,
        },
      },
    });

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.noIdCategory', {
          args: { id },
          lang: I18nContext.current().lang,
        }),
      );
    }

    return result;
  }

  async getOneCategoryService(params: Partial<CategoryEntity>) {
    const result = await this.getOneCategoryUseCase.execute({
      params: params,
      relation: {
        user: true,
      },
      select: {
        user: {
          name: true,
          email: true,
          role: true,
        },
      },
    });

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.CategoryNotExist', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return result;
  }

  updateCategoryService(id: string, updateCategoryDto: UpdateCategoryDto) {
    if (!id) {
      throw new BadRequestException(
        this.i18nService.t('events.idRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const category = new CategoryEntity({
      titleAr: updateCategoryDto.titleAr,
      titleEn: updateCategoryDto.titleEn,
      categorySlug: updateCategoryDto.titleEn
        ? slugify(updateCategoryDto.titleEn)
        : undefined,
      updatedAt: new Date(Date.now()),
    });

    return this.updateCategoryUseCase.execute({
      id: id,
      params: category,
      relation: {
        user: true,
      },
      select: {
        user: {
          name: true,
          email: true,
          role: true,
        },
      },
    });
  }

  async updateImageCategory(id: string, image: Express.Multer.File) {
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

    const category = new CategoryEntity({
      imageUrl: imageUrl.url,
      updatedAt: new Date(Date.now()),
    });

    return this.updateCategoryUseCase.execute({
      id: id,
      params: category,
      relation: {
        user: true,
      },
      select: {
        user: {
          name: true,
          email: true,
          role: true,
        },
      },
    });
  }

  async deleteCategoryService(id: string): Promise<[true, string]> {
    if (!id) {
      throw new BadRequestException(
        this.i18nService.t('events.idRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const result = await this.deleteCategoryUseCase.execute(id);

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.noIdCategory', {
          args: { id },
          lang: I18nContext.current().lang,
        }),
      );
    }

    return [
      result,
      this.i18nService.t('events.deleteCategorySuccessfully', {
        lang: I18nContext.current().lang,
      }),
    ];
  }

  async deleteOneCategoryService(
    params: Partial<CategoryEntity>,
  ): Promise<[true, string]> {
    const result = await this.deleteOneCategoryUseCase.execute(params);

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.CategoryNotExist', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return [
      result,
      this.i18nService.t('events.deleteCategorySuccessfully', {
        lang: I18nContext.current().lang,
      }),
    ];
  }
}
