import IBaseRepository from 'src/application/core/base/base_repository';
import { UserEntity } from '../entities/users';

export abstract class IUserRepository extends IBaseRepository<UserEntity> {}
