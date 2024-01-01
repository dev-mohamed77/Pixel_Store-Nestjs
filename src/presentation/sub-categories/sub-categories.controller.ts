import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesApp } from 'src/application/config/enum/roles_enum';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { EndPointApp } from 'src/application/config/enum/endpoint_enum';
import { ParseSlugValidationPipe } from 'src/application/core/validation/slug_validation_pipe';

@Controller(EndPointApp.subCategories)
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post()
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  createSubCategoryController(
    @Req() req,
    @Body() createSubCategoryDto: CreateSubCategoryDto,
  ) {
    return this.subCategoriesService.createSubCategoryService(
      createSubCategoryDto,
      req.user.id,
    );
  }

  @Get()
  getSubCategoriesController(
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    return this.subCategoriesService.getSubCategoriesService(limit, page);
  }

  @Get(EndPointApp.id)
  getCategoryByIdController(@Param('id', ParseUUIDPipe) id: string) {
    return this.subCategoriesService.getSubCategoryByIdService(id);
  }

  @Get(EndPointApp.slug)
  getSubCategoryBySlugController(
    @Param('slug', ParseSlugValidationPipe) slug: string,
  ) {
    return this.subCategoriesService.getOneSubCategoryService({
      slug: slug,
    });
  }

  @Put(EndPointApp.id)
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  updateSubCategoryController(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.subCategoriesService.updateSubCategoryService(
      id,
      updateSubCategoryDto,
    );
  }

  @Delete(EndPointApp.id)
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  deleteSubCategoryController(@Param('id', ParseUUIDPipe) id: string) {
    return this.subCategoriesService.deleteSubCategoryService(id);
  }
}
