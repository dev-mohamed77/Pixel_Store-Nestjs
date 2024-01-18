import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { EndPointApp } from 'src/application/config/enum/endpoint_enum';
import { ProductService } from './products.service';
import { ProductBySubCategoryDto } from './dto/product-by-sub-category.dto';
import { Like } from 'typeorm';

@Controller(`${EndPointApp.id}/${EndPointApp.subCategories}`)
export class ProductsBySubCategoryController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  async getProductsBySubCategoryController(
    @Param('id', ParseUUIDPipe) subCategoryId: string,
    @Body() productBySubCategoryDto: ProductBySubCategoryDto,
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    const searchTitleAr = productBySubCategoryDto.titleAr || '';
    const searchTitleEn = productBySubCategoryDto.titleEn || '';

    const [result, length] = await this.productsService.getManyProductService(
      limit,
      page,

      {
        titleAr: Like(`%${searchTitleAr}%`),
        titleEn: Like(`%${searchTitleEn}%`),
        subCategory: {
          id: subCategoryId,
        },
      },
    );

    return {
      length,
      data: result,
    };
  }
}
