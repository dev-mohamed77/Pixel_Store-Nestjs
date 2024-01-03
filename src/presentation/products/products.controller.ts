import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './products.service';
import { RolesApp } from 'src/application/config/enum/roles_enum';
import { Roles } from '../auth/role.decorator';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { EndPointApp } from 'src/application/config/enum/endpoint_enum';
import { ParseSlugValidationPipe } from 'src/application/core/validation/slug_validation_pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image'))
  createProductController(
    @Req() req,
    @UploadedFile() image: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.createProductService(
      req.user.id,
      image,
      createProductDto,
    );
  }

  @Get()
  async getProductsController(
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    const [result, length] = await this.productService.getProductService(
      limit,
      page,
    );

    return {
      length,
      data: result,
    };
  }

  @Get(EndPointApp.slug)
  getProductBySlugController(
    @Param('slug', ParseSlugValidationPipe) slug: string,
  ) {
    return this.productService.getOneProductService({
      slug: slug,
    });
  }

  @Get(EndPointApp.id)
  getProductByIdController(@Param('id', ParseSlugValidationPipe) id: string) {
    return this.productService.getProductByIdService(id);
  }

  @Put(EndPointApp.id)
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image'))
  updateProductController(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productService.updateProductImageService(id, image);
  }

  @Put(EndPointApp.id)
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  updateProductImageController(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProductService(id, updateProductDto);
  }

  @Delete(EndPointApp.id)
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  deleteProductController(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.deleteProductService(id);
  }
}
