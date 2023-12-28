import { Injectable } from '@nestjs/common';
import BaseEntity from './base_entity';
import IBaseRepository from './base_repository';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import {
  FindAllOptionModel,
  FindOneByIdOptionModel,
  FindOneOptionModel,
  UpdateOptionModel,
} from '../model/option.model';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseTypeOrmRepository<
  T extends BaseEntity,
> extends IBaseRepository<T> {
  abstract findByIds(ids: string[]): Promise<T[]>;
}

@Injectable()
export abstract class BaseTypeOrmRepositoryImp<T extends BaseEntity>
  implements BaseTypeOrmRepository<T>
{
  constructor(public repository: Repository<T>) {}

  create(params: T): Promise<T> {
    const newModel = this.repository.create(params);
    return this.repository.save(newModel, {
      transaction: true,
      reload: true,
    });
  }

  findAll(option: FindAllOptionModel<T>): Promise<[T[], number]> {
    const page = (Math.abs(option.pagination.page) || 1) - 1;
    const limit = Math.abs(option.pagination.limit) || 10;

    const skip = page * limit;

    return this.repository.findAndCount({
      where: option.filter as FindOptionsWhere<T>,
      take: limit,
      skip: skip,
      relations: option.relation as FindOptionsRelations<T>,
      select: option.select as FindOptionsSelect<T>,
      order: option.order as FindOptionsOrder<T>,
    });
  }

  async findById(option: FindOneByIdOptionModel<T>): Promise<T> {
    return await this.repository.findOne({
      where: { id: option.id } as FindOptionsWhere<T>,
      relations: option.relation as FindOptionsRelations<T>,
      select: option.select as FindOptionsSelect<T>,
    });
  }

  async findByIds(ids: string[]): Promise<T[]> {
    return await this.repository.findBy({
      id: In(ids),
    } as FindOptionsWhere<T>);
  }

  findMany(option: FindAllOptionModel<T>): Promise<[T[], number]> {
    const page = (Math.abs(option.pagination.page) || 1) - 1;
    const limit = Math.abs(option.pagination.limit) || 10;

    const skip = page * limit;

    return this.repository.findAndCount({
      where: option.filter as FindOptionsWhere<T>,
      take: limit,
      skip: skip,
      relations: option.relation as FindOptionsRelations<T>,
      select: option.select as FindOptionsSelect<T>,
      order: option.order as FindOptionsOrder<T>,
    });
  }

  findOne(option: FindOneOptionModel<T>): Promise<T> {
    return this.repository.findOne({
      where: option.params as FindOptionsWhere<T>,
      relations: option.relation as FindOptionsRelations<T>,
      select: option.select as FindOptionsSelect<T>,
    });
  }

  async update(option: UpdateOptionModel<T>): Promise<T> {
    await this.repository.update(
      option.id,
      option.params as QueryDeepPartialEntity<T>,
    );

    return this.repository.findOne({
      where: { id: option.id as any },
      relations: option.relation as FindOptionsRelations<T>,
      select: option.select as FindOptionsSelect<T>,
    });
  }

  async delete(id: any): Promise<boolean> {
    const isExisting = await this.repository.findOneBy({ id: id });
    if (isExisting) {
      await this.repository.delete(id);
      return true;
    } else {
      return false;
    }
  }

  async deleteOne(filter: Partial<T>): Promise<boolean> {
    const isExisting = await this.repository.findOne({
      where: filter as FindOptionsWhere<T>,
    });

    if (isExisting) {
      await this.repository.delete(isExisting.id);
      return true;
    } else {
      return false;
    }
  }
}
