import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/users';
import { CreateUserAuthUseCase } from 'src/domain/usecases/auth/create_user_auth.usecase';
import { GetUserOneAuthUseCase } from 'src/domain/usecases/auth/get_user_one_auth.usecase';
import {
  passwordCompare,
  passwordHash,
} from 'src/application/core/utilities/password_hash';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UpdateUserAuthUseCase } from 'src/domain/usecases/auth/update_user_auth.usecase';
import { SignUpAuthDto } from './dto/signup_auth_dto';
import { SignInAuthDto } from './dto/signin_auth_dto';

@Injectable()
export class AuthService {
  constructor(
    private createUserUseCase: CreateUserAuthUseCase,
    private getUserOneUseCase: GetUserOneAuthUseCase,
    private updateUserUseCase: UpdateUserAuthUseCase,
    private jwtService: JwtService,
  ) {}

  async signUpService(signUAuthDto: SignUpAuthDto) {
    if (!signUAuthDto.name || !signUAuthDto.email || !signUAuthDto.password) {
      throw new BadRequestException('name and email , password are required');
    }

    const pass = await passwordHash(signUAuthDto.password);

    const userEntity = new UserEntity({
      name: signUAuthDto.name,
      email: signUAuthDto.email,
      password: pass,
    });

    return this.createUserUseCase.execute(userEntity);
  }

  async signInService(
    signInAuthDto: SignInAuthDto,
  ): Promise<[UserEntity, string]> {
    if (!signInAuthDto.email || !signInAuthDto.password) {
      throw new BadRequestException('email and password are required');
    }

    const user = await this.getUserOneUseCase.execute({
      email: signInAuthDto.email,
    });

    if (!user) {
      throw new BadRequestException('Email not exist');
    }

    const pass = await passwordCompare(signInAuthDto.password, user.password);

    if (!pass) {
      throw new BadRequestException('password not found');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return [user, token];
  }

  async SignInOrSignUpByGoogleService(
    signUpAuthDto: SignUpAuthDto,
  ): Promise<[UserEntity, string]> {
    const user = await this.getUserOneUseCase.execute({
      email: signUpAuthDto.email,
    });

    if (!user) {
      const pass = await passwordHash(signUpAuthDto.password);

      const userEntity = new UserEntity({
        name: signUpAuthDto.name,
        email: signUpAuthDto.email,
        password: pass,
      });

      const createUser = await this.createUserUseCase.execute(userEntity);

      const payload = {
        id: createUser.id,
        email: createUser.email,
        role: createUser.role,
      };
      const token = await this.jwtService.signAsync(payload);
      return [createUser, token];
    } else {
      const signInDto = new SignInAuthDto();
      (signInDto.email = signUpAuthDto.email),
        (signInDto.password = signUpAuthDto.password);
      const [user, token] = await this.signInService(signInDto);
      return [user, token];
    }
  }

  async forgetPasswordService(email: string) {
    if (!email) {
      throw new BadRequestException('email is required');
    }

    const user = await this.getUserOneUseCase.execute({ email });

    if (!user) {
      throw new BadRequestException(
        `There is no user with that email ${email}`,
      );
    }

    const resetCode = Math.floor(10000 + Math.random() * 900000).toString();

    const hashedResetCode = crypto
      .createHash('sha256')
      .update(resetCode)
      .digest('hex');

    await this.updateUserUseCase.execute(user.id, {
      passwordResetCode: hashedResetCode,
      passwordResetExpires: new Date(Date.now() + 2 * 60 * 1000),
      passwordResetVerified: false,
    });

    return `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The pixel store Team`;
  }

  async verifyPassResetCodeService(resetCode: string) {
    if (!resetCode) {
      throw new BadRequestException('resetCode required');
    }

    const hashedResetCode = crypto
      .createHash('sha256')
      .update(resetCode)
      .digest('hex');

    const user = await this.getUserOneUseCase.execute({
      passwordResetCode: hashedResetCode,
    });

    if (!user) {
      throw new BadRequestException('Reset code invalid');
    }

    const now = new Date(Date.now());

    if (user.passwordResetExpires < now) {
      throw new BadRequestException('Reset token has expired');
    }

    user.passwordResetVerified = true;

    await this.updateUserUseCase.execute(user.id, {
      passwordResetVerified: true,
    });

    return user;
  }

  async resetPasswordService(
    resetPasswordDto: SignInAuthDto,
  ): Promise<[UserEntity, string]> {
    if (!resetPasswordDto.email || !resetPasswordDto.password) {
      throw new BadRequestException('email and password are required');
    }

    const user = await this.getUserOneUseCase.execute({
      email: resetPasswordDto.email,
    });

    if (!user) {
      throw new BadRequestException(
        `There is no user with email ${resetPasswordDto.email}`,
      );
    }

    if (!user.passwordResetVerified) {
      throw new BadRequestException(`Reset code not verified`);
    }

    const passHash = await passwordHash(resetPasswordDto.password);

    await this.updateUserUseCase.execute(user.id, {
      password: passHash,
      passwordResetCode: null,
      passwordResetExpires: null,
      passwordResetVerified: null,
    });

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return [user, token];
  }
}
