import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  ParseUUIDPipe,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RolesApp } from 'src/application/config/enum/roles_enum';
import { Roles } from '../auth/role.decorator';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { EndPointApp } from 'src/application/config/enum/endpoint_enum';
import { ParseSlugValidationPipe } from 'src/application/core/validation/slug_validation_pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller(EndPointApp.categories)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image'))
  createCategoryController(
    @Req() req,
    @UploadedFile() image: Express.Multer.File,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.createCategoryService(
      createCategoryDto,
      image,
      req.user.id,
    );
  }

  @Get()
  async getCategoriesController(
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    const [result, length] = await this.categoriesService.getCategoriesService(
      limit,
      page,
    );

    return {
      length,
      data: result,
    };
  }

  @Get(EndPointApp.id)
  getCategoryByIdController(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.getCategoryByIdService(id);
  }

  @Get(EndPointApp.slug)
  getCategoryBySlugController(
    @Param('slug', ParseSlugValidationPipe) slug: string,
  ) {
    return this.categoriesService.getOneCategoryService({
      categorySlug: slug,
    });
  }

  @Put(EndPointApp.id)
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  updateCategoryController(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategoryService(id, updateCategoryDto);
  }

  @Put(EndPointApp.id)
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image'))
  updateImageCategoryController(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.categoriesService.updateImageCategory(id, image);
  }

  @Delete(EndPointApp.id)
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  deleteCategoryController(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.deleteCategoryService(id);
  }
}
