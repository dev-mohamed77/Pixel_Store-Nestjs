import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UserEntity } from 'src/domain/entities/users';

export class CreateUserUseCase implements IBaseUseCase<UserEntity> {
  constructor(private repo: IUserRepository) {}

  execute(param: UserEntity): Promise<UserEntity> {
    return this.repo.create(param);
  }
}
