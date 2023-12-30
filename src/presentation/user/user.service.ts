import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from 'src/domain/usecases/user/create_user_usecase';
import { GetUserByIDUseCase } from 'src/domain/usecases/user/get_user_by_id_usecase';
import { GetManyUsersUseCase } from 'src/domain/usecases/user/get_many_users.usecase';
import { GetUsersUseCase } from 'src/domain/usecases/user/get_users_usecase';
import { UpdateUserUseCase } from 'src/domain/usecases/user/update_user_usecase';
import { DeleteOneUserUseCase } from 'src/domain/usecases/user/delete_one_user_usecase';
import { DeleteUserUseCase } from 'src/domain/usecases/user/delete_user_usecase';
import { UserEntity } from 'src/domain/entities/users.entity';
import { GetOneUserUseCase } from 'src/domain/usecases/user/get_one_user_usecase';
import { ChangePasswordLoggedUserDto } from './dto/change-password-logged-user.dto';
import {
  passwordCompare,
  passwordHash,
} from 'src/application/core/utilities/password_hash';
import { JwtService } from '@nestjs/jwt';
import { UpdateLoggedUserDto } from './dto/update-logged-user-data.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class UserService {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserByIdUseCase: GetUserByIDUseCase,
    private getUsersUseCase: GetUsersUseCase,
    private getManyUsersUseCase: GetManyUsersUseCase,
    private getOneUserUseCase: GetOneUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private deleteOneUserUseCase: DeleteOneUserUseCase,
    private jwtService: JwtService,
    private i18nService: I18nService,
  ) {}

  createUserService(createUserDto: CreateUserDto) {
    const user = new UserEntity({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      phone: createUserDto.phone,
      role: createUserDto.role,
    });
    return this.createUserUseCase.execute(user);
  }

  getUserService(limit: string, page: string) {
    return this.getUsersUseCase.execute({
      pagination: {
        limit: !limit ? parseInt(limit) : null,
        page: !page ? parseInt(page) : null,
      },
    });
  }

  getManyUserService(limit: string, page: string) {
    return this.getManyUsersUseCase.execute({
      pagination: {
        limit: !limit ? parseInt(limit) : null,
        page: !page ? parseInt(page) : null,
      },
    });
  }

  async getUserByIdService(id: string): Promise<UserEntity> {
    if (!id) {
      throw new BadRequestException(
        this.i18nService.t('events.idRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const result = await this.getUserByIdUseCase.execute({ id });

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.noIdUser', {
          args: { id },
          lang: I18nContext.current().lang,
        }),
      );
    }

    return result;
  }

  async getOneUserService(params: Partial<UserEntity>): Promise<UserEntity> {
    const result = await this.getOneUserUseCase.execute({ params });

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.UserNotExist', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return result;
  }

  async updateUserService(id: string, updateUserDto: UpdateUserDto) {
    if (!id) {
      throw new BadRequestException(
        this.i18nService.t('events.idRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const result = await this.updateUserUseCase.execute({
      id: id,
      params: updateUserDto,
    });

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.noIdUser', {
          args: { id },
          lang: I18nContext.current().lang,
        }),
      );
    }

    return result;
  }

  async deleteUserService(id: string): Promise<[boolean, string]> {
    if (!id) {
      throw new BadRequestException(
        this.i18nService.t('events.idRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const result = await this.deleteUserUseCase.execute(id);

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.noIdUser', {
          args: { id },
          lang: I18nContext.current().lang,
        }),
      );
    }

    return [
      result,
      this.i18nService.t('events.deleteUserSuccessfully', {
        lang: I18nContext.current().lang,
      }),
    ];
  }

  async deleteOneUserService(
    params: Partial<UserEntity>,
  ): Promise<[boolean, string]> {
    const result = await this.deleteOneUserUseCase.execute(params);

    if (!result) {
      throw new BadRequestException(
        this.i18nService.t('events.UserNotExist', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return [
      result,
      this.i18nService.t('events.deleteUserSuccessfully', {
        lang: I18nContext.current().lang,
      }),
    ];
  }

  //------------------------------ Logged User ---------------------------

  async changePasswordLoggedUserService(
    id: string,
    changePasswordLoggedUserDto: ChangePasswordLoggedUserDto,
  ): Promise<[UserEntity, string]> {
    if (!id) {
      throw new BadRequestException(
        this.i18nService.t('events.idRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    if (
      !changePasswordLoggedUserDto.currentPassword ||
      !changePasswordLoggedUserDto.newPassword
    ) {
      throw new BadRequestException(
        this.i18nService.t('events.newPasswordAndCurrentPasswordRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const user = await this.getUserByIdService(id);

    if (!user) {
      throw new BadRequestException(
        this.i18nService.t('events.UserNotExist', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const comparePass = await passwordCompare(
      changePasswordLoggedUserDto.currentPassword,
      user.password,
    );

    if (!comparePass) {
      throw new BadRequestException(
        this.i18nService.t('events.currentPasswordIncorrect', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const hashPassword = await passwordHash(
      changePasswordLoggedUserDto.newPassword,
    );

    const userEntity = new UserEntity({
      password: hashPassword,
      passwordChangedAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });

    const updateUser = await this.updateUserUseCase.execute({
      id: user.id,
      params: userEntity,
    });

    const payload = {
      id: updateUser.id,
      email: updateUser.email,
      role: updateUser.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return [updateUser, token];
  }

  async updateLoggedUserDataService(
    id: string,
    data: UpdateLoggedUserDto,
  ): Promise<UserEntity> {
    if (!id) {
      throw new BadRequestException(
        this.i18nService.t('events.idRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const userEntity = new UserEntity({
      name: data.name,
      phone: data.phone,
      country: data.country,
      updatedAt: new Date(Date.now()),
    });

    const updateUser = await this.updateUserUseCase.execute({
      id: id,
      params: userEntity,
    });

    return updateUser;
  }

  async deleteLoggedUserService(id: string): Promise<[boolean, string]> {
    if (!id) {
      throw new BadRequestException(
        this.i18nService.t('events.idRequired', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return this.deleteUserService(id);
  }
}
