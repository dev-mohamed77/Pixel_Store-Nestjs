import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { EndPointApp } from 'src/application/config/enum/endpoint_enum';

@Controller(`${EndPointApp.id}/${EndPointApp.subCategories}`)
export class SubCategoriesByCategoryController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Get()
  async getSubcategoriesByCategoryIdController(
    @Param('id', ParseUUIDPipe) categoryId: string,
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    return this.subCategoriesService.getManySubCategoriesService(limit, page, {
      categoryId: categoryId,
    });
  }
}
