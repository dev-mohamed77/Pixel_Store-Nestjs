import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EndPointApp } from 'src/application/config/enum/endpoint_enum';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { RolesApp } from 'src/application/config/enum/roles_enum';
import { ChangePasswordLoggedUserDto } from './dto/change-password-logged-user.dto';
import { UpdateLoggedUserDto } from './dto/update-logged-user-data.dto';

@Controller(EndPointApp.users)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ----------------------- admin --------------------------

  @Post()
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUserService(createUserDto);
  }

  @Get()
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  findAll(@Query('limit') limit: string, @Query('page') page: string) {
    return this.userService.getUserService(limit, page);
  }

  @Get(EndPointApp.id)
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserByIdService(id);
  }

  @Patch(EndPointApp.id)
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserService(id, updateUserDto);
  }

  @Delete(EndPointApp.id)
  @Roles(RolesApp.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUserService(id);
  }

  // ----------------------- user --------------------------

  @Get(EndPointApp.getMe)
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req) {
    return req.user;
  }

  @Put(EndPointApp.changePassword)
  @UseGuards(JwtAuthGuard)
  changePasswordLoggedUserController(
    @Req() req,
    @Body() changePasswordLoggedUserDto: ChangePasswordLoggedUserDto,
  ) {
    return this.userService.changePasswordLoggedUserService(
      req.user.id,
      changePasswordLoggedUserDto,
    );
  }

  @Put(EndPointApp.updateLoggedUser)
  @UseGuards(JwtAuthGuard)
  updateLoggedUserDataController(
    @Req() req,
    @Body() updateLoggedUserDto: UpdateLoggedUserDto,
  ) {
    return this.userService.updateLoggedUserDataService(
      req.user.id,
      updateLoggedUserDto,
    );
  }
}
