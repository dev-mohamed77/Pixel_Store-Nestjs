import { PaginationModel } from './pagination_model';
import BaseEntity from '../base/base_entity';

export abstract class FindAllOptionBase {
  pagination: PaginationModel;
}

export abstract class FindOneByIdOptionBase {
  id: string;
}

export abstract class FindOneOptionBase<T extends BaseEntity> {
  params: Partial<T>;
}

export abstract class updateOptionBase<
  T extends BaseEntity,
> extends FindOneByIdOptionBase {
  params: Partial<T>;
}
