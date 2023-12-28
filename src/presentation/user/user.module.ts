import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infra/model/user.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepositoryImp } from 'src/infra/repositories/user.repository';
import { CreateUserUseCase } from 'src/domain/usecases/user/create_user_usecase';
import { GetManyUsersUseCase } from 'src/domain/usecases/user/get_many_users.usecase';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { GetUsersUseCase } from 'src/domain/usecases/user/get_users_usecase';
import { GetOneUserUseCase } from 'src/domain/usecases/user/get_one_user_usecase';
import { UpdateUserUseCase } from 'src/domain/usecases/user/update_user_usecase';
import { DeleteUserUseCase } from 'src/domain/usecases/user/delete_user_usecase';
import { DeleteOneUserUseCase } from 'src/domain/usecases/user/delete_one_user_usecase';
import { GetUserByIDUseCase } from 'src/domain/usecases/user/get_user_by_id_usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        global: true,
        signOptions: { expiresIn: '3d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [
    UserService,
    {
      provide: UserRepositoryImp,
      useClass: UserRepositoryImp,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (repo: IUserRepository) => {
        return new CreateUserUseCase(repo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: GetManyUsersUseCase,
      useFactory: (repo: IUserRepository) => {
        return new GetManyUsersUseCase(repo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: GetUserByIDUseCase,
      useFactory: (repo: IUserRepository) => {
        return new GetUserByIDUseCase(repo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: GetUsersUseCase,
      useFactory: (repo: IUserRepository) => {
        return new GetUsersUseCase(repo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: GetOneUserUseCase,
      useFactory: (repo: IUserRepository) => {
        return new GetOneUserUseCase(repo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (repo: IUserRepository) => {
        return new UpdateUserUseCase(repo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: DeleteUserUseCase,
      useFactory: (repo: IUserRepository) => {
        return new DeleteUserUseCase(repo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: DeleteOneUserUseCase,
      useFactory: (repo: IUserRepository) => {
        return new DeleteOneUserUseCase(repo);
      },
      inject: [UserRepositoryImp],
    },
  ],
})
export class UserModule {}
