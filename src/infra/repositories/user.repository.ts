import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmRepositoryImp } from 'src/application/core/base/base_typeorm_repository';
import { UserEntity } from 'src/domain/entities/users';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { Repository } from 'typeorm';
import { User } from '../model/user.model';

export class UserRepositoryImp
  extends BaseTypeOrmRepositoryImp<UserEntity>
  implements IUserRepository
{
  constructor(@InjectRepository(User) private model: Repository<UserEntity>) {
    super(model);
  }
}
