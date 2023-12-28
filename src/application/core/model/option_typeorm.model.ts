import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm';
import {
  FindAllOptionBase,
  FindOneByIdOptionBase,
  FindOneOptionBase,
  updateOptionBase,
} from './option_base.model';
import BaseEntity from '../base/base_entity';

export class FindAllOptionModel<
  T extends BaseEntity,
> extends FindAllOptionBase {
  relation?: FindOptionsRelations<T> | Partial<T> | null;
  select?: FindOptionsSelect<T> | Partial<T> | null;
  filter?: FindOptionsWhere<T> | Partial<T> | null;
  order?: FindOptionsOrder<T> | Partial<T> | null;
}

export class FindOneByIDOptionTypeOrmModel<
  T extends BaseEntity,
> extends FindOneByIdOptionBase {
  relation?: FindOptionsRelations<T> | Partial<T> | null;
  select?: FindOptionsSelect<T> | Partial<T> | null;
}

export class UpdateOptionModel<
  T extends BaseEntity,
> extends updateOptionBase<T> {
  relation?: FindOptionsRelations<T> | Partial<T> | null;
  select?: FindOptionsSelect<T> | Partial<T> | null;
}

export class FindOneOptionModel<
  T extends BaseEntity,
> extends FindOneOptionBase<T> {
  relation?: FindOptionsRelations<T> | Partial<T> | null;
  select?: FindOptionsSelect<T> | Partial<T> | null;
}
