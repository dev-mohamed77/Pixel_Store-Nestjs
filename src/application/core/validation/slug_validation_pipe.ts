import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class ParseSlugValidationPipe implements PipeTransform<string, string> {
  constructor(private I18nService: I18nService) {}
  transform(value: string, metadata: ArgumentMetadata): string {
    console.log(metadata.data);
    // Add your slug parsing logic here
    // For example, you can validate the slug format and return the parsed slug
    if (!value.match(/^[a-z0-9-]+$/)) {
      throw new BadRequestException(
        this.I18nService.t('events.invalidSlug', {
          lang: I18nContext.current().lang,
        }),
      );
    }
    return value;
  }
}
