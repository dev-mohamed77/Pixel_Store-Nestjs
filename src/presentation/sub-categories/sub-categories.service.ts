import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { SubCategoryEntity } from 'src/domain/entities/subCategory.entity';
import { CreateSubCategoryUseCase } from 'src/domain/usecases/subCategories/create_subCategory_usecase';
import { GetSubCategoryByIDUseCase } from 'src/domain/usecases/subCategories/get_subCategory_by_id_usecase';
import { GetSubCategoriesUseCase } from 'src/domain/usecases/subCategories/get_subCategories_usecase';
import { GetManyCategoriesUseCase } from 'src/domain/usecases/categories/get_many_categories.usecase';
import { GetOneSubCategoryUseCase } from 'src/domain/usecases/subCategories/get_one_subCategory_usecase';
import { UpdateSubCategoryUseCase } from 'src/domain/usecases/subCategories/update_subCategory_usecase';
import { DeleteSubCategoryUseCase } from 'src/domain/usecases/subCategories/delete_subCategory_usecase';
import { DeleteOneSubCategoryUseCase } from 'src/domain/usecases/subCategories/delete_one_subCategory_usecase';
import { I18nContext, I18nService } from 'nestjs-i18n';
import slugify from 'slugify';
import { GetManySubCategoriesUseCase } from 'src/domain/usecases/subCategories/get_many_subCategories.usecase';

@Injectable()
export class SubCategoriesService {
  constructor(
    private createSubCategoryUseCase: CreateSubCategoryUseCase,
    private getSubCategoryByIdUseCase: GetSubCategoryByIDUseCase,
    private getSubCategoriesUseCase: GetSubCategoriesUseCase,
    private getManySubCategoriesUseCase: GetManySubCategoriesUseCase,
    private getOneSubCategoryUseCase: GetOneSubCategoryUseCase,
    private updateSubCategoryUseCase: UpdateSubCategoryUseCase,
    private deleteSubCategoryUseCase: DeleteSubCategoryUseCase,
    private deleteOneSubCategoryUseCase: DeleteOneSubCategoryUseCase,
    private i18nService: I18nService,
  ) {}

  createSubCategoryService(
    createSubCategoryDto: CreateSubCategoryDto,
    userId: string,
  ) {
    const subCategory = new SubCategoryEntity({
      titleAr: createSubCategoryDto.titleAr,
      titleEn: createSubCategoryDto.titleEn,
      slug: slugify(createSubCategoryDto.titleEn),
      categoryId: createSubCategoryDto.categoryId,
      userId: userId,
      category: {
        id: createSubCategoryDto.categoryId,
      },
      user: {
        id: userId,
      },
    });

    return this.createSubCategoryUseCase.execute(subCategory);
  }

  getSubCategoriesService(limit: string, page: string) {
    return this.getSubCategoriesUseCase.execute({
      pagination: {
        limit: !limit ? parseInt(limit) : null,
        page: !page ? parseInt(page) : null,
      },
      relation: {
        user: true,
        category: true,
      },
      select: {
        user: {
          name: true,
          email: true,
          role: true,
        },
        category: {
          titleAr: true,
          titleEn: true,
          imageUrl: true,
          categorySlug: true,
        },
      },
    });
  }

  getManySubCategoriesService(
    limit: string,
    page: string,
    filter: Partial<SubCategoryEntity>,
  ) {
    return this.getManySubCategoriesUseCase.execute({
      filter: filter,
      pagination: {
        limit: !limit ? parseInt(limit) : null,
        page: !page ? parseInt(page) : null,
      },
      relation: {
        user: true,
        category: true,
      },
      select: {
        user: {
          name: true,
          email: true,
          role: true,
        },
        category: {
          titleAr: true,
          titleEn: true,
          imageUrl: true,
          categorySlug: true,
        },
      },
    });
  }

  async getSubCategoryByIdService(id: string) {
    if (!id) {
      throw new BadRequestException(
        this.i18nService.t('events.idRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }
    const result = await this.getSubCategoryByIdUseCase.execute({
      id: id,
      relation: {
        user: true,
        category: true,
      },
      select: {
        user: {
          name: true,
          email: true,
          role: true,
        },
        category: {
          titleAr: true,
          titleEn: true,
          imageUrl: true,
          categorySlug: true,
        },
      },
    });

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.noIdSubCategory', {
          args: { id },
          lang: I18nContext.current().lang,
        }),
      );
    }

    return result;
  }

  async getOneSubCategoryService(params: Partial<SubCategoryEntity>) {
    const result = await this.getOneSubCategoryUseCase.execute({
      params: params,
      relation: {
        user: true,
        category: true,
      },
      select: {
        user: {
          name: true,
          email: true,
          role: true,
        },
        category: {
          titleAr: true,
          titleEn: true,
          imageUrl: true,
          categorySlug: true,
        },
      },
    });

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.subCategoryNotExist', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return result;
  }

  updateSubCategoryService(
    id: string,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    if (!id) {
      throw new BadRequestException(
        this.i18nService.t('events.idRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const category = new SubCategoryEntity({
      titleAr: updateSubCategoryDto.titleAr,
      titleEn: updateSubCategoryDto.titleEn,
      slug: updateSubCategoryDto.titleEn
        ? slugify(updateSubCategoryDto.titleEn)
        : undefined,
      updatedAt: new Date(Date.now()),
    });

    return this.updateSubCategoryUseCase.execute({
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

  async deleteSubCategoryService(id: string) {
    if (!id) {
      throw new BadRequestException(
        this.i18nService.t('events.idRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const result = await this.deleteSubCategoryUseCase.execute(id);

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.subCategoryNotExist', {
          args: { id },
          lang: I18nContext.current().lang,
        }),
      );
    }

    return [
      result,
      this.i18nService.t('events.deleteSubCategorySuccessfully', {
        lang: I18nContext.current().lang,
      }),
    ];
  }

  async deleteOneSubCategoryService(params: Partial<SubCategoryEntity>) {
    const result = await this.deleteOneSubCategoryUseCase.execute(params);

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.subCategoryNotExist', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return [
      result,
      this.i18nService.t('events.deleteSubCategorySuccessfully', {
        lang: I18nContext.current().lang,
      }),
    ];
  }
}
