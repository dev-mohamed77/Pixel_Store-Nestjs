import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infra/model/user.model';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RoleGuard } from './role.guard';
import { AuthRepositoryImp } from 'src/infra/repositories/auth.repository';
import { IAuthRepository } from 'src/domain/repositories/auth.repository';
import { CreateUserAuthUseCase } from 'src/domain/usecases/auth/create_user_auth.usecase';
import { GetUserOneAuthUseCase } from 'src/domain/usecases/auth/get_user_one_auth.usecase';
import { UpdateUserAuthUseCase } from 'src/domain/usecases/auth/update_user_auth.usecase';

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
    UserModule,
  ],
  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy,
    RoleGuard,

    {
      provide: AuthRepositoryImp,
      useClass: AuthRepositoryImp,
    },
    {
      provide: CreateUserAuthUseCase,
      useFactory: (authRepo: IAuthRepository) => {
        return new CreateUserAuthUseCase(authRepo);
      },
      inject: [AuthRepositoryImp],
    },
    {
      provide: GetUserOneAuthUseCase,
      useFactory: (authRepo: IAuthRepository) => {
        return new GetUserOneAuthUseCase(authRepo);
      },
      inject: [AuthRepositoryImp],
    },
    {
      provide: UpdateUserAuthUseCase,
      useFactory: (authRepo: IAuthRepository) => {
        return new UpdateUserAuthUseCase(authRepo);
      },
      inject: [AuthRepositoryImp],
    },
  ],
})
export class AuthModule {}
