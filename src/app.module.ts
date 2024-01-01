import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './application/common/database/database.module';
import { AuthModule } from './presentation/auth/auth.module';
import { UserModule } from './presentation/user/user.module';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { CategoriesModule } from './presentation/categories/categories.module';
import { SubCategoriesModule } from './presentation/sub-categories/sub-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      resolvers: [
        AcceptLanguageResolver,
        { use: QueryResolver, options: ['lang'] },
        new HeaderResolver(['x-lang']),
      ],
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
        logging: true,
      },
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    CategoriesModule,
    SubCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
