/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private userService: UserService,
    private i18nService: I18nService,
  ) {
    super();
  }

  // @ts-ignore
  async handleRequest(err: any, user: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw new UnauthorizedException(
        this.i18nService.t('events.authenticated', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const currentUser = await this.userService.getUserByIdService(user.id);

    if (!currentUser) {
      const message = 'The user that belong to this token does no longer exist';
      throw new BadRequestException(message);
    }

    if (currentUser.passwordChangedAt) {
      const passChangedTimestamp =
        currentUser.passwordChangedAt.getTime() / 1000;

      if (passChangedTimestamp > user.iat) {
        const message =
          'User recently changed his password. please login again..';
        throw new UnauthorizedException(message);
      }
    }

    return currentUser;
  }
}
